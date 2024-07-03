/**
 * 二叉树的层序遍历
 * 层序遍历是逐层从左到右访问二叉树的每个节点。我们可以使用广度优先搜索（BFS）来实现这一点，通常使用队列来辅助实现。
 *
 * 以下是用JavaScript实现二叉树的层序遍历的代码，并附有详细注解：
 */

// 二叉树的层序遍历、层次遍历、广度优先遍历

// 定义二叉树节点的结构
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// 示例二叉树的构造
const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

// 层序遍历函数
function levelOrderTraversal(root) {
  if (!root) return []; // 如果根节点为空，返回空数组  todo 一定要记得判断临界值

  const result = []; // 用于存储结果的数组
  const queue = [root]; // 初始化队列，起始节点是根节点

  while (queue.length > 0) {
    const levelSize = queue.length; // 当前层的节点数量
    const currentLevel = []; // 用于存储当前层的节点值

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift(); // 从队列中取出一个节点
      currentLevel.push(node.val); // 将该节点的值加入当前层结果数组

      if (node.left) queue.push(node.left); // 如果左子节点存在，加入队列
      if (node.right) queue.push(node.right); // 如果右子节点存在，加入队列
    }

    result.push(currentLevel); // 将当前层的结果加入最终结果数组
  }

  return result; // 返回最终的层序遍历结果
}

// 调用层序遍历函数，并打印结果
const result = levelOrderTraversal(root);
console.log(result); // 输出: [[3], [9, 20], [15, 7]]
