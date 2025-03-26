//@ts-check
import * as THREE from "../../libs/three.module.js";
import { Chunk } from "./chunk.js";

import ChunkBag from "./chunkbag.js";

/*
 * 3D representation of the voxel corners:
 *
 *        TBL-------TBR
 *       / |       / |
 *     TFL-------TFR |
 *     |  |      |   |
 *     |  BBL----|--BBR
 *     | /       | /
 *    BFL-------BFR
 *
 * TFL - TopFrontLeft
 * TFR - TopFrontRight
 * TBL - TopBackLeft
 * TBR - TopBackRight
 * BFL - BottomFrontLeft
 * BFR - BottomFrontRight
 * BBL - BottomBackLeft
 * BBR - BottomBackRight
 *
 * BIT FLAGS
 *       [DECOR ]A [TYPE        ] [Corner ]
 * [1111 1111 1111 1111 1111 1111 1111 1111]
 * [DECOR]    - Decoration 7bits
 * [A]        - Active 1bit
 * [TYPE]     - Type 12bits
 * [Corner]   - Corner 8bits
 * Unused 4 bits (?water?)
 */

/**
 * Represents the world in the voxel game, managing chunks of the world.
 * @extends THREE.Object3D
 */
/**
 * Represents the world in the voxel game, extending THREE.Object3D.
 * Manages a collection of chunks and provides methods to interact with voxels.
 */
export class World extends THREE.Object3D {
  /**
   * The dictionary of chunks
   * @type {ChunkBag}
   */
  chunks = new ChunkBag();

  chunkWidth = 16;
  chunkHeight = 32;
  chunkDepth = 16;

  /**
   * Retrieves the voxel at the specified coordinates.
   *
   * @param {number} x - The x-coordinate of the voxel.
   * @param {number} y - The y-coordinate of the voxel.
   * @param {number} z - The z-coordinate of the voxel.
   * @returns {number} The voxel at the specified coordinates, or undefined if the chunk is not found.
   */
  getVoxel(x, y, z) {
    const chunkX = Math.floor(x / this.chunkWidth);
    const chunkY = Math.floor(y / this.chunkHeight);
    const chunkZ = Math.floor(z / this.chunkDepth);

    const chunk = this.chunks.getChunk(chunkX, chunkY, chunkZ);
    if (chunk) {
      const voxelX = x % this.chunkWidth;
      const voxelY = y % this.chunkHeight;
      const voxelZ = z % this.chunkDepth;
      return chunk[
        voxelX +
          voxelY * this.chunkWidth +
          voxelZ * this.chunkWidth * this.chunkHeight
      ];
    }
  }

  /**
   * Sets the value of a voxel at the specified coordinates.
   *
   * @param {number} x - The x-coordinate of the voxel.
   * @param {number} y - The y-coordinate of the voxel.
   * @param {number} z - The z-coordinate of the voxel.
   * @param {number} value - The value to set for the voxel.
   */
  setVoxel(x, y, z, value) {
    const chunkX = Math.floor(x / this.chunkWidth);
    const chunkY = Math.floor(y / this.chunkHeight);
    const chunkZ = Math.floor(z / this.chunkDepth);

    let chunk = this.chunks.getChunk(chunkX, chunkY, chunkZ);
    if (!chunk) {
      chunk = new Chunk(this.chunkWidth, this.chunkHeight, this.chunkDepth);
      this.chunks.addChunk(chunkX, chunkY, chunkZ, chunk);
    }

    const voxelX = x % this.chunkWidth;
    const voxelY = y % this.chunkHeight;
    const voxelZ = z % this.chunkDepth;
    chunk[
      voxelX +
        voxelY * this.chunkWidth +
        voxelZ * this.chunkWidth * this.chunkHeight
    ] = value;
  }
}
