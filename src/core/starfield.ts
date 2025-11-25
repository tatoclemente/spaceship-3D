import { BufferGeometry, Float32BufferAttribute, Points, PointsMaterial, Scene } from 'three'

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

    const material = new PointsMaterial({
      color: 0xffffff,
      size: 1,
      transparent: true,
      opacity: 0.8,
      depthTest: true,
    })

    this.starField = new Points(geometry, material)

    this.scene.add(this.starField)
  }
}
