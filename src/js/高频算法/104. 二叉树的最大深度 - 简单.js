// 104. 二叉树的最大深度  简单

/**
 * 求二叉树的最大深度，可以通过递归的方法来实现。
 * 
 * 二叉树的最大深度是从根节点到最远叶子节点的最长路径上的节点数。
 * 
 * 因此，对于每个节点，我们可以分别计算其左子树和右子树的深度，然后取较大值加1即可。
 * 
 *        3
 *       / \
 *      9  20
 *        /  \
 *       15   7
 * 
 */

// 定义二叉树节点
function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

// 递归方法求最大深度
function maxDepth(root) {
  if (root === null) {
    return 0;
  } else {
    let leftDepth = maxDepth(root.left);
    let rightDepth = maxDepth(root.right);
    return Math.max(leftDepth, rightDepth) + 1;
  }
}

// 示例
let root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

console.log(maxDepth(root)); // 输出: 3

