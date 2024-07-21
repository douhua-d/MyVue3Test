// 100. 相同的树   -简单

// 给你两棵二叉树的根节点 p 和 q ，编写一个函数来检验这两棵树是否相同。
// 
// 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

/**
 * 二叉树的节点定义
 * @param {number} val - 节点的值
 * @param {TreeNode} left - 左子树
 * @param {TreeNode} right - 右子树
 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

/**
 * 检查两棵二叉树是否相同
 * @param {TreeNode} p - 第一棵二叉树的根节点
 * @param {TreeNode} q - 第二棵二叉树的根节点
 * @return {boolean} - 如果两棵树相同则返回 true，否则返回 false
 */
function isSameTree(p, q) {
    // 如果两个节点都是空的，返回 true
    if (p === null && q === null) return true;

    // 如果一个节点是空的，另一个不是空的，返回 false
    if (p === null || q === null) return false;

    // 如果两个节点的值不相同，返回 false
    if (p.val !== q.val) return false;

    // 递归比较左子树和右子树
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// 测试示例
const tree1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
const tree2 = new TreeNode(1, new TreeNode(2), new TreeNode(3));

console.log(isSameTree(tree1, tree2)); // 输出: true
