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
 * @returns {number} A pseudo-random noise value between 0 (inclusive) and 1 (exclusive).
 */
function noise(x, y, z) {
  const seed = Math.sin(x * 12.9898 + y * 78.233 + z * 42.345) * 43758.5453123;
  return Math.floor(seed - Math.floor(seed));
}
