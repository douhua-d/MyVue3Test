/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
// var hasCycle = function(head) {
//   if (head == null || head.next == null) {
//     return false;
//   }
//   let slow = head;
//   let fast = head;
//   while (fast !== null) {
//     if (!fast.next?.next) return false;
//     slow = slow.next;
//     fast = fast.next.next;
//     if (fast === slow) {
//       return true;
//     }
//   }
//   return false;
// };

// 判断是否是环形链表  todo 记忆和使用这个
function hasCycle(head) {
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
}