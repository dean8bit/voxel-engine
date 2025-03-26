export default class Tests {
  constructor() {
    this.tests = [["test1", this.test1()]];
  }

  test1() {
    return ["test1", true];
  }

  run() {
    let success = true;
    this.tests.forEach((test) => {
      console.log(test[0], test[1]);
      if (!test[1]) success = false;
    });
    return success;
  }
}
