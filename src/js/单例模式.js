let Singleton = function(name) {
  this.name = name;
};

Singleton.prototype.getName = function() {
  alert(this.name);
};

Singleton.getInstance = (function(name) {
  var instance;
  return function(name){
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  }
})();

let a = Singleton.getInstance('ConardLi');
let b = Singleton.getInstance('ConardLi2');

console.log(a===b);   //true