//@ts-check

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
 * [A][Typ]  [Decoration    ]  [Block Type             ]  [Corner        ]
 * [1 1 1 1  1 1 1 1  1 1 1 1  1 1 1 1  1 1 1 1  1 1 1 1  1 1 1 1  1 1 1 1]
 *
 * [A]            - 1 bit         - 0: Inactive, 1: Active
 * [Typ]e         - 3 bits        - The type of data for the next 28 bits
 * [Decoration]   - 8 bits        - The decoration on the block
 * [Block Type]   - 12 bits       - The block type
 * [Corner]       - 8 bits        - The on off state of each corner
 */

/**
 * Represents a chunk in the voxel game.
 * There is a lot of repitition in this class, but it is done for performance reasons.
 * Inlining and reducing function overhead.
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
   * @type {Uint32Array}
   */
  voxels = null;

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
    this.voxels = new Uint32Array(this.width * this.height * this.depth);
    for (var i = 0; i < this.voxels.length; i++) {
      this.voxels[i] = 0;
    }
  }

  /**
   * Calculates the flat index for the 3D coordinates.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @param {number} z - The z-coordinate.
   *
   * @returns {number} The flat index.
   */
  _get_flat_index(x, y, z) {
    return x + this.width * (y + this.height * z);
  }

  /**
   * Sets the voxel value at the specified coordinates.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @param {number} z - The z-coordinate.
   * @param {number} value - The voxel value to set.
   */
  setVoxel(x, y, z, value) {
    var index = x + this.width * (y + this.height * z);
    if (index >= 0 && index < this.voxels.length) {
      this.voxels[index] = value;
    }
  }

  /**
   * Gets the voxel value at the specified coordinates.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @param {number} z - The z-coordinate.
   *
   * @returns {number|undefined} The voxel value. Undefined if the voxel is out of bounds
   */
  getVoxel(x, y, z) {
    return this.voxels[x + this.width * (y + this.height * z)];
  }

  /**
   * Sets the active state of the voxel at the specified coordinates.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @param {number} z - The z-coordinate.
   * @param {boolean} value - The active state to set (true for active, false for inactive).
   */
  setActive(x, y, z, value) {
    var voxel = this.voxels[x + this.width * (y + this.height * z)];
    if (voxel !== undefined) {
      this.setVoxel(x, y, z, value ? voxel | 0x80000000 : voxel & ~0x80000000);
    }
  }

  /**
   * Gets the active state of the voxel at the specified coordinates.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @param {number} z - The z-coordinate.
   *
   * @returns {boolean|undefined} True if the voxel is active, false otherwise. Undefined if the voxel is out of bounds
   */
  getActive(x, y, z) {
    var voxel = this.voxels[x + this.width * (y + this.height * z)];
    return voxel !== undefined ? (voxel & 0x80000000) !== 0 : undefined;
  }

  /**
   * Sets the block type at the specified coordinates.
   * @param {number} x  - The x-coordinate
   * @param {number} y  - The y-coordinate
   * @param {number} z  - The z-coordinate.
   * @param {number} value  - The block type to set.
   */
  setBlockType(x, y, z, value) {
    var voxel = this.voxels[x + this.width * (y + this.height * z)];
    if (voxel !== undefined) {
      this.setVoxel(x, y, z, (voxel & ~0xfff00) | ((value & 0xfff) << 8));
    }
  }

  /**
   * Gets the block type at the specified coordinates.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @param {number} z - The z-coordinate.
   *
   * @returns {number|undefined} The block type. Undefined if the voxel is out of bounds
   */
  getBlockType(x, y, z) {
    var voxel = this.voxels[x + this.width * (y + this.height * z)];
    return voxel !== undefined ? (voxel & 0xfff00) >> 8 : undefined;
  }

  /**
   * Sets the decoration value at the specified coordinates.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @param {number} z - The z-coordinate.
   * @param {number} value - The decoration value to set.
   */
  setDecoration(x, y, z, value) {
    var voxel = this.voxels[x + this.width * (y + this.height * z)];
    if (voxel !== undefined) {
      this.setVoxel(x, y, z, (voxel & ~0xff00000) | ((value & 0xff) << 20));
    }
  }

  /**
   * Gets the decoration value at the specified coordinates.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @param {number} z - The z-coordinate.
   *
   * @returns {number|undefined} The decoration value. Undefined if the voxel is out of bounds
   */
  getDecoration(x, y, z) {
    var voxel = this.voxels[x + this.width * (y + this.height * z)];
    return voxel !== undefined ? (voxel & 0xff00000) >> 20 : undefined;
  }

  /**
   * Gets the corner state at the specified coordinates.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @param {number} z - The z-coordinate.
   *
   * @returns {number|undefined} The corner state. Undefined if the voxel is out of bounds
   */
  getCorner(x, y, z) {
    var voxel = this.voxels[x + this.width * (y + this.height * z)];
    return voxel !== undefined ? voxel & 0xff : undefined;
  }

  /**
   * Sets the corner state at the specified coordinates.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @param {number} z - The z-coordinate.
   * @param {number} value - The corner state to set.
   */
  setCorner(x, y, z, value) {
    var voxel = this.voxels[x + this.width * (y + this.height * z)];
    if (voxel !== undefined) {
      this.setVoxel(x, y, z, (voxel & ~0xff) | (value & 0xff));
    }
  }
}
