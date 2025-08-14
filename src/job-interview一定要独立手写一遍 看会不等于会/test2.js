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


// 爬楼梯
let climbStairs = (n) => {
  if (n <= 2) {
    return n;
  }

  let dp = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;
  // todo  注意从 3 开始 到小于等于n
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
};


//  合并两个有序链表
function merge(l1, l2) {
  let dummy = new ListNode();
  let cur = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      // todo  注意是 等于l2 不是l2.val
      cur.next = l1;
      l1 = l1.next;
    } else {
      // todo  注意是 等于l2 不是l2.val
      cur.next = l2;
      l2 = l2.next;
    }
    cur = cur.next;
  }
  cur.next = l1 !== null ? l1 : l2;
  return dummy.next;
}

// 面试题 02.02. 返回链表倒数第 k 个节点  简单

let findKthToLast = (head, k) => {
  let fast = head;
  let slow = head;
  for (let i = 0; i < k; i++) {
    if (fast === null) return null;
    fast = fast.next;
  }

  while (fast !== null) {
    fast = fast.next;
    slow = slow.next;
  }
  return slow.val;
};

// 移动零
let moveZeros = (arr) => {
  let noZeroIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      arr[noZeroIndex] = arr[i];
      noZeroIndex++;
    }
  }

  for (let i = noZeroIndex; i < arr.length; i++) {
    arr[i] = 0;
  }
  return arr;
};

// 比较版本号
let compareVersion = (version1, version2) => {
  let v1parts = version1.split(".");
  let v2parts = version2.split(".");
  let maxLength = Math.max(v1parts.length, v2parts.length);
  for (let i = 0; i < maxLength; i++) {
    // todo 注意是从 v1parts[i]取值，不是version1[i]
    let num1 = i < v1parts.length ? Number(v1parts[i]) : 0;
    let num2 = i < v2parts.length ? Number(v2parts[i]) : 0;

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }

  return 0;
};

console.log(Number("10"), parseInt("10"));

// 翻转二叉树
let invertTree = (root) => {
  if (root === null) {
    return null;
  }
  let temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertTree(root.left);
  invertTree(root.right);
  return root;
};