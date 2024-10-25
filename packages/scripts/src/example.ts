import { Resource } from "sst";
import { Example } from "@acme/core/example";

console.log(`${Example.hello()} Linked to ${Resource.MyBucket.name}.`);
