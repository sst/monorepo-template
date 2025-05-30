import { setupStorage } from "./storage";
import { setupApi } from "./api";
import { setupWeb } from "./web";
import { setupFrontend } from "./frontend";

export async function run() {
  // Create resources in the correct dependency order
  const storage = await setupStorage();
  const api = await setupApi(storage);
  const web = await setupWeb(storage);
  const frontend = await setupFrontend(storage);

  return {
    apiUrl: api.url,
    bucketName: storage.bucket.name,
    reportsBucketName: storage.reportsBucket.name,
    webAstroUrl: web.webAstro.url,
    frontendAstroUrl: frontend.frontendAstro.url,
  };
} 