/**
 * 实现 Object.create
 * @param {Object} proto - 新创建对象的原型
 * @param {Object} [propertiesObject] - 可选的对象，包含要添加到新对象的属性
 * @returns {Object} - 创建的新对象
 */
function create(proto, propertiesObject) {
  if (proto !== Object(proto) && proto !== null) {
    throw new TypeError("Object prototype may only be an Object or null");
  }

  // 创建一个空函数
  function F() {
  }

  // 将函数的原型指向传入的原型对象
  F.prototype = proto;

  // 创建新对象
  const obj = new F();

  // 如果有 propertiesObject 参数，使用 Object.defineProperties 添加属性
  if (propertiesObject !== undefined) {
    Object.defineProperties(obj, propertiesObject);
  }

  // 返回新对象
  return obj;
}

// 示例使用
const person = {
  isHuman: false,
  printIntroduction: function() {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};

const me = create(person);
me.name = "Matthew"; // "me" 对象的 name 属性
me.isHuman = true; // "me" 对象的 isHuman 属性

me.printIntroduction(); // 输出: My name is Matthew. Am I human? true
