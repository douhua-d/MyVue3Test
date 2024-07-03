// 用js构建一个链表

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // 添加节点到链表末尾
  append(value) {
    const newNode = new ListNode(value);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  // 删除指定值的节点
  remove(value) {
    if (this.head === null) {
      return;
    }

    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next !== null && current.next.value !== value) {
      current = current.next;
    }

    if (current.next !== null) {
      current.next = current.next.next;
    }
  }

  // 遍历链表
  print() {
    let current = this.head;
    while (current !== null) {
      console.log(current.value);
      current = current.next;
    }
  }
}


const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
list.print(); // 输出: 1 2 3

list.remove(2);
list.print(); // 输出: 1 3

list.append(4);
list.print(); // 输出: 1 3 4
