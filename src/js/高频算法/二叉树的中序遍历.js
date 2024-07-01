// 二叉树的中序遍历

// 力扣通过的
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

