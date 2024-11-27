export class HtmlRenderer {
  createElement(htmlString) {
    const itemElement = document.createElement('template');
    itemElement.innerHTML = htmlString;
    return itemElement.content.cloneNode(true);
  }

  get target() {
    return document.querySelector(`[data-actor-id="${this.actorId}"]`);
  }

  render(htmlString) {
    this.target.outerHTML = htmlString;
  }
}
