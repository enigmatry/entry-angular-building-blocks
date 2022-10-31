# Enigmatry Angular Building Blocks

## Local Development Setup Procedure

1. Build BuildingBlocks (BB) project with `ng build --watch --configuration development` command (or just run `watch` npm script).
2. Install BB project in destination project with `npm install [bb_project_dist_path]` (copy `bb_project_dist_path` from previous command console output).
3. In destination project `angual.json` file set "architect > build > options > preserveSimulinks" property to `true`.
4. Run destination project.
