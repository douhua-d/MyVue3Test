// 234 回文链表  -简单
let isPalindrome = (head) => {
    let vals = [];
    while (head !== null) {
        vals.push(head.val);
        head = head.next;
    }

    let left = 0;
    let right = vals.length - 1;
    while (left <= right) {
        if (vals[left] !== vals[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
};