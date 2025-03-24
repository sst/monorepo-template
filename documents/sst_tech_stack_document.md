# Tech Stack

This starter kit uses the following tech stack:

1. **Core Framework and Runtime:**
   - **SST**: SST is a framework for full-stack applications framework that supports Infrastructure as Code (IaC) via Pulumi or Terraform.
     - Core SST configuration is stored in`sst.config.ts`
   - **TypeScript**: Used for type-safe development
     - Configuration in `tsconfig.json`

2. **Database and Backend:**
   - **SST Configuration**: To effeciently manage new cloud resources, their configuration, and relation to `./packages` within monorepo application.
   - Example SST configurations are found in `./infra/` with configurations for an API and storage S3 bucket.
   - Only SST v3 documetationshould be refrenced for cloud service configuration.  More information on the major difrences between SST v2 and SST v3 can be viewed in the [migration guide](https://sst.dev/docs/migrate-from-v2#major-changes), including the new [SST v3 config format that prohibts the use of stacks](https://sst.dev/docs/migrate-from-v2#sstconfigts).
   - SST infrastructure resources should always have a unique name.
   - Example SST Config:

    ```typescript
      export default $config({
    // ...

    async run() {
      await import("./infra/api");
      await import("./infra/storage");
      await import("./infra/frontend");
      const auth = await import("./infra/auth");

      return {
        UserPool: auth.userPool.id,
        Region: aws.getRegionOutput().name,
        IdentityPool: auth.identityPool.id,
        UserPoolClient: auth.userPoolClient.id,
      };
    }

    }
    ```

   - Example SST API Gateway Configuration in `./infra/api.ts`:

    ```typescript

    export const Api = new sst.aws.ApiGatewayV2("monorepo-template-cursor-api", {
      link: [], // Link any required resources by importing them and listing wtihin the link array.

    });

    Api.route("GET /", "packages/functions/src/api.handler");
    ```

The project is set up as a modern web application with:

- Type-safe development
- Modern UI components
- Responsive design
- Database integration
- Rich component library

This tech stack provides a robust foundation for building a scalable, secure, and user-friendly web application with modern features and best practices.
