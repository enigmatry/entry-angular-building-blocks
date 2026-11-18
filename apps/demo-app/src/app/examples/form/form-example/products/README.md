# Generated product-edit example

`generated/` is output of the Enigmatry code generator (`entry-codegen`, at the version pinned by `EntryCodeGenerationVersion` in `apps/demo-app/codegen/Enigmatry.Entry.DemoApp.CodeGeneration.Setup.csproj`), committed exactly as it is emitted. **Never edit these files by hand.**

The configuration that produces them lives in [`apps/demo-app/codegen/`](../../../../../../codegen/README.md). To change the form, change that configuration and regenerate from the repository root:

```bash
npm run demo-app:codegen
```

When a new generator version ships, bump `EntryCodeGenerationVersion` in `apps/demo-app/codegen/Enigmatry.Entry.DemoApp.CodeGeneration.Setup.csproj`, regenerate, and commit the output unchanged.
