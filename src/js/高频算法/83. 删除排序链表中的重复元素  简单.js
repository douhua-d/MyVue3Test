/**
 * 83. 删除排序链表中的重复元素
 * 
 * 简单
 * 
 * 给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回 已排序的链表 。
 *
 */

var deleteDuplicates = function(head) {
  // 设定 cur 指针，初始位置为链表第一个结点
  let cur = head;
  // 遍历链表
  while (cur != null && cur.next != null) {
    // 若当前结点和它后面一个结点值相等（重复）
    if (cur.val === cur.next.val) {
      // 删除靠后的那个结点（去重）
      cur.next = cur.next.next;
    } else {
      // 若不重复，继续遍历
      cur = cur.next;
    }
  }
  return head;
};