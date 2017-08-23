function RightMenu(width, height, id, classs, parent, title) {
    this.width = width;
    this.height = height;
    this.id = id;
    this.class = classs;
    this.parent = parent;

    this.element = createDiv('');
    this.element.attribute('id', id);
    this.element.parent(parent);
    this.element.addClass(classs);
    this.element.style('height', height + 'px');
    this.element.style('width', width + 'px');
    this.content = [];

    this.title = createDiv("<p class='menuTitle'>" + title + "</p>");
    this.title.parent(id);
    this.title.addClass('menuTitleDiv');
}

RightMenu.prototype.addVariable = function(element){
    this.content.push(element);
};

RightMenu.prototype.getElementInfo = function(index){
    return this.content[index].getValue();
};
