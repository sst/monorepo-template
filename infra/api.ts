import { secret } from "./storage";

export const myApi = new sst.aws.Function("MyApi", {
  url: true,
  link: [secret],
  handler: "./packages/functions/src/api.handler"
});
