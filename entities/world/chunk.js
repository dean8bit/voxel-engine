import Voxel from "./voxel";

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
   * @type {Array<Voxel>}
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
   * @param {Voxel} [template]
   */
  initialize(template = null) {
    this._initializeVoxels(template);
  }

  /**
   * Creates an instance of a chunk
   * @param {Voxel} [template]
   */
  _initializeVoxels(template = null) {
    this.chunks = new Array(this.size * this.size * this.size);
    for (let i = 0; i < this.chunks.length; i++) {
      this.chunks[i] = template ? template.clone() : new Voxel();
    }
  }

  /**
   * Sets the voxel at the given coordinates.
   * @param {number} x - The x coordinate.
   * @param {number} y - The y coordinate.
   * @param {number} z - The z coordinate.
   * @param {Voxel} voxel - The voxel to set.
   *
   * @returns {boolean} True if the voxel was set, false otherwise
   */
  setVoxel(x, y, z, voxel) {
    const index = x + y * this.size + z * this.size * this.size;
    if (index < 0 || index >= this.chunks.length) {
      return false;
    }
    this.chunks[index] = voxel;
    return true;
  }

  /**
   * Gets the voxel at the given coordinates.
   * @param {number} x - The x coordinate.
   * @param {number} y - The y coordinate.
   * @param {number} z - The z coordinate.
   *
   * @returns {Voxel|undefined} The voxel or undefined if it does not exist.
   */
  getVoxel(x, y, z) {
    const index = x + y * this.size + z * this.size * this.size;
    if (index < 0 || index >= this.chunks.length) {
      return undefined;
    }
    return this.chunks[index];
  }

  save() {
    return JSON.stringify({
      x: this.x,
      y: this.y,
      z: this.z,
      size: this.size,
      voxels: this.voxels.map((/** @type {Voxel} */ voxel) => voxel.save()),
    });
  }

  load(data) {
    const parsedData = JSON.parse(data);
    this.x = parsedData.x;
    this.y = parsedData.y;
    this.z = parsedData.z;
    this.size = parsedData.size;
    this.voxels = parsedData.voxels.map((/** @type {bigint} */ voxelData) => {
      const voxel = new Voxel();
      voxel.load(voxelData);
      return voxel;
    });
  }
}
