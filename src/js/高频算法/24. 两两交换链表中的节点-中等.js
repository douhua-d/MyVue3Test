// 定义链表节点
function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

// 主函数  // 两两交换链表节点
function swapPairs(head) {
  // 创建一个虚拟头节点
  const dummy = new ListNode(0);
  dummy.next = head;

  // 定义三个指针，prev是前一个节点，first和second是待交换的两个节点
  let prev = dummy;
  let first = head;

  while (first && first.next) {
    // 交换节点
    const second = first.next;
    const nextPair = second.next;

    // 执行交换
    second.next = first;
    first.next = nextPair;
    prev.next = second;

    // 移动指针到下一对节点
    prev = first;
    first = nextPair;
  }

  // 返回新链表的头节点
  return dummy.next;
}

// 辅助函数：将数组转换为链表
function arrayToList(arr) {
  const dummy = new ListNode(0);
  let current = dummy;
  for (const val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummy.next;
}

// 辅助函数：将链表转换为数组
function listToArray(head) {
  const result = [];
  let current = head;
  while (current) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

// 测试用例
const head = arrayToList([1, 2, 3, 4]);
const newHead = swapPairs(head);
console.log(listToArray(newHead)); // 输出: [2, 1, 4, 3]
