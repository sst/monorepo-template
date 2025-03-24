/// <reference path="./.sst/platform/config.d.ts" />
import { run } from "./infra";

export default $config({
  app(input) {
    return {
      name: "sst-monorepo-template",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  run
});
