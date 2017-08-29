function ImageButton(x, y, width, height, path, parent, classs, id, onClick, hoverPath, pressedPath) {
    this.path = path;
    this.pressedPath = pressedPath;
    this.hoverPath = hoverPath;
    this.id = id;
    this.onClick = onClick;
    this.btn = createInput(0,"image");
    this.btn.attribute('id', id);
    this.btn.attribute('src', path);
    this.btn.style('left', x + 'px');
    this.btn.style('top', y + 'px');
    this.btn.style('width', width + 'px');
    this.btn.style('height', height + 'px');
    this.btn.parent(parent);
    this.btn.addClass(classs);
    this.btn.mousePressed(this.clicked.bind(this));
    this.btn.mouseReleased(this.changeImage.bind(this,this.hoverPath));
    this.btn.mouseOver(this.changeImage.bind(this,this.hoverPath));
    this.btn.mouseOut(this.changeImage.bind(this,this.path));
}

ImageButton.prototype.changeImage = function (path) {
    this.btn.attribute('src', path);
};

ImageButton.prototype.clicked = function(){
    this.onClick();
    this.changeImage(this.pressedPath)
};


