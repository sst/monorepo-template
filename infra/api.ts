import { StorageResources } from "./storage";

export interface ApiResources {
  api: sst.aws.Router;
  url: ReturnType<typeof $resolve>;
}

export async function setupApi(storage: StorageResources): Promise<ApiResources> {
  // Create auth functions with URLs
  const loginFunction = new sst.aws.Function("LoginFunction", {
    handler: "packages/functions/src/auth/login.handler",
    link: [storage.bucket],
    url: true,
  });

  const signupFunction = new sst.aws.Function("SignupFunction", {
    handler: "packages/functions/src/auth/signup.handler",
    link: [storage.bucket],
    url: true,
  });

  const resetPasswordFunction = new sst.aws.Function("ResetPasswordFunction", {
    handler: "packages/functions/src/auth/reset-password.handler",
    url: true,
  });

  // Create user functions with URLs
  const getProfileFunction = new sst.aws.Function("GetProfileFunction", {
    handler: "packages/functions/src/users/get-profile.handler",
    link: [storage.bucket],
    url: true,
  });

  const updateProfileFunction = new sst.aws.Function("UpdateProfileFunction", {
    handler: "packages/functions/src/users/update-profile.handler",
    link: [storage.bucket],
    url: true,
  });

  // Create storage functions with URLs
  const getUploadUrlFunction = new sst.aws.Function("GetUploadUrlFunction", {
    handler: "packages/functions/src/storage/get-upload-url.handler",
    link: [storage.bucket],
    url: true,
  });

  // Create API Gateway with routes pointing to function URLs
  const api = new sst.aws.Router("Api", {
    routes: {
      // Auth routes
      "POST /auth/login": loginFunction.url,
      "POST /auth/signup": signupFunction.url,
      "POST /auth/reset-password": resetPasswordFunction.url,

      // User routes
      "GET /users/me": getProfileFunction.url,
      "PUT /users/me": updateProfileFunction.url,

      // Storage routes
      "GET /storage/upload-url": getUploadUrlFunction.url,
    },
  });

  // Return the API resources
  return {
    api,
    url: api.url,
  };
} 