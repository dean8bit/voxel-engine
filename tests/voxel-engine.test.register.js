//@ts-check
import Tests from "./voxel-engine.tests.js";

var results = [];
results.push(new Tests().run());

if (results.every((r) => r)) {
  console.log("All tests passed!");
} else {
  console.error("Some tests failed!");
}
