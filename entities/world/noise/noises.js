export default class Noises {
  /**
   * Generates a pseudo-random noise value based on the input coordinates.
   *
   * This function uses a deterministic formula to calculate a noise value
   * based on the provided `x`, `y`, and `z` coordinates. The result is a
   * pseudo-random number between 0 (inclusive) and 1 (exclusive).
   *
   * @param {number} x - The x-coordinate input for the noise function.
   * @param {number} y - The y-coordinate input for the noise function.
   * @param {number} z - The z-coordinate input for the noise function.
   * @param {number} [seedValue=0] - An optional seed value to modify the noise output.
   * @returns {number} A pseudo-random noise value between 0 (inclusive) and 1 (exclusive).
   */
  noise(x, y, z, seedValue = 0) {
    const seed =
      Math.sin(x * 12.9898 + y * 78.233 + z * 42.345 + seedValue) *
      43758.5453123;
    return Math.floor(seed - Math.floor(seed));
  }

  /**
   * Generates a brick pattern based on the given coordinates and dimensions.
   *
   * @param {number} x - The x-coordinate in the pattern.
   * @param {number} y - The y-coordinate in the pattern.
   * @param {number} z - The z-coordinate in the pattern (unused in this function).
   * @param {number} [width=20] - The width of each brick.
   * @param {number} [height=10] - The height of each brick.
   * @param {number} [thickness=2] - The thickness of the mortar between bricks.
   * @param {boolean} [alternating=true] - Whether to stagger rows for a brick-like pattern.
   * @returns {number} - Returns 1 if the position is within a brick, or 0 if within the mortar.
   */
  brick(x, y, z, width = 20, height = 10, thickness = 2, alternating = true) {
    // Calculate the position within the brick pattern
    const row = Math.floor(y / height);
    const column = Math.floor(x / width);

    // Alternate row offsets for staggered brick pattern
    const xOffset = alternating ? (row % 2 === 0 ? 0 : width / 2) : 0;

    const localX = (x - xOffset) % width;
    const localY = y % height;

    // Determine if the position is within the mortar
    if (localX < thickness || localY < thickness) {
      return 0; // Mortar
    } else {
      return 1; // Brick
    }
  }
}
