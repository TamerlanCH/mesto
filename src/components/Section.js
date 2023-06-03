class Section {
    constructor({ renderer }, container) {
        this._renderer = renderer;
        this._container = container;
    }

    addItem(element) {
        this._container.prepend(element)
    }

    renderItems(cards) {
        cards.reverse().forEach((item) => {
            this._renderer(item);
        })
    }
}

export default Section;