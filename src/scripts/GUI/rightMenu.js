function RightMenu(width, height, id, classs, parent, title, okBool) {
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

    this.title = createDiv("<p class='menuTitle'>" + title + "</p>");
    this.title.parent(id);
    this.title.addClass('menuTitleDiv');

    this.contentDiv = createDiv('');
    this.contentDivId = id + "Content";
    this.contentDiv.attribute('id', this.contentDivId);
    this.contentDiv.parent(id);

    this.content = [];

    if (okBool) {
        this.okButton = new ImageButton(100, 0, 80, 50, "./assets/accept_button.jpg", this.id,
            'rightMenuOkButton', 'rightMenuOkButtonId', function(){
                    toggleMenu('rightMenuOkButtonId', 'varRightMenu');
                    this.rightMenuOk(this.content)
                    }.bind(this));
        this.okButton.btn.style('margin', '0px 0px 0px 75px');
    }
}

RightMenu.prototype.rightMenuOk = function(content) {
    const variables = {
        rampHeightLeft: content[8].getValue(),
        middlePathLength: content[7].getValue(),
        friction: content[3].getValue(),
        rampHeightRight: content[9].getValue(),
        radius: content[6].getValue(),
        rampColor: '#795548',
        gravity: content[1].getValue(),
        springConst: content[4].getValue(),
        velocity: content[2].getValue(),
        springLength: content[5].getValue(),
        mass: content[0].getValue(),
    };
    changeExc(variables);
};

RightMenu.prototype.addContent = function(element){
    this.content.push(element);
};

RightMenu.prototype.getElementInfo = function(index){
    return this.content[index].getValue();
};
