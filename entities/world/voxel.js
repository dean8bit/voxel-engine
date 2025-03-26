/**
 * Class representing a Voxel in the voxel engine.
 *
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
 * The voxel data is stored in a BigInt with the following structure:
 * 0xFF000000000 (RED)
 * 0x00FF0000000 (GREEN)
 * 0x0000FF00000 (BLUE)
 * 0x000000FF000 (ALPHA)
 * 0x00000000FF0 (CORNERS) (TopFrontLeft, TopFrontRight, TopBackLeft, TopBackRight, BottomFrontLeft, BottomFrontRight, BottomBackLeft, BottomBackRight) (1 bit each)
 * 0x0000000000F (Active 0 (FALSE) or >1 (TRUE))
 */
export default class Voxel {
  /**
   * The voxel data
   * @private
   * @type {BigInt}
   */
  _data = BigInt(0xfffffffffff);

  /**
   * Gets the red color component.
   * @returns {number} The red component (0-255).
   */
  get Red() {
    return Number((this._data >> BigInt(36)) & BigInt(0xff));
  }

  /**
   * Sets the red color component.
   * @param {number} value - The red component (0-255).
   */
  set Red(value) {
    value = Math.max(0, Math.min(255, value));
    this._data =
      (this._data & ~BigInt(0xff000000000)) | (BigInt(value) << BigInt(36));
  }

  /**
   * Gets the green color component.
   * @returns {number} The green component (0-255).
   */
  get Green() {
    return Number((this._data >> BigInt(28)) & BigInt(0xff));
  }

  /**
   * Sets the green color component.
   * @param {number} value - The green component (0-255).
   */
  set Green(value) {
    value = Math.max(0, Math.min(255, value));
    this._data =
      (this._data & ~BigInt(0x00ff0000000)) | (BigInt(value) << BigInt(28));
  }

  /**
   * Gets the blue color component.
   * @returns {number} The blue component (0-255).
   */
  get Blue() {
    return Number((this._data >> BigInt(20)) & BigInt(0xff));
  }

  /**
   * Sets the blue color component.
   * @param {number} value - The blue component (0-255).
   */
  set Blue(value) {
    value = Math.max(0, Math.min(255, value));
    this._data =
      (this._data & ~BigInt(0x0000ff00000)) | (BigInt(value) << BigInt(20));
  }

  /**
   * Gets the alpha (transparency) component.
   * @returns {number} The alpha component (0-255).
   */
  get Alpha() {
    return Number((this._data >> BigInt(12)) & BigInt(0xff));
  }

  /**
   * Sets the alpha (transparency) component.
   * @param {number} value - The alpha component (0-255).
   */
  set Alpha(value) {
    value = Math.max(0, Math.min(255, value));
    this._data =
      (this._data & ~BigInt(0x000000ff000)) | (BigInt(value) << BigInt(12));
  }

  /**
   * Gets the active state of the voxel.
   *
   * @returns {boolean} True if the voxel is active, otherwise false.
   */
  get Active() {
    return Number(this._data & BigInt(0xf)) > 0;
  }

  /**
   * Sets the active state of the voxel.
   *
   * @param {boolean} value - The new active state of the voxel.
   *                          If true, the voxel is active; otherwise, it is inactive.
   */
  set Active(value) {
    this._data = (this._data & ~BigInt(0xf)) | BigInt(value ? 1 : 0);
  }

  /**
   * Gets the state of a corner by its position.
   * @param {number} position - The bit position (0-7) for the corner.
   *        3----------4
   *       / |       / |
   *     1----------2  |
   *     |  |      |   |
   *     |  7------|---8
   *     | /       | /
   *     5---------6
   * @returns {boolean} The corner state (true for active, false for inactive).
   */
  _getCorner(position) {
    return Boolean((this._data >> BigInt(position + 4)) & BigInt(0x1));
  }

  /**
   * Sets the state of a corner by its position.
   * @param {number} position - The bit position (0-7) for the corner.
   *        3----------4
   *       / |       / |
   *     1----------2  |
   *     |  |      |   |
   *     |  7------|---8
   *     | /       | /
   *     5---------6
   * @param {boolean} value - The new state (true for active, false for inactive).
   */
  _setCorner(position, value) {
    if (value) {
      this._data |= BigInt(0x1) << BigInt(position + 4); // Set the bit to 1
    } else {
      this._data &= ~(BigInt(0x1) << BigInt(position + 4)); // Clear the bit to 0
    }
  }

  /**
   * Gets the top front left (TopFrontLeft) corner state.
   * @returns {boolean} The TopFrontLeft corner state.
   */
  get TopFrontLeft() {
    return this._getCorner(0);
  }

  /**
   * Sets the top front left (TopFrontLeft) corner state.
   * @param {boolean} value - The new TopFrontLeft corner state.
   */
  set TopFrontLeft(value) {
    this._setCorner(0, value);
  }

  /**
   * Gets the top front right (TopFrontRight) corner state.
   * @returns {boolean} The TopFrontRight corner state.
   */
  get TopFrontRight() {
    return this._getCorner(1);
  }

  /**
   * Sets the top front right (TopFrontRight) corner state.
   * @param {boolean} value - The new TopFrontRight corner state.
   */
  set TopFrontRight(value) {
    this._setCorner(1, value);
  }

  /**
   * Gets the top back left (TopBackLeft) corner state.
   * @returns {boolean} The TopBackLeft corner state.
   */
  get TopBackLeft() {
    return this._getCorner(2);
  }

  /**
   * Sets the top back left (TopBackLeft) corner state.
   * @param {boolean} value - The new TopBackLeft corner state.
   */
  set TopBackLeft(value) {
    this._setCorner(2, value);
  }

  /**
   * Gets the top back right (TopBackRight) corner state.
   * @returns {boolean} The TopBackRight corner state.
   */
  get TopBackRight() {
    return this._getCorner(3);
  }

  /**
   * Sets the top back right (TopBackRight) corner state.
   * @param {boolean} value - The new TopBackRight corner state.
   */
  set TopBackRight(value) {
    this._setCorner(3, value);
  }

  /**
   * Gets the bottom front left (BottomFrontLeft) corner state.
   * @returns {boolean} The BottomFrontLeft corner state.
   */
  get BottomFrontLeft() {
    return this._getCorner(4);
  }

  /**
   * Sets the bottom front left (BottomFrontLeft) corner state.
   * @param {boolean} value - The new BottomFrontLeft corner state.
   */
  set BottomFrontLeft(value) {
    this._setCorner(4, value);
  }

  /**
   * Gets the bottom front right (BottomFrontRight) corner state.
   * @returns {boolean} The BottomFrontRight corner state.
   */
  get BottomFrontRight() {
    return this._getCorner(5);
  }

  /**
   * Sets the bottom front right (BottomFrontRight) corner state.
   * @param {boolean} value - The new BottomFrontRight corner state.
   */
  set BottomFrontRight(value) {
    this._setCorner(5, value);
  }

  /**
   * Gets the bottom back left (BottomBackLeft) corner state.
   * @returns {boolean} The BottomBackLeft corner state.
   */
  get BottomBackLeft() {
    return this._getCorner(6);
  }

  /**
   * Sets the bottom back left (BottomBackLeft) corner state.
   * @param {boolean} value - The new BottomBackLeft corner state.
   */
  set BottomBackLeft(value) {
    this._setCorner(6, value);
  }

  /**
   * Gets the bottom back right (BottomBackRight) corner state.
   * @returns {boolean} The BottomBackRight corner state.
   */
  get BottomBackRight() {
    return this._getCorner(7);
  }

  /**
   * Sets the bottom back right (BottomBackRight) corner state.
   * @param {boolean} value - The new BottomBackRight corner state.
   */
  set BottomBackRight(value) {
    this._setCorner(7, value);
  }

  /**
   * Clones the voxel.
   * @returns {Voxel} - The cloned voxel.
   */
  clone() {
    const voxel = new Voxel();
    voxel._data = this._data;
    return voxel;
  }

  /**
   * Saves the voxel data.
   * @returns {BigInt} - The saved voxel data.
   */
  save() {
    return this._data;
  }

  /**
   * Loads the voxel data.
   * @param {BigInt} data - The voxel data to load.
   */
  load(data) {
    this._data = data;
  }
}
