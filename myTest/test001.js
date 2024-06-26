function currying(fn, ...args) {
  if (args.length > fn.length) {
    return fn(...args);
  }
  return (...args2) => currying(fn, ...args, ...args2);
}


// 广度优先遍历
function levelOrderTraversal(root) {
  if (!root) return [];

  const res = [];
  const queue = [root];

  while (queue.length) {
    const levelSize = queue.length;
    const currentLevel = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(currentLevel);
  }

  return res;
}


function defineReactive(data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function defineGet() {
      console.log(`get key: ${key} value: ${value}`)
      return value
    },
    set: function defineSet(newVal) {
      console.log(`set key: ${key} value: ${newVal}`)
      value = newVal
    }
  })
}

function observe(data) {
  Object.keys(data).forEach(function(key) {
    defineReactive(data, key, data[key])
  })
}

let arr = [1, 2, 3]
observe(arr)

arr[0] =10;
arr.push(1000);
