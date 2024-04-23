// https://juejin.cn/post/7347154070539518002

const bfs = (node) => {
  // 创建一个队列，并将根节点放入队列中，队列遵循先进先出（FIFO）原则
  const queue = [root];
  const res = [root.value];
  while (queue.length) {
    const currentNode = queue.shift();
    console.log(currentNode.value);
    res.push(currentNode.value);

    if (currentNode.children) {
      currentNode.children.forEach(child => {
        queue.push(child);
      });
    }
  }
};

// 列表转树状结构
function listToTree(data) {
  const obj = {};
  const res = [];
  data.forEach(item => {
    obj[item.id] = item;
  });
  data.forEach(item => {
    const parent = obj[item.parentId];
    if (parent) {
      parent.children = parent.children || [];
      parent.push(item);
    } else {
      res.push(item);
    }
  });
  return res;
}

// 递归解决
function recursiveToTree(data) {
  function loop(key) {
    const arr = [];
    data.forEach(item => {
      if (item.parentId === key) {
        item.children = loop(item.id);
        arr.push(item);
      }
    });
    return arr;
  }

  return loop(0);
}