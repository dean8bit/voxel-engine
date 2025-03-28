//@ts-check
import Volume from "../entities/world/volume.js";
import Bag from "../entities/world/bag.js";
/**
 * Class representing a collection of tests.
 */
export default class BagTests {
  /**
   * Create a Tests instance.
   */
  constructor() {
    /**
     * An array of tests, each represented by a name and a boolean result.
     * @type {Array.<Function>}
     */
    this.tests = [
      this.bagTest1,
      this.bagTest2,
      this.bagBenchMarkTest1,
      this.bagBenchMarkTest2,
    ];
  }

  bagTest1() {
    var bag = new Bag();
    const volume = new Volume();
    bag.add(0, 0, 0, volume);
    var item = bag.get(0, 0, 0);
    return { name: "bagTest1", result: item === volume };
  }

  bagTest2() {
    var bag = new Bag();
    const volume = new Volume();
    bag.add(3525, 2352, 23523, volume);
    var item = bag.get(3525, 2352, 23523);
    return { name: "bagTest2", result: item === volume };
  }

  bagBenchMarkTest1() {
    var bag = new Bag();
    const volume = new Volume();
    var start = performance.now();
    for (var i = 0; i < 1000000; i++) {
      bag.add(i, i, i, volume);
    }
    var end = performance.now();
    return {
      name: "bagBenchMarkTest1 time: " + (end - start) + "ms",
      result: end - start < 2000,
    };
  }

  bagBenchMarkTest2() {
    var bag = new Bag();
    const volume = new Volume();
    var start = performance.now();
    bag.add(255, 255, 255, volume);
    for (var i = 0; i < 1000000; i++) {
      bag.get(255, 255, 255);
    }
    var end = performance.now();
    return {
      name: "bagBenchMarkTest2 time: " + (end - start) + "ms",
      result: end - start < 2000,
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
