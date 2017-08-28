function ExpThumbnail(width, height, parentHeight, path, parent, number, onClick) {
    this.div = createDiv('');
    this.div.parent(parent);
    this.div.attribute('id', 'expImgDiv' + number);
    this.div.addClass('expImgDiv');
    this.div.style('width', width + 'px');
    this.div.style('height', height + 'px');
    this.div.style('margin', parentHeight*0.01 + 'px' + ' 0px');
    this.imageButton = new ImageButton(0, 0, 70, 70, path, 'expImgDiv'+number, 'expImg', 'expImg' + number, onClick)
}