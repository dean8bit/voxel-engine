import Voxel from "../entities/world/voxel.js";

class VoxelTests {
  constructor() {
    this.tests = [];
    this.tests.push(this.testVoxelR(277, 255));
    this.tests.push(this.testVoxelG(277, 255));
    this.tests.push(this.testVoxelB(277, 255));
    this.tests.push(this.testVoxelA(277, 255));
    this.tests.push(this.testVoxelR(-1, 0));
    this.tests.push(this.testVoxelG(-1, 0));
    this.tests.push(this.testVoxelB(-1, 0));
    this.tests.push(this.testVoxelA(-1, 0));
    this.tests.push(this.testVoxelR(128, 128));
    this.tests.push(this.testVoxelG(128, 128));
    this.tests.push(this.testVoxelB(128, 128));
    this.tests.push(this.testVoxelA(128, 128));
    this.tests.push(this.testVoxelActive());
    this.tests.push(this.testVoxelTfl(true));
    this.tests.push(this.testVoxelTfr(true));
    this.tests.push(this.testVoxelTbl(true));
    this.tests.push(this.testVoxelTbr(true));
    this.tests.push(this.testVoxelBfl(true));
    this.tests.push(this.testVoxelBfr(true));
    this.tests.push(this.testVoxelBbl(true));
    this.tests.push(this.testVoxelBbr(true));
    this.tests.push(this.testVoxelTfl(false));
    this.tests.push(this.testVoxelTfr(false));
    this.tests.push(this.testVoxelTbl(false));
    this.tests.push(this.testVoxelTbr(false));
    this.tests.push(this.testVoxelBfl(false));
    this.tests.push(this.testVoxelBfr(false));
    this.tests.push(this.testVoxelBbl(false));
    this.tests.push(this.testVoxelBbr(false));
  }

  testVoxelR(v, e) {
    let voxel = new Voxel();
    voxel.Red = v;
    return ["testVoxelSetGetR", voxel.Red == e];
  }

  testVoxelG(v, e) {
    let voxel = new Voxel();
    voxel.Green = v;
    return ["testVoxelSetGetG", voxel.Green == e];
  }

  testVoxelB(v, e) {
    let voxel = new Voxel();
    voxel.Blue = v;
    return ["testVoxelSetGetB", voxel.Blue == e];
  }

  testVoxelA(v, e) {
    let voxel = new Voxel();
    voxel.Alpha = v;
    return ["testVoxelSetGetA", voxel.Alpha == e];
  }

  testVoxelActive() {
    let voxel = new Voxel();
    voxel.Active = false;
    return ["testVoxelSetGetActive", voxel.Active == false];
  }

  testVoxelTfl(b) {
    let voxel = new Voxel();
    voxel.TopFrontLeft = b;
    return ["testVoxelSetGetTfl " + b, voxel.TopFrontLeft == b];
  }

  testVoxelTfr(b) {
    let voxel = new Voxel();
    voxel.TopFrontRight = b;
    return ["testVoxelSetGetTfr " + b, voxel.TopFrontRight == b];
  }

  testVoxelTbl(b) {
    let voxel = new Voxel();
    voxel.TopBackLeft = b;
    return ["testVoxelSetGetTbl " + b, voxel.TopBackLeft == b];
  }

  testVoxelTbr(b) {
    let voxel = new Voxel();
    voxel.TopBackRight = b;
    return ["testVoxelSetGetTbr " + b, voxel.TopBackRight == b];
  }

  testVoxelBfl(b) {
    let voxel = new Voxel();
    voxel.BottomFrontLeft = b;
    return ["testVoxelSetGetBfl " + b, voxel.BottomFrontLeft == b];
  }

  testVoxelBfr(b) {
    let voxel = new Voxel();
    voxel.BottomFrontRight = b;
    return ["testVoxelSetGetBfr " + b, voxel.BottomFrontRight == b];
  }

  testVoxelBbl(b) {
    let voxel = new Voxel();
    voxel.BottomBackLeft = b;
    return ["testVoxelSetGetBbl " + b, voxel.BottomBackLeft == b];
  }

  testVoxelBbr(b) {
    let voxel = new Voxel();
    voxel.BottomBackRight = b;
    return ["testVoxelSetGetBbr " + b, voxel.BottomBackRight == b];
  }

  run() {
    const success = true;
    this.tests.forEach((test) => {
      console.log(test[0], test[1]);
      if (!test[1]) success == false;
    });
    return success;
  }
}
console.log("VoxelTests " + new VoxelTests().run());
