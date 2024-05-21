/**
 * 输入：1->2->2->1
 * 输出：true
 */

var isPalindrome = function(head) {
  const vals = [];

  while (head !== null) {
    vals.push(head.val);
    head = head.next;
  }
  let i = 0, j = vals.length - 1;
  for (i, j; i < j; i++, j--) {
    if (vals[i] !== vals[j])
      return false;
  }
  return true;
};