// 实现从大到小的冒泡排序
// [5,6,3,2]

// todo 说我实现的不对，这是个选择排序 ??？ 这就是冒泡排序啊 ，面试官记错了吧
function sort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.lengh - 1; j++) {
      if (arr[i] < arr[j]) {
        let temp = arr[j];
        arr[j] = arr[i];
        arr[i] =temp;
      }
    }
  }
  return arr;
}

// todo  昨天和今天刚看的二叉树的遍历  就被问到了 ， 这样写的就好顺，体现编码能力

// 构造二叉树
// 二叉树的深度优先遍历、层次遍历
// object.freeze object.seal 区别


//  如何冻结一个元素

//  vue中指令的原理 ， 你用到哪些生命周期


//  三轮技术面  + 大老板沟通 + hr谈薪资


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
