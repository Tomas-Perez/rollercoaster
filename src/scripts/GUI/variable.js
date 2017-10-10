function Variable(name, unit, parentWidth, parentHeight, parent, number, value){
    this.div = createDiv('');
    this.div.attribute('id', 'variableDiv' + number);
    this.div.addClass('variableDiv');
    this.div.parent(parent);
    this.number = number;
    this.name = createP(name);
    this.name.addClass('variableName');
    this.name.parent('variableDiv' + number);
    this.textBox = createInput(0,"number");
    this.textBox.parent('variableDiv' + number);
    this.textBox.addClass('variableTxtBox');
    this.textBox.attribute('id', 'varTxt' + number);
    this.textBox.value(value);
    this.unit = createP(unit);
    this.unit.parent('variableDiv' + number);
    this.unit.addClass('variableUnit');

    this.textBox.style('width',parentWidth*0.4 + 'px');
    this.name.style('width', parentWidth*0.23 + 'px');
    this.name.style('margin', '0px 0px 0px ' + parentWidth*0.15 + 'px');
    this.unit.style('margin', '0px 0px 0px ' + parentWidth*0.05 + 'px');
    this.div.style('margin', parentHeight*0.01 + 'px' + ' 0px');
}

Variable.prototype.getValue = function () {
    return this.textBox.value();
};