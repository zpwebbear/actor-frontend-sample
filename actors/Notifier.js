export class Notifier {
  constructor(engine) {
    this.engine = engine;
    console.log("Start actor: %s", this.constructor.name);
  }

  async message({ message }) {
    window.alert(message);
  }
  async exit() {
    console.log("Stop actor: %s", this.constructor.name);
  }
}
