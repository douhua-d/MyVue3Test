// Object.freeze冻结一个对象，让其不能再添加/删除属性，也不能修改该对象已有属性的可枚举性、可配置可写性，
// 也不能修改已有属性的值和它的原型属性，最后返回一个和传入参数相同的对象


/**
 * Object.seal() 静态方法密封一个对象。密封一个对象会阻止其扩展并且使得现有属性不可配置。
 * 密封对象有一组固定的属性：不能添加新属性、不能删除现有属性或更改其可枚举性和可配置性、不能重新分配其原型。
 * 只要现有属性的值是可写的，它们仍然可以更改。seal() 返回传入的同一对象。
 * */

function myFreeze(obj) {
  // 判断参数是否为Object类型，如果是就封闭对象，循环遍历对象。去掉原型属性，将其writable特性设置为false
  if (obj instanceof Object) {
    Object.seal(obj);  // 封闭对象
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        Object.defineProperty(obj, key, {
          writable: false   // 设置只读
        });
        // 如果属性值依然为对象，要通过递归来进行进一步的冻结
        myFreeze(obj[key]);
      }
    }
  }
}