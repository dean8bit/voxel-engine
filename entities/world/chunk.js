/**
 * Represents a chunk in the voxel game.
 */
export class Chunk {
  /**
   * The xyz size of the chunk (length of one side).
   * @type {number} size - The size of the chunk (length of one side).
   */
  size = 16;

  /**
   * A flat array representing the 3d voxels.
   * @type {Array<number>}
   */
  chunks = [];

  /**
   * Creates an instance of Chunk.
   * @param {number} size - The size of the chunk (length of one side).
   */
  constructor(size) {
    this.size = size;
  }

  /**
   * Initialize chunk (and voxels) with the given size.
   * @param {number} [template]
   */
  initialize(template = null) {
    this._initializeVoxels(template);
  }

  /**
   * Creates an instance of a chunk
   * @param {number} [template]
   */
  _initializeVoxels(template = null) {
    this.chunks = new Array(this.size * this.size * this.size);
    for (let i = 0; i < this.chunks.length; i++) {
      this.chunks[i] = template || 0;
    }
  }

  save() {}

  load(data) {}
}
