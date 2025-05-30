/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "sst-monorepo-template",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  run: require("./infra").run
});
