import { Object3D, PointLight, Scene, ConeGeometry, MeshBasicMaterial, Mesh, Group } from 'three'
import { type GLTF, GLTFLoader } from 'three/examples/jsm/Addons.js'
import { InputController } from './input.controller'

export class Spaceship {
  declare public model: Object3D
  private readonly scene: Scene
  private readonly inputController: InputController
  private readonly scale: number
  private readonly speed: number = 0.5
  private readonly rotationSpeed: number = 0.01
  private readonly gltfLoader = new GLTFLoader()
  // Propiedades para la flotación:
  private floatOffset: number = 0
  private readonly floatSpeed: number = 0.02
  private readonly floatAmplitude: number = 0.3
  // flamas de los motores
  private engineFlames: Group[] = []

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
      this.createEngineFlames()
    })
  }

  private createEngineFlames(): void {
    const positions = [
      { x: -3, y: 0, z: 2 }, // Turbina izquierda
      { x: 3, y: 0, z: 2 }, // Turbina derecha
    ]

    positions.forEach((pos) => {
      const flameGroup = new Group()

      // Geometría de la llama
      const flameGeometry = new ConeGeometry(0.4, 2, 8)
      const flameMaterial = new MeshBasicMaterial({
        color: 0xff6600,
        transparent: true,
        opacity: 0.7,
      })
      const flameMesh = new Mesh(flameGeometry, flameMaterial)
      flameMesh.rotation.x = Math.PI / 2 // Apunta hacia atrás
      flameMesh.position.z = -1 // Sale de la turbina

      // Luz para iluminar
      const light = new PointLight(0xff6600, 3, 8)
      light.position.z = -1

      flameGroup.add(flameMesh)
      flameGroup.add(light)
      flameGroup.position.set(pos.x, pos.y, pos.z)

      this.engineFlames.push(flameGroup)
      this.model.add(flameGroup)
    })
  }

  // mover la nave
  public update(): void {
    if (!this.model) return

    // Animación de flotación
    this.floatOffset += this.floatSpeed
    this.model.position.y = Math.sin(this.floatOffset) * this.floatAmplitude

    // Animar las llamas (parpadeo y escala)
    this.engineFlames.forEach((flameGroup) => {
      const time = Date.now() * 0.004
      flameGroup.children.forEach((child) => {
        if (child instanceof Mesh) {
          child.scale.y = 1 + Math.sin(time) * 0.3
        }
        if (child instanceof PointLight) {
          child.intensity = 3 + Math.sin(time) * 1.5
        }
      })
    })

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
