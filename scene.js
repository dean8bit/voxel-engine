import * as THREE from "./libs/three.module.js";

export default class Scene extends THREE.Scene {
  /**
   * The camera used to view the scene.
   * @type {THREE.Camera}
   */
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  /**
   * A flag indicating whether the scene has been initialized.
   * @type {boolean}
   */
  initialized = false;

  /**
   * The event dispatcher used to dispatch events. ("update", "init")
   * @type {THREE.EventDispatcher}
   */
  eventDispatcher = new THREE.EventDispatcher();

  /**
   * Called to init the scene.
   * @abstract
   */
  init() {}

  /**
   * Updates the scene.
   * Calls the init method if the scene has not been initialized.
   * Dispatches an "init" event when the scene is initialized.
   * Dispatches an "update" event after the scene is updated
   */
  _update() {
    if (!this.initialized) {
      this.init();
      this.initialized = true;
      this.eventDispatcher.dispatchEvent({ type: "init" });
    }
    this.update();
    this.eventDispatcher.dispatchEvent({ type: "update" });
  }

  /**
   * Called to update the scene.
   * @abstract
   */
  update() {}
}
