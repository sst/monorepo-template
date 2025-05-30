import { StorageResources } from "./storage";

export interface WebResources {
  webAstro: sst.aws.Astro;
}

export async function setupWeb(storage: StorageResources): Promise<WebResources> {
  const webAstro = new sst.aws.Astro("WebAstro", {
    path: "packages/web",
    domain: $app.stage === "prod"
      ? {
          name: "domain.com",
          aliases: ["www.domain.com"],
          dns: sst.cloudflare.dns(),
        }
      : {
          name: `${$app.stage}.domain.com`,
          aliases: [`${$app.stage}.domain.com`],
          dns: sst.cloudflare.dns(),
        },
    link: [storage.bucket],
    environment: {
      BUCKET_NAME: storage.bucket.name,
    },
  });
  return { webAstro };
}