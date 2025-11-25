import { AmbientLight, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { Spaceship } from './spaceship'
import { InputController } from './input.controller'
import { StarField } from './starfield'
import { CameraController } from './camera.controller'

export class App {
  private readonly canvas = document.getElementById('canvas') as HTMLCanvasElement

  private readonly scene = new Scene()
  private readonly camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  private readonly renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true })
  private readonly inputController = new InputController()
  private readonly spaceship = new Spaceship(this.scene, this.inputController, 0.2)
  private readonly cameraController = new CameraController(this.camera, this.spaceship)

  constructor() {
    this.config()
    this.createLights()
    this.createInstance()

    this.animate()
  }

  private createInstance() {
    this.spaceship.loadModel()
    new StarField(this.scene)
  }

  config() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.position.set(0, 8, -10)
    this.camera.lookAt(0, 0, 0)
  }

  animate() {
    this.renderer.render(this.scene, this.camera)
    this.spaceship.update()
    this.cameraController.update()
    requestAnimationFrame(this.animate.bind(this))
  }

  // iluminación
  createLights() {
    const ambientLight = new AmbientLight(0xffffff, 0.6)
    this.scene.add(ambientLight)

    const directionalLight = new DirectionalLight(0xffffff, 0.8)
    this.scene.add(directionalLight)
  }
}
