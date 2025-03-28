//@ts-check
import * as THREE from "../../libs/three.module.js";
import Chunk from "./chunk.js";
import Bag from "./bag.js";

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
   * The bag of volumes, which is a collection of chunks.
   * @type {Bag}
   */
  volumes = new Bag();

  /**
   * The width of each chunk.
   * @type {number}
   */
  chunkWidth = 16;

  /**
   * The height of each chunk.
   * @type {number}
   */
  chunkHeight = 32;

  /**
   * The depth of each chunk.
   * @type {number}
   */
  chunkDepth = 16;

  /**
   * Gets the chunk index for the specified coordinates.
   * @private
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @param {number} z - The z-coordinate.
   * @returns {{x: number, y: number, z: number}} An object containing the chunk index with x, y, and z properties.
   */
  _getChunkIndex(x, y, z) {
    return {
      x: Math.floor(x / this.chunkWidth),
      y: Math.floor(y / this.chunkHeight),
      z: Math.floor(z / this.chunkDepth),
    };
  }

  /**
   * Gets the local coordinates of a voxel within a chunk.
   * @private
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @param {number} z - The z-coordinate.
   * @returns {{x: number, y: number, z: number}} An object containing the local coordinates with x, y, and z properties.
   */
  _getChunkLocalCoordinates(x, y, z) {
    return {
      x: x % this.chunkWidth,
      y: y % this.chunkHeight,
      z: z % this.chunkDepth,
    };
  }

  _getChunk(x, y, z, create = false) {
    let chunk = this.chunks.getChunk(x, y, z);
    if (!chunk && create) {
      chunk = new Chunk(this.chunkWidth, this.chunkHeight, this.chunkDepth);
      this.chunks.addChunk(x, y, z, chunk);
    }
    return chunk;
  }

  /**
   * Retrieves the voxel at the specified coordinates.
   *
   * @param {number} x - The x-coordinate of the voxel.
   * @param {number} y - The y-coordinate of the voxel.
   * @param {number} z - The z-coordinate of the voxel.
   * @returns {number|undefined} The voxel at the specified coordinates, or undefined if the chunk is not found.
   */
  getVoxelData(x, y, z) {
    const chunkIndex = this._getChunkIndex(x, y, z);
    const chunk = this._getChunk(chunkIndex.x, chunkIndex.y, chunkIndex.z);

    if (chunk) {
      const voxelIndex = this._getChunkLocalCoordinates(x, y, z);
      return chunk.getVoxel(voxelIndex.x, voxelIndex.y, voxelIndex.z);
    }
    return undefined;
  }

  /**
   * Sets the value of a voxel at the specified coordinates.
   *
   * @param {number} x - The x-coordinate of the voxel.
   * @param {number} y - The y-coordinate of the voxel.
   * @param {number} z - The z-coordinate of the voxel.
   * @param {number} value - The value to set for the voxel.
   */
  setVoxelData(x, y, z, value) {
    const chunkIndex = this._getChunkIndex(x, y, z);
    const chunk = this._getChunk(
      chunkIndex.x,
      chunkIndex.y,
      chunkIndex.z,
      true
    );
    const voxelIndex = this._getChunkLocalCoordinates(x, y, z);
    chunk.setVoxel(voxelIndex.x, voxelIndex.y, voxelIndex.z, value);
  }
}
