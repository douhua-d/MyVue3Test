const reverseList = (head) => {
  let pre = null;
  let curr = head;
  while (curr !== null) {
    let next = curr.next;
    curr.next = pre;
    pre = curr;
    curr = next;
  }
  return pre;
};