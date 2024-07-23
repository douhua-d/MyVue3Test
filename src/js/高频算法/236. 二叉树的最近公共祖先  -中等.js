// 236. 二叉树的最近公共祖先  -中等

// 定义二叉树节点
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

// 主函数，寻找最近公共祖先
function lowestCommonAncestor(root, p, q) {
  // 如果当前节点为空，返回 null
  if (root === null) {
    return null;
  }

  // 如果当前节点是 p 或 q，返回当前节点
  if (root === p || root === q) {
    return root;
  }

  // 在左子树中递归寻找 p 和 q 的最近公共祖先
  let left = lowestCommonAncestor(root.left, p, q);

  // 在右子树中递归寻找 p 和 q 的最近公共祖先
  let right = lowestCommonAncestor(root.right, p, q);

  // 如果左右子树都找到了 p 或 q，说明当前节点是最近公共祖先
  if (left !== null && right !== null) {
    return root;
  }

  // 如果只有一个子树找到了 p 或 q，返回那个子树中的节点
  return left !== null ? left : right;
}

// 示例用法
let root = new TreeNode(3);
root.left = new TreeNode(5);
root.right = new TreeNode(1);
root.left.left = new TreeNode(6);
root.left.right = new TreeNode(2);
root.right.left = new TreeNode(0);
root.right.right = new TreeNode(8);
root.left.right.left = new TreeNode(7);
root.left.right.right = new TreeNode(4);

let p = root.left; // 节点 5
let q = root.right; // 节点 1

console.log(lowestCommonAncestor(root, p, q).val); // 输出：3




// 我们可以通过记录从根节点到目标节点的路径来找到最近公共祖先。具体来说，找到从根节点到节点 p 和节点 q 的路径，然后比较这两条路径，找到它们的第一个公共节点。
// 
// 具体步骤：
// 使用深度优先搜索（DFS）找到从根节点到节点 p 的路径。
// 使用深度优先搜索（DFS）找到从根节点到节点 q 的路径。
// 比较这两条路径，找到它们的第一个公共节点。

function lowestCommonAncestor(root, p, q) {
  // 找到从根节点到 p 和 q 的路径
  let pathP = [];
  let pathQ = [];

  // 辅助函数，寻找从根节点到目标节点的路径
  function findPath(root, target, path) {
    if (root === null) {
      return false;
    }

    path.push(root);

    // 如果当前节点是目标节点，返回 true
    if (root === target) {
      return true;
    }

    // 递归寻找左子树和右子树
    if (findPath(root.left, target, path) || findPath(root.right, target, path)) {
      return true;
    }

    // 如果当前节点不是目标节点且左右子树中也没有目标节点，则移除当前节点
    path.pop();
    return false;
  }

  // 找到从根节点到 p 和 q 的路径
  findPath(root, p, pathP);
  findPath(root, q, pathQ);

  // 比较两条路径，找到第一个公共节点
  let i = 0;
  while (i < pathP.length && i < pathQ.length) {
    if (pathP[i] !== pathQ[i]) {
      break;
    }
    i++;
  }

  // 返回第一个公共节点
  return pathP[i - 1];
}


