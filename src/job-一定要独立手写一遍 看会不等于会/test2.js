// ["q","adv","q"]

function count(arr) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];
    if (obj[val]) {
      obj[val] = obj[val] + 1;
    } else {
      obj[val] = 1;
    }
  }
  return obj;
}

console.log(count(["q", "adv", "q"]));

function throttle(fn, time) {
  let pre = 0;
  return function(...args) {
    if (Date.now() - pre > time) {
      fn(args);
      pre = Date.now();
    }
  };
}

// 实现一个 isEqual 判断是否相等的函数  数据类型不确定

function isEqual(data1, data2) {
  const isObject = val => val !== null && typeof val === "object";

  if (!isObject(data1) || !isObject(data2)) {
    return Object.is(data1, data2);
  }

  if (data1 === data2) {
    return true;
  }

  let kes1 = Object.keys(data1);
  let kes2 = Object.keys(data2);
  if (kes1.length !== kes2.length) {
    return false;
  }

  for (let key of kes1) {
    if (!isEqual(data1[key], data2[key])) {
      return false;
    }
  }
  return true;
}

// 实现一个基础版的对象深拷贝

// 搜索插入位置
let searchInsert = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
};

// 链表两两交换

let swapPairs = (head) => {
  let dummy = new ListNode();
  dummy.next = head;

  let prev = dummy;
  let first = head;
  while (first && first.next) {
    let second = first.next;
    let nextPair = second.next;

    second.next = first;
    first.next = nextPair;
    prev.next = second;

    prev = first;
    first = nextPair;
  }
  return dummy.next;
};

// 求二叉树的最大深度

let maxDepth = (root) => {
  if (!root) {
    return 0;
  } else {
    let leftDepth = maxDepth(root.left);
    let rightDepth = maxDepth(root.right);
    return Math.max(leftDepth, rightDepth) + 1;
  }
};