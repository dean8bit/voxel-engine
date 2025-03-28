//@ts-check
export default class SpatialBag {
  /**
   * A dictionary to store chunks with their keys.
   * @type {Object.<number, Object>}
   */
  items = {};

  /**
   * Generates a unique key for a chunk based on its coordinates.
   * @param {number} x - The x-coordinate of the chunk.
   * @param {number} y - The y-coordinate of the chunk.
   * @param {number} z - The z-coordinate of the chunk.
   * @returns {number} The unique key for the chunk.
   * @private
   */
  _key(x, y, z) {
    return x + (y << 16) + (z << 32);
  }

  /**
   * Adds a chunk to the world at the specified coordinates.
   * @param {number} x - The x-coordinate of the chunk.
   * @param {number} y - The y-coordinate of the chunk.
   * @param {number} z - The z-coordinate of the chunk.
   * @param {Object} chunk - The chunk to add.
   */
  add(x, y, z, chunk) {
    const key = this._key(x, y, z);
    this.items[key] = chunk;
  }

  /**
   * Retrieves a chunk from the world at the specified coordinates.
   * @param {number} x - The x-coordinate of the chunk.
   * @param {number} y - The y-coordinate of the chunk.
   * @param {number} z - The z-coordinate of the chunk.
   * @returns {Object|undefined} The object at the specified coordinates, or undefined if it does not exist.
   */
  get(x, y, z) {
    const key = this._key(x, y, z);
    return this.items[key];
  }

  /**
   * Removes a chunk from the world at the specified coordinates.
   * @param {number} x - The x-coordinate of the chunk.
   * @param {number} y - The y-coordinate of the chunk.
   * @param {number} z - The z-coordinate of the chunk.
   */
  remove(x, y, z) {
    const key = this._key(x, y, z);
    delete this.items[key];
  }

  length() {
    return Object.keys(this.items).length;
  }
}
