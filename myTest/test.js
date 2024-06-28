function findMaxCharAndCount(str) {
  let map = {};
  let maxChar = "";
  let maxCount = 0;
  for (let char of str) {
    map[char] = (map[char] || 0) + 1;
    if (map[char] > maxCount) {
      maxCount = map[char];
      maxChar = char;
    }
  }
  return { maxChar, maxCount };
}

const exampleStr = "abcabcabcbbccccc";
const result2 = findMaxCharAndCount(exampleStr);
console.log(`字符最多的是${result2.maxChar}，出现了${result2.maxCount}次`);