# Stack-Specific Instructions

This folder contains granular Copilot instruction files for individual technology stacks used in Building Blocks.
Each file is automatically applied by Copilot when the current task matches that stack.

## Files

| File | Applies to | Description |
| ---- | ---------- | ----------- |
| [angular.instructions.md](./angular.instructions.md) | `**/*.ts` | Angular-specific conventions: async/await over RxJS, inject(), standalone migration, control flow syntax |
| [typescript-5-es2022.instructions.md](./typescript-5-es2022.instructions.md) | `**/*.ts` | TypeScript 5 / ES2022 guardrails: arrow methods, strict types, error handling, security |
| [azure-devops-pipelines.instructions.md](./azure-devops-pipelines.instructions.md) | `**/azure-pipelines*.yml` | Generic Azure DevOps YAML best practices |
| [code-review-generic.instructions.md](./code-review-generic.instructions.md) | `**` | Structured code review framework (priorities, checklists, comment format) |

Add new `*.instructions.md` files here as the project grows.

> For project-specific review rules, use the `code-review` skill (`/skills/code-review/SKILL.md`).
