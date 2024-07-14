// 160. 相交链表  简单

let getIntersectionNode = (headA, headB) => {
  const visited = new Set();
  let temp = headA;
  while (temp !== null) {
    visited.add(temp);
    temp = temp.next;
  }
  temp = headB;
  while (temp !== null) {
    if (visited.has(temp)) {
      return temp;
    }
    temp = temp.next;
  }
  return null;
};