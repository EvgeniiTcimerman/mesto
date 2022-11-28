export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(cardElement, position = "before") {
    switch (position) {
      case "before":
        this._container.prepend(cardElement);
        break;

      case "after":
        this._container.append(cardElement);
        break;
      default:
        break;
    }
  }

  renderCards() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
