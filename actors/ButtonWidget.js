import { HtmlRenderer } from "./HtmlRenderer.js";

export class ButtonWidget extends HtmlRenderer {
  actorId = "load-trigger";
  eventName = "click";
  constructor(engine) {
    super(engine);
    this.engine = engine;
    this.boundListener = this.listener.bind(this);
    this.target.addEventListener(this.eventName, this.boundListener);
    console.log(`Start actor: %s`, this.constructor.name);
  }

  async listener(e) {
    this.engine.send("TodoListLoader", { action: "load" });
  }

  async startLoading() {
    this.render(
      `<button data-actor-id="${this.actorId}" type="button" disabled>Loading...</button>`
    );
  }

  async stopLoading() {
    this.render(
      `<button data-actor-id="${this.actorId}" type="button">Load data</button>`
    );
  }

  async message({ action, payload }) {
    if (!["startLoading", "stopLoading"].includes(action)) return;
    this[action](payload);
  }

  async exit() {
    this.target.removeEventListener(this.eventName, this.boundListener);
    console.log(`Stop actor: %s`, this.constructor.name);
  }
}
