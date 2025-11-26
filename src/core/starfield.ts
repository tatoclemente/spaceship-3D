import { BufferGeometry, Float32BufferAttribute, Points, PointsMaterial, Scene, TextureLoader } from 'three'

export class StarField {
  declare private starField: Points
  declare private scene: Scene
  private readonly starQty: number = 20000
  private readonly range: number = 1000

  constructor(scene: Scene) {
    this.scene = scene
    this.createField()
  }

  private createField() {
    const positions = new Float32Array(this.starQty * 3) // Posiciones de las estrellas en 3D

    for (let i = 0; i < this.starQty; i++) {
      const x = (Math.random() - 0.5) * this.range
      const y = (Math.random() - 0.5) * this.range
      const z = (Math.random() - 0.5) * this.range

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
    }
    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))

    // Crear textura circular
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 32, 32)

    const texture = new TextureLoader().load(canvas.toDataURL())

    const material = new PointsMaterial({
      color: 0xffffff,
      size: 1,
      map: texture,
      transparent: true,
      opacity: 0.8,
      depthTest: true,
      sizeAttenuation: true,
    })

    this.starField = new Points(geometry, material)

    this.scene.add(this.starField)
  }
}
