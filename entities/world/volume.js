import Chunk from "./chunk";

export class Volume {
  /**
   * The width of the Volume.
   * @type {number}
   */
  width = 16;
  /**
   * The height of the Volume.
   * @type {number}
   */
  height = 16;
  /**
   * The depth of the Volume.
   * @type {number}
   */
  depth = 16;

  /**
   * A flat array representing the 3D chunks.
   * @type {Array.<Chunk>}
   */
  chunks = [];

  get(x, y, z) {
    return this.chunks[x + this.width * (y + this.height * z)];
  }

  set(x, y, z, chunk) {
    const index = x + this.width * (y + this.height * z);
    if (index < 0 || index >= this.chunks.length) return;
    this.chunks[index] = chunk;
  }
}
