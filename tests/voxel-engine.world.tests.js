//@ts-check

import { World } from "../entities/world/world.js";

/**
 * Class representing a collection of tests.
 */
export default class WorldTests {
  /**
   * Create a Tests instance.
   */
  constructor() {
    /**
     * An array of tests, each represented by a name and a boolean result.
     * @type {Array.<Function>}
     */
    this.tests = [
      this.SetGetVoxel1,
      this.SetGetVoxel2,
      this.SetGetVoxel3,
      this.SetGetVoxel4,
      this.Benchmark1,
      this.Benchmark2Precreated,
    ];
  }

  Benchmark1() {
    var world = new World();
    var start = performance.now();
    for (var i = 0; i < 1000000; i++) {
      world.setVoxelData(i, i, i, 1);
      world.getVoxelData(i, i, i);
    }
    var end = performance.now();
    return {
      name: "Benchmark1 time: " + (end - start) + "ms",
      result: end - start < 2000,
    };
  }

  Benchmark2Precreated() {
    var world = new World();
    for (var i = 0; i < 1000000; i++) {
      world.setVoxelData(i, i, i, 1);
    }
    var start = performance.now();
    for (var i = 0; i < 1000000; i++) {
      world.setVoxelData(i, i, i, 1);
      world.getVoxelData(i, i, i);
    }
    var end = performance.now();

    return {
      name: "Benchmark2Precreated time: " + (end - start) + "ms",
      result: end - start < 250,
    };
  }

  SetGetVoxel1() {
    var world = new World();
    world.setVoxelData(0, 0, 0, 1);
    return {
      name: "SetGetVoxel",
      result:
        world.getVoxelData(0, 0, 0) === 1 &&
        Object.keys(world.chunks.chunks).length === 1 &&
        world.chunks.getChunk(0, 0, 0).voxels.length ===
          world.chunkWidth * world.chunkDepth * world.chunkHeight,
    };
  }

  SetGetVoxel2() {
    var world = new World();
    world.setVoxelData(0, 0, 0, 1);
    world.setVoxelData(400, 400, 400, 1);
    return {
      name: "SetGetVoxel2",
      result:
        world.getVoxelData(0, 0, 0) === 1 &&
        world.getVoxelData(400, 400, 400) === 1 &&
        Object.keys(world.chunks.chunks).length === 2,
    };
  }

  SetGetVoxel3() {
    var world = new World();
    world.setVoxelData(0, 0, 0, 1);
    world.setVoxelData(400, 400, 400, 1);
    world.setVoxelData(400, 400, 400, 2);
    return {
      name: "SetGetVoxel3",
      result:
        world.getVoxelData(0, 0, 0) === 1 &&
        world.getVoxelData(400, 400, 400) === 2 &&
        Object.keys(world.chunks.chunks).length === 2,
    };
  }

  SetGetVoxel4() {
    var world = new World();
    world.setVoxelData(0, 0, 0, 1);
    world.setVoxelData(400, 400, 400, 1);
    world.setVoxelData(400, 400, 400, 2);
    world.setVoxelData(0, 0, 0, 0);
    return {
      name: "SetGetVoxel4",
      result:
        world.getVoxelData(0, 0, 0) === 0 &&
        world.getVoxelData(400, 400, 400) === 2 &&
        Object.keys(world.chunks.chunks).length === 2,
    };
  }

  SetGetVoxelActive1() {
    var world = new World();
    world.setVoxelData(0, 0, 0, 1);
    return {
      name: "SetGetVoxelActive1",
      result: world.getVoxelData(0, 0, 0) === 1,
    };
  }

  /**
   * Run all tests and log their results.
   * @returns {boolean} True if all tests pass, otherwise false.
   */
  run() {
    // @ts-ignore
    console.log(`Running tests for class: ${this.constructor.name}`);
    let success = true;
    this.tests.forEach((test) => {
      var r = test();
      console.log("\t" + r.name, r.result);
      if (!r.result) success = false;
    });
    return success;
  }
}
