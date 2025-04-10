//前序遍历 递归法
function preOrder(root, array = []) {
  if (root) {
    array.push(root.val);
    preOrder(root.left, array);
    preOrder(root.right, array);
  }
  return array;
}

//前序遍历 非递归的迭代法
function preOrderTraversalIteration(root) {
  const result = [];
  const stack = [];
  let current = root;
  while (current || stack.length > 0) {
    while (current) {
      result.push(current.val);
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    current = current.right;
  }
  return result;
}

//中序遍历 递归法
function inOrder(root, array = []) {
  if (root) {
    inOrder(root.left, array);
    array.push(root.val);
    inOrder(root.right, array);
  }
  return array;
}

// 中序遍历 迭代法
function inOrderTraversal(root) {
  const result = [];
  const stack = [];
  let current = root;
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }
  return result;
}

//后序遍历 递归法
function postOrder(root, array = []) {
  if (root) {
    postOrder(root.left, array);
    postOrder(root.right, array);
    array.push(root.val);
  }
  return array;
}

// 后序遍历 迭代法实现
function postOrderTraversalIteration(root) {
  const result = [];
  const stack = [];
  let last = null; // 标记上一个访问的节点
  let current = root;
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack[stack.length - 1];
    if (!current.right || current.right == last) {
      current = stack.pop();
      result.push(current.val);
      last = current;
      current = null; // 继续弹栈
    } else {
      current = current.right;
    }
  }
  return result;
}


//广度优先遍历   二叉树层序遍历  借助队列数据结构来解决问题
function levelOrder(root) {
  const ret = [];
  if (!root) {
    return ret;
  }
  const q = [];
  q.push(root);
  while (q.length > 0) {
    let currentLevelSize = q.length;
    ret.push([]);
    for (let i = 0; i < currentLevelSize; i++) {
      let node = q.shift();
      ret[ret.length - 1].push(node.val);
      if (node.left) {
        q.push(node.left);
      }
      if (node.right) {
        q.push(node.right);
      }
    }
  }

  return ret;
}
