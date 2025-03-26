//@ts-check
import Tests from "./voxel-engine.tests.js";
import WorldTests from "./voxel-engine.world.tests.js";
import ChunkTests from "./voxel-engine.chunk.tests.js";

console.log("Running tests...");
var results = [];
results.push(new Tests().run());
results.push(new ChunkTests().run());
results.push(new WorldTests().run());

if (results.every((r) => r)) {
  console.log("All tests passed!");
} else {
  console.error("Some tests failed!");
}
