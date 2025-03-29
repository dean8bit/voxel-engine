//@ts-check
// Key is a number
// 21 bits for x
// 21 bits for y
// 21 bits for z
// 1 bit unused
export default class Bag {
  /**
   * A dictionary to store objects with their keys. max 2097151 objects each direction
   * @type {Object.<number, Object>}
   */
  items = {};

  /**
   * Generates a unique key for a object based on its coordinates.
   * @param {number} x - The x-coordinate of the object.
   * @param {number} y - The y-coordinate of the object.
   * @param {number} z - The z-coordinate of the object.
   * @returns {number|string} The unique key for the object.
   * @private
   */
  _key(x, y, z) {
    return "x" + x + "y" + y + "z" + z;
    //return (x & 0x1fffff) | ((y & 0x1fffff) << 21) | ((z & 0x1fffff) << 42);
  }

  /**
   * Adds a object to the world at the specified coordinates.
   * @param {number} x - The x-coordinate of the object.
   * @param {number} y - The y-coordinate of the object.
   * @param {number} z - The z-coordinate of the object.
   * @param {Object} object - The object to add.
   */
  add(x, y, z, object) {
    const key = this._key(x, y, z);
    this.items[key] = object;
  }

  /**
   * Retrieves a object from the world at the specified coordinates.
   * @param {number} x - The x-coordinate of the object.
   * @param {number} y - The y-coordinate of the object.
   * @param {number} z - The z-coordinate of the object.
   * @returns {Object|undefined} The object at the specified coordinates, or undefined if it does not exist.
   */
  get(x, y, z) {
    const key = this._key(x, y, z);
    return this.items[key];
  }

  /**
   * Removes a object from the world at the specified coordinates.
   * @param {number} x - The x-coordinate of the object.
   * @param {number} y - The y-coordinate of the object.
   * @param {number} z - The z-coordinate of the object.
   */
  remove(x, y, z) {
    const key = this._key(x, y, z);
    delete this.items[key];
  }

  length() {
    return Object.keys(this.items).length;
  }
}
