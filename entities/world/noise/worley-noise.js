/*
The MIT License (MIT)

Copyright (c) 2014 Zsolt Czinege

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// Creates a new noise instance with 10 randomly placed points.
// seed: optional argument for reproducibility.
// dim: dimension (defaults to 2).
// Coordinates range from (0, 0) to (1, 1).
var noise = new WorleyNoise({
  numPoints: 10,
  /*seed: 42,*/
  /*dim: 3,*/
});

/**
// Manually adds a point to the center.

noise.addPoint({ x: 0.5, y: 0.5 });

// Gets Euclidean noise value at (0.3, 0.4).
// The third argument (k) defines which point should be chosen when calculating the distance.
// As k=1 in this case, the closest point is chosen.

console.log(noise.getEuclidean({ x: 0.3, y: 0.4 }, 1));

// Gets Manhattan noise value at (0.3, 0.4).
// As k=2 in this case, the 2nd closest point is chosen.

console.log(noise.getManhattan({ x: 0.3, y: 0.4 }, 2));

// Creates an 5x5 array with the computed noise values.

var width = 5;

var img = noise.renderImage(width);

// Gets value at (3, 2).
// (3, 2) corresponds to (3 / (5 - 1), 2 / (5 - 1)) -> (0.75, 0.5).

console.log(img[2 * width + 3]);

// Creates a normalized array where values have been scaled to be between 0 and 1.

img = noise.renderImage(width, { normalize: true });

// Uses custom function for noise value calculation.
// It sums the Euclidean distance to the closest point
// and the Manhattan distance to the second closest point.

img = noise.renderImage(width, {
  normalize: true,
  callback: function (e, m) { return e(1) + m(2); }
});
*/

class WorleyNoise {
  constructor(config) {
    config = config || {};
    if (config.dim !== 2 && config.dim !== 3 && config.dim !== undefined)
      throw '"dim" can be 2 or 3';

    this._dim = config.dim || 2;
    this._rng = () => config.seed || Math.random();
    this._points = [];

    for (let i = 0; i < config.numPoints; i++) {
      this._points.push({
        x: this._rng(),
        y: this._rng(),
        z: this._rng(),
      });
    }
  }

  addPoint(coord) {
    this._points.push(coord);
  }

  getEuclidean(coord, k) {
    return Math.sqrt(this._calculateValue(coord, k, euclidean));
  }

  getManhattan(coord, k) {
    return this._calculateValue(coord, k, manhattan);
  }

  renderImage(resolution, config) {
    config = config || {};
    const step = 1 / (resolution - 1);
    const img = [];
    const callback = config.callback || ((e, m) => e(1));
    let x, y;

    const e = (k) =>
      Math.sqrt(
        this._calculateValue(
          {
            x: x * step,
            y: y * step,
            z: config.z || 0,
          },
          k,
          euclidean
        )
      );

    const m = (k) =>
      this._calculateValue(
        {
          x: x * step,
          y: y * step,
          z: config.z || 0,
        },
        k,
        manhattan
      );

    for (y = 0; y < resolution; ++y) {
      for (x = 0; x < resolution; ++x) {
        img[y * resolution + x] = callback(e, m);
      }
    }

    if (!config.normalize) return img;

    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    img.forEach((v) => {
      min = Math.min(min, v);
      max = Math.max(max, v);
    });

    let scale = 1 / (max - min);
    return img.map((v) => (v - min) * scale);
  }

  _calculateValue(coord, k, distFn) {
    let minDist;
    this._points.forEach((p) => {
      p.selected = false;
    });

    for (let j = 0; j < k; ++j) {
      let minIdx;
      minDist = Number.POSITIVE_INFINITY;

      for (let i = 0; i < this._points.length; ++i) {
        const p = this._points[i];
        const dz = this._dim === 2 ? 0 : coord.z - p.z;
        const dist = distFn(coord.x - p.x, coord.y - p.y, dz);

        if (dist < minDist && !p.selected) {
          minDist = dist;
          minIdx = i;
        }
      }

      this._points[minIdx].selected = true;
    }

    return minDist;
  }
}

const euclidean = (dx, dy, dz) => dx * dx + dy * dy + dz * dz;
const manhattan = (dx, dy, dz) => Math.abs(dx) + Math.abs(dy) + Math.abs(dz);

export default WorleyNoise;
