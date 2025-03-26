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

  _get_flat_index(x, y, z) {
    return x + this.width * (y + this.height * z);
  }

  setVoxel(x, y, z, value) {
    var index = this._get_flat_index(x, y, z);
    if (index < 0 || index >= this.voxels.length) {
      return;
    }
    this.voxels[index] = value;
  }

  getVoxel(x, y, z) {
    var index = this._get_flat_index(x, y, z);
    return this.voxels[index];
  }

  setActive(x, y, z, value) {
    var voxel = this.getVoxel(x, y, z);
    if (voxel === undefined) {
      return;
    }
    this.setVoxel(x, y, z, value ? voxel | (1 << 31) : voxel & (~1 << 31));
  }

  getActive(x, y, z) {
    var voxel = this.getVoxel(x, y, z);
    return (voxel & (1 << 31)) !== 0;
  }

  setBlockType(x, y, z, value) {
    var voxel = this.getVoxel(x, y, z);
    if (voxel === undefined) {
      return;
    }
    this.setVoxel(x, y, z, (voxel & (~0xfff << 8)) | ((value & 0xfff) << 8));
  }

  getBlockType(x, y, z) {
    var voxel = this.getVoxel(x, y, z);
    return (voxel & (0xfff << 8)) >> 8;
  }

  setDecoration(x, y, z, value) {
    var voxel = this.getVoxel(x, y, z);
    if (voxel === undefined) {
      return;
    }
    this.setVoxel(x, y, z, (voxel & (~0xff << 20)) | ((value & 0xff) << 20));
  }

  getDecoration(x, y, z) {
    var voxel = this.getVoxel(x, y, z);
    return (voxel & (0xff << 20)) >> 20;
  }

  getCorner(x, y, z) {
    var voxel = this.getVoxel(x, y, z);
    return voxel & 0xff;
  }

  setCorner(x, y, z, value) {
    var voxel = this.getVoxel(x, y, z);
    if (voxel === undefined) {
      return;
    }
    this.setVoxel(x, y, z, (voxel & ~0xff) | (value & 0xff));
  }
}
