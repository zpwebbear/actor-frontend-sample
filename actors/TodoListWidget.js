import { HtmlRenderer } from "./HtmlRenderer.js";

export class TodoListWidget extends HtmlRenderer {
  actorId = "todo-list";
  constructor(engine) {
    super(engine);
    this.engine = engine;
    console.log("Start actor: %s", this.constructor.name);
  }

  async renderList(list) {
    return this.render(`
        <div data-actor-id="${this.actorId}" class="list">
          ${list
            .map(
              (item) =>
            `<div class="todo-item">
              <label class="item-title" for="${item.id}-input">${item.title}</label>
              <input 
               type="checkbox" 
               id="${item.id}-input" 
               ${item.completed ? "checked" : ""} 
              />
            </div>`
            )
            .join("")}</div>
      `);
  }

  async message({ action, payload }) {
    if (!["renderList"].includes(action)) return;
    this[action](payload);
  }

  async exit() {
    console.log("Stop actor: %s", this.constructor.name);
  }
}
