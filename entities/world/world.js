import * as THREE from "../../libs/three.module.js";

import { Chunk } from "./chunk.js";

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
export class World extends THREE.Object3D {
  /**
   * A dictionary to store chunks with their keys.
   * @type {Object.<string, Chunk>}
   */
  chunks = {};

  /**
   * Generates a unique key for a chunk based on its coordinates.
   * @param {number} x - The x-coordinate of the chunk.
   * @param {number} y - The y-coordinate of the chunk.
   * @param {number} z - The z-coordinate of the chunk.
   * @returns {string} The unique key for the chunk.
   * @private
   */
  _chunkKey(x, y, z) {
    return `${x},${y},${z}`;
  }

  /**
   * Adds a chunk to the world at the specified coordinates.
   * @param {number} x - The x-coordinate of the chunk.
   * @param {number} y - The y-coordinate of the chunk.
   * @param {number} z - The z-coordinate of the chunk.
   * @param {Chunk} chunk - The chunk to add.
   */
  addChunk(x, y, z, chunk) {
    const key = this._chunkKey(x, y, z);
    this.chunks[key] = chunk;
  }

  /**
   * Retrieves a chunk from the world at the specified coordinates.
   * @param {number} x - The x-coordinate of the chunk.
   * @param {number} y - The y-coordinate of the chunk.
   * @param {number} z - The z-coordinate of the chunk.
   * @returns {Chunk|undefined} The chunk at the specified coordinates, or undefined if it does not exist.
   */
  getChunk(x, y, z) {
    const key = this._chunkKey(x, y, z);
    return this.chunks[key];
  }

  /**
   * Removes a chunk from the world at the specified coordinates.
   * @param {number} x - The x-coordinate of the chunk.
   * @param {number} y - The y-coordinate of the chunk.
   * @param {number} z - The z-coordinate of the chunk.
   */
  removeChunk(x, y, z) {
    const key = this._chunkKey(x, y, z);
    delete this.chunks[key];
  }
}
