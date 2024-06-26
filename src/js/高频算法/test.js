// 版本号排序
const versionSort = (arr) => {
  arr.sort((a, b) => {
    const arr1 = a.split(".");
    const arr2 = b.split(".");
    let i = 0;
    while (true) {
      const s1 = arr1[i];
      const s2 = arr2[i];
      i++;
      if (s1 === undefined || s2 === undefined) {
        return arr2.length - arr1.length;
      }
      if (s1 === s2) continue;
      return s2 - s1;
    }
  });
};

// const arr = ["0.1.1", "2.3.3", "0.302.1", "4.2", "4.3.5", "4.3.5.5"];
// versionSort(arr);
// console.log(arr);

// 插入排序 O(N2)
function insertSort(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    let j = i - 1;
    let curr = arr[i];
    while (j >= 0 && arr[j] > curr) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = curr;
  }
  return arr;
}

//  跳跃游戏
function jumps(nums) {
  let jumps = 0;
  let maxReach = 0;
  let end = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    maxReach = Math.max(maxReach, i + nums[i]);
    if (i === end) {
      jumps++;
      end = maxReach;
    }
  }

  return jumps;
}

// 两两交换链表节点
function swapParis(head) {
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

}

// 手写深度比较isEqual
function isEqual(obj1, obj2) {
  const isObject = (data) => data !== null && typeof data === "object";

  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2;
  }

  if (obj1 === obj2) return true;

  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  for (let key in obj1) {
    if (!isEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

// 对象扁平化
function objectFlat(obj) {
  let res = {};

  function flat(obj, preKey = "") {
    Object.entries(obj).forEach(([key, val]) => {
      let newKey = preKey ? `${preKey}.${key}` : key;
      if (val && typeof val === "object") {
        flat(val, newKey);
      } else {
        res[newKey] = val;
      }
    });
  }

  flat(obj);
  return res;
}

// 反转链表
function reverseLinkedList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}

// 判断是否是环形链表
function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;

    if (fast === slow) {
      return true;
    }
  }
  return false;
}