# SST Monorepo Template Guidelines

## Build/Test/Deploy Commands
- Install: `npm install`
- Deploy: `npx sst deploy`
- Run tests: `npm test` (in core package, uses `sst shell vitest`)
- Run single test: `npm test -- -t "test name"` (in core package)
- Run scripts: `npm run shell src/example.ts` (in scripts package)

## Code Style Guidelines
- **TypeScript**: Use Node 22 with ESM modules
- **Imports**: Package imports follow format `import { Feature } from "@monorepo-template-cursor/core/feature"`
- **Module System**: ESNext with Bundler moduleResolution
- **Monorepo Structure**:
  - `core/`: Shared code with modular exports
  - `functions/`: Lambda functions with AWS Lambda handlers
  - `scripts/`: Utility scripts (run with `npm run shell`)
  - `infra/`: SST infrastructure definitions
- **Naming**: Use camelCase for variables/functions, PascalCase for classes/types
- **Testing**: Vitest for unit tests
- **Error Handling**: Use typed error classes with proper AWS Lambda error responses

Always verify code works by running tests before committing changes.