// Класс отвечает за отрисовку элементов на странице
export default class Section {
  constructor({ items, renderer }, containerSelector) {

    // console.log(items)

    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // метод принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }

  // метод, который отвечает за отрисовку всех элементов
  renderItems() {
    this._renderedItems.then(items => {
      items.forEach(item => {

          // console.log(item)

          this._renderer(item);
        });
    });
  }
}