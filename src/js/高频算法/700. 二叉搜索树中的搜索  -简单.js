// 700. 二叉搜索树中的搜索   简单

// 给定二叉搜索树（BST）的根节点 root 和一个整数值 val。
// 
// 你需要在 BST 中找到节点值等于 val 的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 null 。

/**
 * 方法一：递归
 * 二叉搜索树满足如下性质：
 *
 * 左子树所有节点的元素值均小于根的元素值；
 * 右子树所有节点的元素值均大于根的元素值。
 * 据此可以得到如下算法：
 *
 * 若 root 为空则返回空节点；
 * 若 val=root.val，则返回 root；
 * 若 val<root.val，递归左子树；
 * 若 val>root.val，递归右子树。
 *
 */

/**
 * 二叉树的节点定义
 * @param {number} val - 节点的值
 * @param {TreeNode} left - 左子树
 * @param {TreeNode} right - 右子树
 */
function TreeNode (val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

/**
 * 在二叉搜索树中搜索节点
 * @param {TreeNode} root - 二叉搜索树的根节点
 * @param {number} val - 需要搜索的值
 * @return {TreeNode} - 找到的节点或 null
 */
function searchBST (root, val) {
    // 如果当前节点为空或当前节点的值等于搜索值，返回当前节点
    if (root === null || root.val === val) {
        return root;
    }

    // 如果搜索值小于当前节点的值，递归搜索左子树
    if (val < root.val) {
        return searchBST(root.left, val);
    } else {
        // 如果搜索值大于当前节点的值，递归搜索右子树
        return searchBST(root.right, val);
    }
}

// 测试示例
const tree = new TreeNode(4, new TreeNode(2, new TreeNode(1), new TreeNode(3)), new TreeNode(7));

console.log(searchBST(tree, 2)); // 输出: TreeNode { val: 2, left: TreeNode { val: 1, left: null, right: null }, right: TreeNode { val: 3, left: null, right: null } }
console.log(searchBST(tree, 5)); // 输出: null


/**
 * 迭代方法
 */

function searchBST (root, val) {
    // 当节点不为空时进行搜索
    while (root !== null && root.val !== val) {
        // 如果搜索值小于当前节点的值，移动到左子树
        if (val < root.val) {
            root = root.left;
        } else {
            // 如果搜索值大于当前节点的值，移动到右子树
            root = root.right;
        }
    }

    // 返回找到的节点，或者为 null
    return root;
}
