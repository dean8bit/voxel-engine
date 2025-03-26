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
    this.tests = [this.SetGetVoxel1, this.SetGetVoxel2];
  }

  SetGetVoxel1() {
    var world = new World();
    world.setVoxelData(0, 0, 0, 1);
    return { name: "SetGetVoxel", result: world.getVoxelData(0, 0, 0) === 1 };
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
      console.log(r.name, r.result);
      if (!r.result) success = false;
    });
    return success;
  }
}
