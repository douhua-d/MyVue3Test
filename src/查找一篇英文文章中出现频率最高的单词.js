function findMostWord(article) {

  // 合法性判断
  if (!article) return;

  // 参数处理
  article = article.trim().toLowerCase();

  let wordList = article.match(/[a-z]+/g),
    visited = [],
    maxNum = 0,
    maxWord = "";

  article = " " + wordList.join("  ") + " ";

  // 遍历判断单词出现次数
  wordList.forEach(function(item) {
    if (visited.indexOf(item) < 0) {
      let word = new RegExp(" " + item + " ", "g"),
        num = article.match(word).length;

      if (num > maxNum) {
        maxNum = num;
        maxWord = item;
      }
    }else {
      visited.push(item)
    }
  });
  return maxWord + "  " + maxNum;
}

console.log(findMostWord("Age has reached the end of the beginning of a word. May be guilty in his seems to passing a lot of different life became the appearance of the same day;"));