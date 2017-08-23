function RcButton(x, y, width, height, text, parent , classs, onClick) {
    this.btn = createButton(text);
    this.btn.parent(parent);
    this.btn.addClass(classs);
    this.btn.style('left', x + 'px');
    this.btn.style('top', y + 'px');

    if(width >= 0)
        this.btn.style('width', width + 'px');
    if(height >= 0)
        this.btn.style('height', height + 'px');

    this.btn.mousePressed(onClick);
}


