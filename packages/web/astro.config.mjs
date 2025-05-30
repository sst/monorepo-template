import aws from "astro-sst";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "server",
  adapter: aws()
});