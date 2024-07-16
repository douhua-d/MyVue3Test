// 剑指 offer 09 用两个栈实现一个队列

/**
 * 用两个栈来实现一个队列，这个问题可以通过栈的后进先出的特性来实现队列的先进先出特性。具体的方法是使用两个栈，一个用于入队操作，另一个用于出队操作。
 * 当出队栈为空时，将入队栈中的所有元素弹出并压入出队栈。
 *
 *
 * 出队操作 deleteHead：
 *
 * 检查 stack2 是否为空。如果为空，则将 stack1 中的所有元素依次弹出并压入 stack2。这一步将 stack1 中的元素反转，以便 stack2 的栈顶元素是最早入队的元素。
 * 如果 stack2 仍为空，说明队列中没有元素，返回 -1。
 * 否则，弹出 stack2 的栈顶元素并返回，该元素就是队列的头部元素。
 * 原理解释
 * 栈的特性：栈是后进先出的（LIFO）数据结构，而队列是先进先出的（FIFO）数据结构。
 * 两个栈的配合：通过使用两个栈，我们可以实现队列的先进先出特性：
 * stack1 用于存储入队元素。
 * 当 stack2 为空时，将 stack1 中的元素逐个弹出并压入 stack2，这样最早进入 stack1 的元素就成为 stack2 的栈顶元素，可以先弹出。
 * 时间复杂度：
 * 入队操作 appendTail 的时间复杂度是 O(1)。
 * 出队操作 deleteHead 的摊还时间复杂度是 O(1)，因为每个元素至多被移动两次（一次从 stack1 到 stack2，一次从 stack2 弹出）。
 */

class CQueue {
  constructor() {
    this.stack1 = []; // 入队栈
    this.stack2 = []; // 出队栈
  }

  // 入队操作，将元素 val 添加到队列的末尾
  appendTail(val) {
    this.stack1.push(val);
  }

  // 出队操作，从队列的头部移除元素并返回该元素
  deleteHead() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }

    return this.stack2.length > 0 ? this.stack2.pop() : -1;
  }
}

// 示例使用
let queue = new CQueue();
queue.appendTail(3);
console.log(queue.deleteHead()); // 输出: 3
console.log(queue.deleteHead()); // 输出: -1
queue.appendTail(5);
queue.appendTail(2);
console.log(queue.deleteHead()); // 输出: 5
console.log(queue.deleteHead()); // 输出: 2




