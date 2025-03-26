//@ts-check
/**
 * Represents a chunk in the voxel game.
 */
export class Chunk {
  /**
   * The width of the chunk.
   * @type {number}
   * @default 16
   */
  width = 16;

  /**
   * The height of the chunk.
   * @type {number}
   * @default 16
   */
  height = 16;

  /**
   * The depth of the chunk.
   * @type {number}
   * @default 16
   */
  depth = 16;

  /**
   * A flat array representing the 3D voxels.
   * @type {Array<number>}
   */
  voxels = [];

  /**
   * Creates an instance of Chunk.
   * @param {number} width - The width of the chunk.
   * @param {number} height - The height of the chunk.
   * @param {number} depth - The depth
   */
  constructor(width, height, depth) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.voxels = new Array(this.width * this.height * this.depth);
  }
}
