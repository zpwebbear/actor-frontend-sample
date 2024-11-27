export class TodoFeature {
  dependencies = ['ButtonWidget', 'TodoListLoader', 'TodoListWidget', 'Notifier'];
  constructor(engine, options) {
    this.engine = engine;
    this.options = options;
    this.dependencies.forEach((d) => {
      this.engine.start(d);
    });
    console.log('Start actor: %s', this.constructor.name);
  }

  async message() {}

  async exit() {
    this.dependencies.forEach((d) => {
      this.engine.stop(d);
    });
    console.log('Stop actor: %s', this.constructor.name);
  }
}
