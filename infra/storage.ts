export interface StorageResources {
  bucket: sst.aws.Bucket;
  reportsBucket: sst.aws.Bucket;
}

export async function setupStorage(): Promise<StorageResources> {
  // Create a bucket for general storage
  const bucket = new sst.aws.Bucket("DataBucket", {
    cors: {
      allowHeaders: ["*"],
      allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE"],
      allowOrigins: ["*"],
    },
  });

  // Create a bucket for reports and analytics
  const reportsBucket = new sst.aws.Bucket("ReportsBucket", {
    cors: {
      allowHeaders: ["*"],
      allowMethods: ["GET", "HEAD", "PUT"],
      allowOrigins: ["*"],
    },
  });

  return {
    bucket,
    reportsBucket,
  };
} 