//@ts-check
import SpatialBag from "../entities/world/Spatialbag.js";
/**
 * Class representing a collection of tests.
 */
export default class SpatialBagTests {
  /**
   * Create a Tests instance.
   */
  constructor() {
    /**
     * An array of tests, each represented by a name and a boolean result.
     * @type {Array.<Function>}
     */
    this.tests = [this.spatialBagTest1];
  }

  /**
   * A sample test method.
   * @returns {{name: string, result: boolean}} The name of the test and its result.
   */
  spatialBagTest1() {
    var bag = new SpatialBag();
    bag.add(0, 0, 0, "test");
    var item = bag.get(0, 0, 0);
    return { name: "test1", result: item === "test" };
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
