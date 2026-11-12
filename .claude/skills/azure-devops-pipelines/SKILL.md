---
name: azure-devops-pipelines
description: Azure DevOps pipeline structure and conventions for the entry-angular-building-blocks workspace. Use this when creating, editing, or reviewing azure-pipelines.yml or deploy-demo.yml.
---

# Azure DevOps Pipelines — Entry Angular Building Blocks

You are working on the CI/CD pipelines for this multi-library Angular workspace. Follow the conventions established in `azure-pipelines.yml` (publish pipeline) and `deploy-demo.yml` (demo app deployment pipeline).

---

## Pipeline files

| File | Purpose |
|---|---|
| `azure-pipelines.yml` | Build, test, and publish all npm packages to npm registry. Triggered on `master`; pull requests into `master` run its `ci_build` stage only. |
| `deploy-demo.yml` | Build and deploy the demo app. |
| `pipeline-templates/install-node.yml` | Step template with the Node pin, consumed by both pipelines. |

Steps duplicated across both pipelines belong in `pipeline-templates/` and are pulled in with
`- template: pipeline-templates/<name>.yml` (paths are relative to the repo root).

---

## Versioning — MinVer

All packages are versioned via [MinVer](https://github.com/adamralph/minver) (a .NET tool that derives the version from git tags).

The version is computed once and stored in the pipeline variable `theLatestVersion`, then stamped into every library's `package.json` before the npm install step:

```yaml
- task: PowerShell@2
  displayName: 'Set MinVer Version'
  inputs:
    targetType: inline
    script: |
      $angularVersion = node -p "require('./package-lock.json').packages['node_modules/@angular/core']?.version"
      if ("$angularVersion" -notmatch '^(\d+)\.\d+\.\d+') { throw "Could not read the locked @angular/core version from package-lock.json (got '$angularVersion')" }
      $angularMajor = $Matches[1]
      $version = dotnet minver -p preview -m "$angularMajor.0"
      echo "##vso[task.setvariable variable=theLatestVersion]$version"
      echo "##vso[build.updatebuildnumber]$version"
```

`-m` is MinVer's minimum major.minor. Right after an Angular major upgrade, the newest reachable
release tag is from the previous major. Without `-m`, the new major's code would publish under an old
version number such as `21.4.1-preview.9`. The package major follows the Angular major, so the step
takes that major from the `@angular/core` version locked in `package-lock.json` (`22.1.0` → `-m 22.0`).
That is the exact version `npm ci` installs. The range in `package.json` is not used: a valid range
such as `>=22.0.0 <23.0.0` has no single "first number" to read. Untagged commits
then come out as `22.0.0-preview.<height>` until the first `22.x` release is tagged, and after that
`-m` has no effect. An Angular upgrade PR therefore produces the new major's previews without anyone
editing the pipeline.

**When adding a new library**, add a version-stamping step in the same block as the others — before the `npm ci` step:

```yaml
- task: Npm@1
  displayName: 'Set the version for <new-lib>'
  inputs:
    command: custom
    customCommand: version $(theLatestVersion) --no-git-tag-version
    workingDir: 'libs/<new-lib>'
```

The `--no-git-tag-version` flag prevents npm from creating a git tag during the version bump.

---

## Stage structure

The publish pipeline has two stages with a hard dependency:

```
ci_build  ──→  publish_npm
```

### `ci_build` stage

Runs all verification before any artifacts are produced. Order of steps is significant:

1. `checkout` — with `fetchDepth: 50` and `fetchTags: true` (MinVer needs tag history)
2. `- template: pipeline-templates/install-node.yml` — pins the Node version
3. Install and run MinVer — sets `theLatestVersion`
4. Stamp version into each library `package.json`
5. `npm ci` — install from lockfile
6. `npm run lint` — lint all libraries
7. `npm run build @enigmatry/entry-components` — build libs in dependency order
8. `npm run build @enigmatry/entry-form`
9. `npm run typedoc` — generates the demo's API reference, as `deploy-demo.yml` does before its build
10. `npm run build @enigmatry/demo-app` — `deploy-demo.yml` ships every `master` merge without approval, so typedoc and the demo must both pass before merge
11. `npm run automated-tests` — SCSS theme compilation + scss-foundation tests
12. `FileTransform@2` — substitute pipeline variables into `dist/**/package.json` (used to inject peer dependency versions)
13. `PublishBuildArtifacts@1` — publish `dist/` as artifact
14. `PublishBuildArtifacts@1` — publish `libs/` as artifact

When `deploy-demo.yml` gains a step that can fail on code changes, add the same step here, so a
pull request catches the failure instead of the unapproved demo deployment.

This stage is also the pull request validation build. Keep everything in it safe to run for a PR,
with no secrets and no side effects outside the build agent. Anything that publishes belongs in
`publish_npm`.

> **Build order matters**: `@enigmatry/entry-components` must be built before `@enigmatry/entry-form` because entry-form depends on entry-components types.

> **Node version**: the `UseNode@1` pin lives in `pipeline-templates/install-node.yml` and must be kept in step with the Angular major's engine range (Angular 22 requires `^22.22.3 || ^24.15.0 || >=26.0.0`). Bump it together with three other places as part of every Angular upgrade: `engines.node` in the root `package.json` (the workspace/CI pin), `engines.node` in `libs/entry-components/package.json` and `libs/entry-form/package.json` (the full range consumers may use), and the `@types/node` major in the root `package.json`.

### `publish_npm` stage

Runs as a **deployment job** targeting the `npm` environment, which has an approval gate. It runs only
for `master` and `release/<major>`, never for a pull request:

```yaml
- stage: publish_npm
  dependsOn: ci_build
  condition: and(succeeded(), ne(variables['Build.Reason'], 'PullRequest'), or(eq(variables['Build.SourceBranch'], 'refs/heads/master'), startsWith(variables['Build.SourceBranch'], 'refs/heads/release/')))
  jobs:
  - deployment: Deploy
    environment: npm
    strategy:
      runOnce:
        deploy:
          steps:
            - checkout: self
              fetchDepth: 50
              fetchTags: true
            - download: current
              displayName: 'Download build artifacts'
```

Each library is published with `command: publish` + `useExternalRegistry` pointing at the `npm` service connection. Working directories reference the artifact path:

```yaml
workingDir: '$(Pipeline.Workspace)/$(artifactName)-$(Build.BuildNumber)/enigmatry/<lib-name>'
```

#### npm dist-tag

Without a tag, `npm publish` moves `latest` (what a plain `npm install <pkg>` resolves to) onto
whatever went out last, previews included. The job therefore pins Node with
`pipeline-templates/install-node.yml`, and a `Choose the npm dist-tag` step reads the version from
the built `entry-components` `package.json` and picks the tag from the branch and npm's current `latest`:

| Branch | Pre-release (contains `-`) | Release |
|---|---|---|
| `master` | `next` | `latest`, or `v<major>-lts` if a newer major is already `latest` |
| `release/*` | `v<major>-next` | `latest`, or `v<major>-lts` if a newer major is already `latest` |

`<major>` is always the major of the built version, never parsed from the branch name. Releases follow
the same rule on every branch. On `master` the `v<major>-lts` case only happens for a stale build,
e.g. a `21.4.2` approved late after `22.0.0` is `latest`. Pre-releases go by branch, not by comparing majors. While the next major is still in preview, `next`
already holds it (e.g. `22.0.0-preview.N` while 21 is `latest`). Judged by `latest` alone, a
`release/21` preview would also count as the current major and collide with that on `next`.

A release branch cut from `master` inherits this file. Once a newer major is `latest`, its patches
therefore go to `v<major>-lts` with no pipeline edit and can never move `latest` back. The step fails
if it cannot parse the version or read `latest` from npm, rather than guessing. A `latest` on `@enigmatry/entry-components`
is a required invariant. The package has had one since its first release, so a missing one means
npm could not be read or someone removed the tag. Restore it with `npm dist-tag add`; do not teach the
step to guess. It also fails when the chosen tag already holds a newer version. That happens
when an old build is approved late at the npm gate, e.g. `22.2.1` after `22.3.0` is `latest`.
Because the tag is explicit, npm's own check for this does not run. Such a build should be cancelled,
not approved. The comparison follows SemVer precedence (semver.org, item 11) in a short inline Node
function, with numeric identifiers compared as `BigInt`; `sort -V` is not SemVer and orders identifiers such as `preview10` and `preview2` the other
way. The publish job has no `node_modules`, so npm's `semver` package is not available there. The
step sets `npmDistTag`,
and every publish step passes it through the environment:

```yaml
- task: Npm@1
  inputs:
    command: publish
    ...
  env:
    npm_config_tag: $(npmDistTag)
```

`Npm@1`'s `publish` command has no tag input, which is why the tag goes through the environment.
Do not switch to `command: custom` with `publish --tag ...`, because that changes how the service
connection's credentials are applied. With the pinned Node, npm 11 refuses to publish a pre-release
without a tag. A step that loses its `env` therefore fails instead of moving `latest`.

**When adding a new library to publish**, add a step that matches this pattern. The artifact sub-path depends on how ng-packagr places the output:
- `@enigmatry/*` scoped packages → `enigmatry/<lib-name>` inside the artifact
- Unscoped packages (`eslint-config`, `stylelint-config`, `scss-foundation`) → `<lib-name>` directly

---

## Variables

```yaml
variables:
  theLatestVersion: ''                                          # set at runtime by MinVer
  artifactName: entry-angular-building-blocks                   # base artifact name
  peerDependencies.@enigmatry/entry-components: $(theLatestVersion)  # used by FileTransform
```

- Add peer dependency variable entries for any new library whose peer deps should be auto-stamped.
- Variable names with dots (`peerDependencies.xxx`) map to nested JSON paths via `FileTransform@2`.

---

## Trigger conventions

```yaml
trigger:
- master        # CI build + publish on every master merge

pr:
  branches:
    include:
    - master    # PR validation build: ci_build only, publish_npm skipped
```

- PR builds of `azure-pipelines.yml` are the merge check for `master`. Branch protection on
  `master` requires them, so do not switch them back to `pr: none`.
- `publish_npm`'s stage `condition` limits publishing to `master` and `release/<major>`. Every
  release tag and every publish still in the build history came from one of those. Anything else
  finishes green after `ci_build`: a pull request, or a manual run on a feature branch (someone
  running the pipeline to get a check on their PR). It must not wait at the npm gate, because
  approving there would publish that branch, and the required GitHub check stays pending until the
  run ends. Any new stage with side effects needs the same condition.
- `deploy-demo.yml` keeps `pr: none`: it deploys, and the PR build already compiles the demo.
- Add path filters only if you have a strong reason to skip CI on certain paths.

---

## Artifact naming

Artifacts follow the pattern `$(artifactName)-$(Build.BuildNumber)`. The build number is set to the MinVer version via `##vso[build.updatebuildnumber]`, so artifacts are named like `entry-angular-building-blocks-22.0.0`.

---

## Agent pool

Always use `ubuntu-latest` for both stages. Do not pin to a specific Ubuntu version unless a task requires it.

---

## Task version guidelines

| Task | Current version used | Notes |
|---|---|---|
| `UseNode@1` | v1 | Pins the Node version — must satisfy the Angular major's engine range. Lives in `pipeline-templates/install-node.yml`. Its input is `version` (semver range), not `versionSpec`. Do not use the older `NodeTool@0`. |
| `DotNetCoreCLI@2` | v2 | For MinVer installation |
| `Npm@1` | v1 | All npm operations |
| `PowerShell@2` | v2 | MinVer version extraction |
| `FileTransform@2` | v2 | JSON variable substitution |
| `PublishBuildArtifacts@1` | v1 | Artifact publishing |

Do not upgrade task versions without testing — especially `Npm@1` and `FileTransform@2`, which have breaking changes between major versions.

---

## Adding a new library — full checklist

1. Add a version-stamp step (`npm version $(theLatestVersion) --no-git-tag-version`) before `npm ci`
2. Add a build step after existing build steps (respect dependency order)
3. Add a `peerDependencies.<package-name>: $(theLatestVersion)` variable if consumers need the version injected
4. Add a publish step in `publish_npm` pointing at the correct artifact sub-path, with `env: npm_config_tag: $(npmDistTag)`
5. Verify `FileTransform@2` path covers the new library's `package.json`

---

## Common mistakes to avoid

- **Missing `fetchTags: true`** on checkout — MinVer silently produces `0.0.0-alpha.0` without tag history.
- **Wrong artifact sub-path** in publish step — causes "package not found" errors; check where ng-packagr places the output under `dist/`.
- **Publishing before `dependsOn: ci_build`** — always gate publish on a successful build stage.
- **Using `npm install` instead of `npm ci`** — always use `ci` in pipelines to ensure reproducible installs from the lockfile.
- **Hardcoding version strings** — always use `$(theLatestVersion)` from MinVer, never hardcode.
- **A publish step without `npm_config_tag`** — a pre-release would take `latest`, or fail under npm 11.
- **Hard-coding MinVer's `-m`** — it is derived from the `@angular/core` version locked in `package-lock.json`, so it follows the Angular major on its own. A hard-coded value goes stale at the next major.
