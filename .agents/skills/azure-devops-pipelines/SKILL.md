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
| `azure-pipelines.yml` | Build, test, and publish all npm packages to npm registry. Triggered on `master`. |
| `deploy-demo.yml` | Build and deploy the demo app. |

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
      $version = dotnet minver -p preview
      echo "##vso[task.setvariable variable=theLatestVersion]$version"
      echo "##vso[build.updatebuildnumber]$version"
```

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
2. Install and run MinVer — sets `theLatestVersion`
3. Stamp version into each library `package.json`
4. `npm ci` — install from lockfile
5. `npm run lint` — lint all libraries
6. `npm run build @enigmatry/entry-components` — build libs in dependency order
7. `npm run build @enigmatry/entry-form`
8. `npm run automated-tests` — SCSS theme compilation + scss-foundation tests
9. `FileTransform@2` — substitute pipeline variables into `dist/**/package.json` (used to inject peer dependency versions)
10. `PublishBuildArtifacts@1` — publish `dist/` as artifact
11. `PublishBuildArtifacts@1` — publish `libs/` as artifact

> **Build order matters**: `@enigmatry/entry-components` must be built before `@enigmatry/entry-form` because entry-form depends on entry-components types.

### `publish_npm` stage

Runs as a **deployment job** targeting the `npm` environment (which has approval gates if configured):

```yaml
- stage: publish_npm
  dependsOn: ci_build
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
- master        # CI triggers only on master

pr: none        # No PR builds (code review happens outside CI)
```

- Keep `pr: none` — PR validation is not automated in this project.
- Add path filters only if you have a strong reason to skip CI on certain paths.

---

## Artifact naming

Artifacts follow the pattern `$(artifactName)-$(Build.BuildNumber)`. The build number is set to the MinVer version via `##vso[build.updatebuildnumber]`, so artifacts are named like `entry-angular-building-blocks-21.2.3`.

---

## Agent pool

Always use `ubuntu-latest` for both stages. Do not pin to a specific Ubuntu version unless a task requires it.

---

## Task version guidelines

| Task | Current version used | Notes |
|---|---|---|
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
4. Add a publish step in `publish_npm` pointing at the correct artifact sub-path
5. Verify `FileTransform@2` path covers the new library's `package.json`

---

## Common mistakes to avoid

- **Missing `fetchTags: true`** on checkout — MinVer silently produces `0.0.0-alpha.0` without tag history.
- **Wrong artifact sub-path** in publish step — causes "package not found" errors; check where ng-packagr places the output under `dist/`.
- **Publishing before `dependsOn: ci_build`** — always gate publish on a successful build stage.
- **Using `npm install` instead of `npm ci`** — always use `ci` in pipelines to ensure reproducible installs from the lockfile.
- **Hardcoding version strings** — always use `$(theLatestVersion)` from MinVer, never hardcode.
