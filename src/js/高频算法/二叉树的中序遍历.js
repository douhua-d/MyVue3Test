// 二叉树的中序遍历

// 力扣通过的  递归的方法
var inorderTraversal = function(root) {
  let res = [];
  const inorder = (root) => {
    if (!root) {
      return;
    }
    inorder(root.left);
    res.push(root.val);
    inorder(root.right);
  };
  inorder(root);
  return res;
};


//  非递归的方法  采用迭代
let inorderTraversal = function(root) {
  let res = [];
  let stack = [];
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    const node = stack.pop();
    res.push(node.val);
    root = node.right;
  }

  return res;
};

