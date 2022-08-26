// Класс отвечает за отрисовку элементов на странице
export default class Section {
  constructor( { renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // метод принимает DOM-элемент и добавляет его в контейнер
  addItem(card) {
    this._container.prepend(card);
  }

  // метод, который отвечает за отрисовку всех элементов
  renderItems(cards) {
    cards.forEach(card => this._renderer(card));
  }
}