import { StorageResources } from "./storage";

export interface FrontendResources {
  frontendAstro: sst.aws.Astro;
}

export async function setupFrontend(storage: StorageResources): Promise<FrontendResources> {
  const frontendAstro = new sst.aws.Astro("FrontendAstro", {
    path: "packages/web",
    domain: $app.stage === "prod"
      ? {
          name: "app.domain.com",
          dns: sst.cloudflare.dns(),
        }
      : {
          name: `${$app.stage}.app.domain.com`,
          aliases: [`${$app.stage}.app.domain.com`],
          dns: sst.cloudflare.dns(),
        },
    link: [storage.bucket],
    environment: {
      BUCKET_NAME: storage.bucket.name,
    },
  });
  return { frontendAstro };
}