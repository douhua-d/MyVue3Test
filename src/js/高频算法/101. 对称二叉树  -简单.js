// 101. 对称二叉树  简单

/**
 * 定义二叉树节点
 * @param {number} val - 节点的值
 * @param {TreeNode} left - 左子节点
 * @param {TreeNode} right - 右子节点
 */
function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

//
// 要检查一个二叉树是否是轴对称的，
// 可以使用递归的方法。具体来说，
// 可以通过比较树的左子树和右子树是否是镜像对称的来判断。

/**
 * 检查二叉树是否是对称的
 * @param {TreeNode} root - 二叉树的根节点
 * @return {boolean} - 是否对称
 */
function isSymmetric(root) {
  // 空树是对称的
  if (!root) return true;

  // 辅助函数，用于比较两棵树是否镜像对称
  function isMirror(left, right) {
    // 如果两棵树都为空，则对称
    if (!left && !right) return true;
    // 如果其中一棵树为空，则不对称
    if (!left || !right) return false;
    // 当前节点值相等，且左右子树镜像对称
    return (left.val === right.val) && isMirror(left.left, right.right) && isMirror(left.right, right.left);
  }

  // 比较左子树和右子树是否镜像对称
  return isMirror(root.left, root.right);
}

// 示例使用
let root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(2);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(4);
root.right.left = new TreeNode(4);
root.right.right = new TreeNode(3);

console.log(isSymmetric(root)); // 输出: true
