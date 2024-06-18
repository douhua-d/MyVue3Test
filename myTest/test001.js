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