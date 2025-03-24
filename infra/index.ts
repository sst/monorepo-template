import { setupStorage } from "./storage";
import { setupApi } from "./api";

export async function run() {
  // Create resources in the correct dependency order
  const storage = await setupStorage();
  const api = await setupApi(storage);

  return {
    apiUrl: api.url,
    bucketName: storage.bucket.name,
    reportsBucketName: storage.reportsBucket.name,
  };
} 