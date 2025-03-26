//@ts-check

/**
 * Class representing a collection of tests.
 */
export default class Tests {
  /**
   * Create a Tests instance.
   */
  constructor() {
    /**
     * An array of tests, each represented by a name and a boolean result.
     * @type {Array.<Function>}
     */
    this.tests = [this.test1];
  }

  /**
   * A sample test method.
   * @returns {{name: string, result: boolean}} The name of the test and its result.
   */
  test1() {
    return { name: "test1", result: true };
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
