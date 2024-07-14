// 144. 二叉树的前序遍历  简单

let preorderTraversal = (root) => {
  let res = [];

  // todo 注意递归的逻辑
  let preorder = (root) => {
    if (!root) {
      return;
    }
    res.push(root.val);
    preorder(root.left);
    preorder((root.right));
  };

  preorder(root);
  return res;
};