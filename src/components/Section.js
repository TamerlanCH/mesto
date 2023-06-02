class Section {
    constructor({ items, renderer }, container) {
        this._items = items;
        this._renderer = renderer;
        this._container = container;
    }

    addItem(element) {
        this._container.prepend(element)
    }

    renderItems() {
        this._items.forEach(this._renderer)
    }


}

export default Section;