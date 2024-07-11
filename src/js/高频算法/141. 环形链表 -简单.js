//141. 环形链表 简单

let cycle = (head) => {
  // 初始化快慢指针
  let slow = head;
  let fast = head;

  // 遍历链表
  while (fast !== null && fast.next !== null) {
    // 慢指针每次移动一步
    slow = slow.next;

    // 快指针每次移动两步
    fast = fast.next.next;

    // 如果快慢指针相遇，则链表存在环
    if (slow === fast) {
      return true;
    }
  }

  // 如果快指针到达链表末尾，则链表无环
  return false;
};