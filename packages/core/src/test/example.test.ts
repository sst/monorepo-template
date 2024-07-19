import { expect, test } from "vitest";
import { Example } from "../example";

test("Hello test", () => {
  const expected = "Hello, world!";

  expect(Example.hello()).toEqual(expected);
});
