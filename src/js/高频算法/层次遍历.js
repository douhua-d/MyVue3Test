/**
 * 实现思路
 * 层次遍历通常使用队列（Queue）来实现。队列是一种先进先出（FIFO）的数据结构，适合逐层处理节点的需求。
 *
 *       A
 *      / \
 *     B   C
 *    / \   \
 *   D   E   F
 */

// 我们可以用JavaScript对象来表示这棵树：
const tree = {
  value: "A",
  children: [
    {
      value: "B",
      children: [
        { value: "D", children: [] },
        { value: "E", children: [] }
      ]
    },
    {
      value: "C",
      children: [
        { value: "F", children: [] }
      ]
    }
  ]
};

function bfs(root) {
  // 创建一个队列，并将根节点加入队列
  const queue = [root];

  while (queue.length > 0) {
    // 从队列头部取出一个节点
    const node = queue.shift();

    // 处理该节点（在这里我们选择打印它的值）
    console.log(node.value);

    // 将该节点的子节点按顺序加入队列的尾部
    for (const child of node.children) {
      queue.push(child);
    }
  }
}

// 调用bfs函数，传入树的根节点
bfs(tree);

