// 这是最推荐的一种方式，接近完美的继承。

function Parent(name) {
  this.name = name;
  this.play = [1, 3, 5];
}

function Child() {
  Parent.call(this);
  this.type = "child";
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;