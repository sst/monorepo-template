import { StorageResources } from "./storage";

export interface ApiResources {
  api: sst.aws.ApiGatewayV2;
  url: ReturnType<typeof $resolve>;
}

export async function setupApi(): Promise<ApiResources> {
  // Create the API Gateway HTTP API
  const api = new sst.aws.ApiGatewayV2("Api", {
    // Example: add a custom domain if needed
    // domain: "api.domain.com",
    // Example: configure CORS if needed
    // cors: {
    //   allowHeaders: ["*"],
    //   allowMethods: ["ANY"],
    //   allowOrigins: ["*"],
    // },
  });

  // Add example routes
  api.route("GET /", "packages/functions/src/api/get.handler");
  api.route("POST /echo", "packages/functions/src/api/echo.handler");

  // Return the API resources
  return {
    api,
    url: api.url,
  };
} 