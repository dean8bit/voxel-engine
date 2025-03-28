//@ts-check
import * as THREE from "./libs/three.module.js";
import Scene from "./scene.js";

export default class Game {
  /**
   * The renderer used to render the game.
   * @type {THREE.WebGLRenderer}
   */
  renderer = null;

  /**
   * A dictionary of scenes in the game.
   * @type {Object.<string, Scene>}
   */
  scenes = { default: new Scene() };

  /**
   * The active scene
   * @type {string}
   */
  scene = "default";

  /**
   * A flag indicating whether the game is paused.
   * @type {boolean}
   */
  paused = false;

  /**
   * Initializes a new instance of the game engine.
   * Sets up the WebGL renderer, appends it to the document body,
   * and adds an event listener to handle window resizing.
   */
  constructor() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    window.addEventListener("resize", () => this.updateAspect());
  }

  /**
   * Updates the aspect ratio of the camera and the renderer size based on the current window dimensions.
   * This method should be called whenever the window is resized to ensure the camera's aspect ratio
   * and the renderer's size are correctly updated.
   */
  updateAspect() {
    const camera = this.scenes[this.scene].camera;
    // @ts-ignore
    camera.aspect = window.innerWidth / window.innerHeight;
    // @ts-ignore
    camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  /**
   * Starts the animation loop for the game.
   * The loop will continue to render the current scene as long as the game is not paused.
   * Uses the renderer's setAnimationLoop method to repeatedly call the render function.
   * Handles initialization of the scene before rendering.
   */
  animate() {
    this.renderer.setAnimationLoop(() => {
      if (this.paused) return;
      const scene = this.scenes[this.scene];
      if (scene) {
        scene._update();
        this.renderer.render(scene, scene.camera);
      }
    });
  }
}
