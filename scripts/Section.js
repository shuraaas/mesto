// Класс отвечает за отрисовку элементов на странице
export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // метод принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }

  // clear() {
  //   this._container.innerHTML = '';
  // }

  // метод, который отвечает за отрисовку всех элементов
  renderItems() {
    // this.clear();

    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}