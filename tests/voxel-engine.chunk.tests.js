//@ts-check

import { Chunk } from "../entities/world/chunk.js";

/**
 * Class representing a collection of tests.
 */
export default class ChunkTests {
  /**
   * Create a Tests instance.
   */
  constructor() {
    /**
     * An array of tests, each represented by a name and a boolean result.
     * @type {Array.<Function>}
     */
    this.tests = [
      this.GetFlatIndex1,
      this.GetSetActive1,
      this.GetSetActive2,
      this.GetSetBlockType1,
      this.GetSetBlockType2,
      this.GetSetDecoration1,
      this.GetSetDecoration2,
      this.GetSetCorner1,
      this.GetSetCorner2,
      this.GetSetAll1,
      this.GetSetAll2,
      this.GetSetAll3,
      this.GetSetAll4,
      this.GetSetAll5,
      this.Benchmark,
    ];
  }

  GetFlatIndex1() {
    var c = new Chunk(16, 16, 16);
    var index = c._get_flat_index(12, 13, 14);
    return {
      name: "GetFlatIndex1",
      result: index === 3804,
    };
  }

  GetSetActive1() {
    var c = new Chunk(16, 16, 16);
    c.setActive(12, 12, 12, true);
    var r = c.getActive(12, 12, 12);
    var v = c.getVoxel(12, 12, 12);
    return {
      name: "GetSetActive1",
      result: r === true && v === -0b10000000000000000000000000000000,
    };
  }

  GetSetActive2() {
    var c = new Chunk(16, 16, 16);
    c.setActive(12, 12, 12, true);
    c.setActive(12, 12, 12, false);
    var r = c.getActive(12, 12, 12);
    var v = c.getVoxel(12, 12, 12);
    return {
      name: "GetSetActive2",
      result: r === false && v === 0b0,
    };
  }

  GetSetBlockType1() {
    var c = new Chunk(16, 16, 16);
    c.setBlockType(12, 12, 12, 111);
    var r = c.getBlockType(12, 12, 12);
    var v = c.getVoxel(12, 12, 12);
    return {
      name: "GetSetBlockType1",
      result: r === 111 && v === 0b110111100000000,
    };
  }

  GetSetBlockType2() {
    var c = new Chunk(16, 16, 16);
    c.setBlockType(12, 12, 12, 0b111111111111);
    var r = c.getBlockType(12, 12, 12);
    var v = c.getVoxel(12, 12, 12);
    return {
      name: "GetSetBlockType2",
      result: r === 0b111111111111 && v === 0b11111111111100000000,
    };
  }

  GetSetDecoration1() {
    var c = new Chunk(16, 16, 16);
    c.setDecoration(12, 12, 12, 111);
    var r = c.getDecoration(12, 12, 12);
    var v = c.getVoxel(12, 12, 12);
    return {
      name: "GetSetDecoration1",
      result: r === 111 && v === 0b110111100000000000000000000,
    };
  }

  GetSetDecoration2() {
    var c = new Chunk(16, 16, 16);
    c.setDecoration(12, 12, 12, 0b10101010);
    var r = c.getDecoration(12, 12, 12);
    var v = c.getVoxel(12, 12, 12);
    return {
      name: "GetSetDecoration2",
      result: r === 0b10101010 && v === 0b1010101000000000000000000000,
    };
  }

  GetSetCorner1() {
    var c = new Chunk(16, 16, 16);
    c.setCorner(12, 12, 12, 255);
    var r = c.getCorner(12, 12, 12);
    var v = c.getVoxel(12, 12, 12);
    return {
      name: "GetSetCorner1",
      result: r === 255 && v === 0b11111111,
    };
  }

  GetSetCorner2() {
    var c = new Chunk(16, 16, 16);
    c.setCorner(12, 12, 12, 0b10101010);
    var r = c.getCorner(12, 12, 12);
    var v = c.getVoxel(12, 12, 12);
    return {
      name: "GetSetCorner2",
      result: r === 0b10101010 && v === 0b10101010,
    };
  }

  GetSetAll1() {
    var c = new Chunk(16, 16, 16);
    c.setActive(12, 12, 12, false);
    c.setBlockType(12, 12, 12, 0b111110101010);
    c.setDecoration(12, 12, 12, 0b10101111);
    c.setCorner(12, 12, 12, 0b10111110);
    var r =
      !c.getActive(12, 12, 12) &&
      c.getBlockType(12, 12, 12) === 0b111110101010 &&
      c.getDecoration(12, 12, 12) === 0b10101111 &&
      c.getCorner(12, 12, 12) === 0b10111110;
    var v = c.getVoxel(12, 12, 12);

    return {
      name: "GetSetAll1",
      result: r,
    };
  }

  GetSetAll2() {
    var c = new Chunk(16, 16, 16);
    c.setActive(12, 12, 12, true);
    c.setBlockType(12, 12, 12, 0b111111111111);
    c.setDecoration(12, 12, 12, 0b11111111);
    c.setCorner(12, 12, 12, 0b11111111);
    var r =
      c.getActive(12, 12, 12) &&
      c.getBlockType(12, 12, 12) === 0b111111111111 &&
      c.getDecoration(12, 12, 12) === 0b11111111 &&
      c.getCorner(12, 12, 12) === 0b11111111;
    var v = c.getVoxel(12, 12, 12);
    console.log(v.toString());
    return {
      name: "GetSetAll2",
      result: r,
    };
  }

  GetSetAll3() {
    var c = new Chunk(16, 16, 16);
    c.setActive(12, 12, 12, false);
    c.setBlockType(12, 12, 12, 0b011110101010);
    c.setDecoration(12, 12, 12, 0b00101111);
    c.setCorner(12, 12, 12, 0b00111110);
    var r =
      !c.getActive(12, 12, 12) &&
      c.getBlockType(12, 12, 12) === 0b011110101010 &&
      c.getDecoration(12, 12, 12) === 0b00101111 &&
      c.getCorner(12, 12, 12) === 0b00111110;
    var v = c.getVoxel(12, 12, 12);

    return {
      name: "GetSetAll3",
      result: r,
    };
  }

  GetSetAll4() {
    var c = new Chunk(16, 16, 16);
    c.setActive(12, 12, 12, false);
    c.setBlockType(12, 12, 12, 602);
    c.setDecoration(12, 12, 12, 133);
    c.setCorner(12, 12, 12, 255);
    var r =
      !c.getActive(12, 12, 12) &&
      c.getBlockType(12, 12, 12) === 602 &&
      c.getDecoration(12, 12, 12) === 133 &&
      c.getCorner(12, 12, 12) === 255;
    var v = c.getVoxel(12, 12, 12);

    return {
      name: "GetSetAll4",
      result: r,
    };
  }

  GetSetAll5() {
    var c = new Chunk(16, 16, 16);
    c.setActive(12, 12, 12, true);
    c.setBlockType(12, 12, 12, 0);
    c.setDecoration(12, 12, 12, 0);
    c.setCorner(12, 12, 12, 0);
    var r =
      c.getActive(12, 12, 12) &&
      c.getBlockType(12, 12, 12) === 0 &&
      c.getDecoration(12, 12, 12) === 0 &&
      c.getCorner(12, 12, 12) === 0;
    var v = c.getVoxel(12, 12, 12);

    return {
      name: "GetSetAll5",
      result: r,
    };
  }

  Benchmark() {
    var c = new Chunk(16, 16, 16);
    var start = performance.now();
    for (var i = 0; i < 1000000; i++) {
      c.setVoxel(12, 12, 12, i);
      c.getVoxel(12, 12, 12);
    }
    var end = performance.now();
    console.log("\tChunk Benchmark time: " + (end - start) + "ms");
    return {
      name: "Benchmark",
      result: end - start < 3,
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
