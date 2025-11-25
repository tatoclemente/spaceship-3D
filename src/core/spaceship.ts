import { Object3D, Scene } from 'three'
import { type GLTF, GLTFLoader } from 'three/examples/jsm/Addons.js'
import { InputController } from './input.controller'

export class Spaceship {
  declare private model: Object3D
  private readonly scene: Scene
  private readonly inputController: InputController
  private readonly scale: number
  private readonly speed: number = 0.1
  private readonly rotationSpeed: number = 0.05
  private readonly gltfLoader = new GLTFLoader()

  constructor(scene: Scene, inputController: InputController, scale: number) {
    this.scene = scene
    this.inputController = inputController
    this.scale = scale
  }

  // cargar modelo
  public loadModel(): void {
    this.gltfLoader.load('/spaceship.glb', (gltf: GLTF) => {
      this.model = gltf.scene
      this.model.scale.set(this.scale, this.scale, this.scale)
      this.scene.add(this.model)
    })
  }

  // mover la nave
  public update(): void {
    if (!this.model) return

    if (this.inputController.isKeyPressed('KeyW')) {
      this.model.translateZ(this.speed)
    }

    if (this.inputController.isKeyPressed('KeyS')) {
      this.model.translateZ(-this.speed)
    }

    if (this.inputController.isKeyPressed('KeyA')) {
      this.model.rotateY(this.rotationSpeed)
    }

    if (this.inputController.isKeyPressed('KeyD')) {
      this.model.rotateY(-this.rotationSpeed)
    }
  }
}
