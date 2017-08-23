function ImageButton(x, y, width, height, path, parent, classs, id, onClick) {
    this.btn = createInput(0,"image");
    this.btn.attribute('id', id);
    this.btn.attribute('src', path);
    this.btn.style('left', x + 'px');
    this.btn.style('top', y + 'px');
    this.btn.style('width', width + 'px');
    this.btn.style('height', height + 'px');
    this.btn.parent(parent);
    this.btn.addClass(classs);
    this.btn.mousePressed(onClick);
    //this.btn.mousedown(onClick);
}
