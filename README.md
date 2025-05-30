# Cursor enhanced SST.dev Monorepo Template

A template to create a monorepo SST v3 project. [Learn more](https://sst.dev/docs/set-up-a-monorepo).

## Get started

1. Use this template to [create your own repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template).

2. Rename the files and update the configuration to match the name and domain of your app.

   - Update all references of `sst-monorepo-template` and `sst-monorepo-template` in the codebase to your app's name (for example, in `package.json` files, import paths, and the `sst.config.ts` app name).
   - Update domain references in the infra folder, especially in `infra/web.ts` and `infra/frontend.ts`, to use your app's domain (e.g., change `domain.com` and `app.domain.com` to your actual domain).
   - Update any resource names in the `infra/` directory to use your app's name as a prefix for uniqueness.

   Example:
   ```bash
   npx replace-in-file 'sst-monorepo-template' 'your-app-name' '**/*.*' --verbose
   npx replace-in-file 'domain.com' 'yourdomain.com' 'infra/web.ts' 'infra/frontend.ts' --verbose
   ```

3. **Replace project documentation and rules**

   - The `/documents` folder contains example project documentation, requirements, and tech stack files. Replace these with your own files that describe your SaaS project's requirements, architecture, and technical decisions.
   - If present, replace the `cursor_project_rules.mdc` (or any rules/context files in `/documents/cursor_rules/`) with your own rules and context documentation for your project. This ensures that any AI or automation tools referencing these files will use your specific requirements and standards.
   - Remove or archive the example documents if they are not relevant to your project.

   Example process:
   ```bash
   rm -rf documents/*
   cp /path/to/your/docs/* documents/
   # Or manually add your own markdown/requirements files to the documents/ folder
   ```
   Then, update any references in your codebase or automation scripts to point to your new documentation files as needed.

## Usage

This template uses [npm Workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces). It has 3 packages to start with and you can add more as needed.

1. `core/`

   This is for any shared code. It's defined as modules. For example, there's the `Example` module.

   ```ts
   export module Example {
     export function hello() {
       return "Hello, world!";
     }
   }
   ```

   That you can use across other packages using:

   ```ts
   import { Example } from "@monorepo-templtate-cursor/core/example";

   Example.hello();
   ```

   We also have [Vitest](https://vitest.dev/) configured for testing this package with the `sst shell` CLI.

   ```bash
   npm test
   ```

2. `functions/`

   This is for your Lambda functions and it uses the `core` package as a local dependency.

3. `scripts/`

    This is for any scripts that you can run on your SST app using the `sst shell` CLI and [`tsx`](https://www.npmjs.com/package/tsx). For example, you can run the example script using:

   ```bash
   npm run shell src/example.ts
   ```

4. `web/` (Astro Frontend)

   The default frontend is built with [Astro](https://astro.build/). You can update or replace this with your preferred framework. Make sure to update the domain configuration in `infra/web.ts` and `infra/frontend.ts` to match your app's domain.

### Infrastructure

The `infra/` directory allows you to logically split the infrastructure of your app into separate files. This can be helpful as your app grows.

In the template, we have `api.ts`, `storage.ts`, `web.ts`, and `frontend.ts`. These export the created resources and are imported in the `sst.config.ts`.

---
