/*function ListNode(x){
    this.val = x;
    this.next = nul;
}*/

// 从尾到头打印链表
function printListFromTailToHead(head) {
  const array = [];
  while (head) {
    array.unshift(head.val);
    head = head.next;
  }
  return array;
}

//反转链表
let reverseList = function(head) {
  let currentNode = null;
  let headNode = head;
  while (head && head.next) {
    currentNode = head.next;
    head.next = currentNode.next;
    currentNode.next = headNode;
    headNode = currentNode;
  }
  return headNode;
};
