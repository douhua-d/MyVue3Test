// Object.prototype.toString()可以判断任何数据类型的原理?

/**
 * Object.prototype.toString() 方法可以用来判断任何数据类型，其原理是通过内部的 [[Class]] 属性来返回对象的内部类信息。这是 JavaScript 中的一个特性。
 *
 * 基本原理
 * 在 JavaScript 中，每个对象都继承自 Object 的原型，因此每个对象都有 toString 方法。默认情况下，
 * Object.prototype.toString() 方法返回一个表示对象类型的字符串，这个字符串的格式为 [object Type]，其中 Type 是对象的内部类型。
 */