import { Resource } from "sst";
import { Example } from "@monorepo-template-cursor/core/example";

console.log(`${Example.hello()} Linked to ${Resource.MyBucket.name}.`);
