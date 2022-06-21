// 二叉树的结点
class Node {
  constructor(val) {
    this.val = val;
    this.left = undefined;
    this.right = undefined;
  }
}

// 声明二叉树
class Tree {
  constructor(data) {
    // 临时存储所有结点，方便寻找父子结点
    let nodeList = [];
    let root; // 顶结点
    for (let i = 0, len = data.length; i < len; i++) {
      let node = new Node(data[i]);
      nodeList.push(node);
      if (i > 0) {  // 因为根结点没有父结点 所以从 i > 0;第二层开始才有父节点
        let n = Math.floor(Math.sqrt(i + 1)); // 记录当前结点属于哪一层
        let s = Math.pow(2, n) - 1; // 记录当前层的起始点
        let ps = Math.pow(2, n - 1) - 1; // 记录上一层的起始点
        let parent = nodeList[ps + Math.floor((i - s) / 2)]; //找当前结点的父节点
        if (parent.left) {  // 将当前结点与上一层结点做关联
          parent.right = node;
        } else {
          parent.left = node;
        }
      }
    }
    root = nodeList.shift();
    nodeList.length = 0;
    return root;
  }

  static isSymmetry(root) {
    if (!root) {
      return true;
    }
    let walk = (left, right) => {
      if (!left && !right) {
        return true;
      }
      if ((left && !right) || (!left && right) || (left.val !== right.val)) {
        return false;
      }
      return walk(left.left, right.right) && walk(left.right, right.left);
    };
    return walk(root.left, root.right);
  }
}

export default Tree;
export {
  Node
};