export class InputController {
  private keys: { [key: string]: boolean } = {}

  constructor() {
    this.listenToEvents()
  }

  public isKeyPressed(keyCode: string): boolean {
    return !!this.keys[keyCode]
  }

  private onKeyDown(event: KeyboardEvent): void {
    this.keys[event.code] = true
  }

  private onKeyUp(event: KeyboardEvent): void {
    this.keys[event.code] = false
  }

  private listenToEvents(): void {
    window.addEventListener('keydown', this.onKeyDown.bind(this))
    window.addEventListener('keyup', this.onKeyUp.bind(this))
  }
}
