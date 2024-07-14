// 226. 翻转二叉树  简单

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

/**
 * 翻转二叉树的函数
 * @param {TreeNode} root - 二叉树的根节点
 * @return {TreeNode} - 翻转后的二叉树根节点
 */
function invertTree(root) {
  // 如果节点为空，直接返回
  if (root === null) {
    return null;
  }

  // 交换当前节点的左子树和右子树
  let temp = root.left;
  root.left = root.right;
  root.right = temp;

  // 递归翻转左子树
  invertTree(root.left);
  // 递归翻转右子树
  invertTree(root.right);

  // 返回翻转后的树的根节点
  return root;
}

// 示例使用
// 构建一个简单的二叉树
let root = new TreeNode(4);
root.left = new TreeNode(2);
root.right = new TreeNode(7);
root.left.left = new TreeNode(1);
root.left.right = new TreeNode(3);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(9);

console.log("翻转前:", JSON.stringify(root));
root = invertTree(root);
console.log("翻转后:", JSON.stringify(root));
