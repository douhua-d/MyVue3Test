function findMostFrequentChar(str) {
  const charCount = new Map();

  // 统计每个字符的出现次数
  for (const char of str) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  console.log(123,charCount.entries());
  // 找出出现次数最多的字符及其次数
  const [maxChar, maxCount] = [...charCount.entries()].reduce((max, entry) => {
    return entry[1] > max[1] ? entry : max;
  });

  return { char: maxChar, count: maxCount };
}

// 示例用法
const result = findMostFrequentChar('abcabcabcbbccccc');
console.log(`字符最多的是${result.char}，出现了${result.count}次`);
// 输出：字符最多的是d，出现了5次



function findMaxCharAndCount(str) {
  let charMap = {};
  let maxChar = '';
  let maxCount = 0;

  // 遍历字符串，统计每个字符出现的次数
  for (let char of str) {
    charMap[char] = (charMap[char] || 0) + 1;
    // 更新出现次数最多的字符及其次数
    if (charMap[char] > maxCount) {
      maxCount = charMap[char];
      maxChar = char;
    }
  }

  return { character: maxChar, count: maxCount };
}

// 测试示例
const exampleStr = "abcabcabcbbccccc";
const result2 = findMaxCharAndCount(exampleStr);
console.log(`字符最多的是${result2.character}，出现了${result2.count}次`);