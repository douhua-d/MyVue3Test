// 155. 最小栈  -中等


/**
 * 要实现一个支持 push、pop、top 操作，并且能在常数时间内检索到最小元素的栈，
 * 我们可以使用一个辅助栈来跟踪当前的最小值。
 * 这个辅助栈在每次 push 操作时同步更新，以便始终保持最小值在栈顶。
 */
class MinStack {
  constructor() {
    this.stack = [];     // 主栈，用于存储所有元素
    this.minStack = [];  // 辅助栈，用于存储每个元素对应的当前最小值
  }

  /**
   * 将元素val推入堆栈
   * @param {number} val
   */
  push(val) {
    this.stack.push(val);
    // 如果辅助栈为空或新元素val小于等于当前最小值，则将val推入辅助栈
    if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
      this.minStack.push(val);
    }
  }

  /**
   * 删除堆栈顶部的元素
   */
  pop() {
    if (this.stack.length === 0) return;
    const top = this.stack.pop();
    // 如果删除的元素是当前最小值，则将辅助栈顶部元素也删除
    if (top === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
  }

  /**
   * 获取堆栈顶部的元素
   * @return {number}
   */
  top() {
    if (this.stack.length === 0) return null;
    return this.stack[this.stack.length - 1];
  }

  /**
   * 获取堆栈中的最小元素
   * @return {number}
   */
  getMin() {
    if (this.minStack.length === 0) return null;
    return this.minStack[this.minStack.length - 1];
  }
}

// 示例使用
let minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); // 输出 -3
minStack.pop();
console.log(minStack.top());    // 输出 0
console.log(minStack.getMin()); // 输出 -2
