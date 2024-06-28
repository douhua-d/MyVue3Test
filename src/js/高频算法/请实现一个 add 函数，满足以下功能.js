/**
 * add(1); 			// 1
 * add(1)(2);  	// 3
 * add(1)(2)(3)；// 6
 * add(1)(2, 3); // 6
 * add(1, 2)(3); // 6
 * add(1, 2, 3); // 6
 */

function add(...args) {
  let argArr = args;

  function innerAdd(...args2) {
    argArr = [...argArr, ...args2];
    return innerAdd;
  }

  innerAdd.toString = () => {
    return argArr.reduce((total, cur) => total + cur);
  };

  return innerAdd;
}

console.log(add(1).toString());
console.log(add(1)(2)(3).toString());