class ListNode {
  constructor(val, left, right) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function inOrderTraversal(root) {
  let res = [];
  const inOrder = (root) => {
    if (!root) return;
    inOrder(root.left);
    res.push(root.val);
    inOrder(root.right);
  };
  inOrder(root);
  return res;
}