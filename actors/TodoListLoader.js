export class TodoListLoader {
  constructor(engine) {
    this.engine = engine;
    this.controller = new AbortController();
    console.log("Start actor: %s", this.constructor.name);
  }

  async loadData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      signal: this.controller.signal,
    });
    if (!response.ok) {
      throw new Error(`Something went wrong: ${response.status}`);
    }
    const json = await response.json();
    return json;
  }

  async load() {
    this.engine.send("ButtonWidget", { action: "startLoading" });
    try {
      const json = await this.loadData();
      this.engine.send("TodoListWidget", {
        action: "renderList",
        payload: json,
      });
    } catch (e) {
      this.engine.send("Notifier", { message: e.message });
    } finally {
      this.engine.send("ButtonWidget", { action: "stopLoading" });
    }
  }

  async message({ action }) {
    if (!["load"].includes(action)) return;
    await this[action]();
  }

  async exit() {
    this.controller.abort();
    console.log(`Stop actor: %s`, this.constructor.name);
  }
}
