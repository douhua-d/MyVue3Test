// 面试题 02.02. 返回链表倒数第 k 个节点  简单

// https://leetcode.cn/problems/kth-node-from-end-of-list-lcci/solutions/1213386/mian-shi-ti-0202-fan-hui-dao-shu-di-k-ge-ozn3/

// 初始化双指针 pre , cur 都指向头节点 head ；
// 先令 cur 走 k 步，此时 pre , cur 的距离为 k ；
// 令 pre , cur 一起走，直到 cur 走过尾节点时跳出，此时 pre 指向「倒数第 k 个节点」，返回之即可；
// 
//

function ListNode(val) {
  this.val = val;
  this.next = null;
}

function findKthToLast(head, k) {
  let fast = head;
  let slow = head;

  // 移动 fast 指针 k 步
  for (let i = 0; i < k; i++) {
    if (fast === null) return null; // 如果 k 超过链表长度，返回 null
    fast = fast.next;
  }

  // 同时移动 fast 和 slow 指针
  while (fast !== null) {
    fast = fast.next;
    slow = slow.next;
  }

  return slow.val; // slow 指针指向倒数第 k 个节点
}

// 示例
let head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

console.log(findKthToLast(head, 2)); // 输出: 4


// 最直接的解法是「统计链表长度」，分为两步： 
//  但是需要先记录一个长度
// 
// 遍历链表并统计链表长度，记链表长度为 N ；
// 设置一个节点指针向前走 N−k 步，便可找到链表倒数第 k 个节点；
// 
// 