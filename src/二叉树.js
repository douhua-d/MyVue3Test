//二叉树深度优先遍历
//http://www.conardli.top/docs/dataStructure/%E4%BA%8C%E5%8F%89%E6%A0%91/%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E4%B8%AD%E5%BA%8F%E9%81%8D%E5%8E%86.html#%E9%A2%98%E7%9B%AE
//根中序遍历 递归实现
const inorderTraversal = (root, array = []) => {
  if (root) {
    inorderTraversal(root.left, array);
    array.push(root.val);
    inorderTraversal(root.right, array);
  }
  return array;
};

//根中序遍历 非递归实现
//https://www.bilibili.com/video/BV1Zf4y1a77g/?spm_id_from=autoNext
const inorderTraversal2 = (root) => {
  const result = [];
  const stack = [];
  let current = root;
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }
  return result;

};


//前序遍历
// 非递归 迭代遍历--https://www.bilibili.com/video/BV15f4y1W7i2?from=search&seid=2315361592332077144&spm_id_from=333.337.0.0
const preorderTraversal = (root, array = []) => {
  if (root) {
    array.push(root.val);
    preorderTraversal(root.left, array);
    preorderTraversal(root.right, array);
  }
  return array;
};



