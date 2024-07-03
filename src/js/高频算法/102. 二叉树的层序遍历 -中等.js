// 102. 二叉树的层序遍历


// 正解
var levelOrder = function(root) {
  // 一定要注意边界情况，先判断空数组
  if (!root) return []; // 如果根节点为空，返回空数组

  const result = []; // 用于存储结果的数组
  const queue = [root]; // 初始化队列，起始节点是根节点

  while (queue.length > 0) {
    const levelSize = queue.length; // 当前层的节点数量
    const currentLevel = []; // 用于存储当前层的节点值

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift(); // 从队列中取出一个节点，原数组中的数据被删除了
      currentLevel.push(node.val); // 将该节点的值加入当前层结果数组

      if (node.left) queue.push(node.left); // 如果左子节点存在，加入队列
      if (node.right) queue.push(node.right); // 如果右子节点存在，加入队列
    }

    result.push(currentLevel); // 将当前层的结果加入最终结果数组
  }

  return result; // 返回最终的层序遍历结果
};


// 自己手写的错误❎
function levelOrder(root) {
  let res = [];
  let queue = [root];
  while (queue.length) {
    let levelSize = queue.length;
    let currRes = [];
    for (let i = 0; i < levelSize; i++) {
      let cur = queue[i];
      currRes.push(cur);
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
  }
  return res;
}


