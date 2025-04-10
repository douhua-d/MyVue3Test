// 数组乱序
function mixArr(arr) {
  return arr.sort(() => {
    return Math.random() - 0.5;
  });
}

// 数组去重1
function removeDuplicate(arr) {
  const res = [];
  const map = {};
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i];
    if (!map[temp]) {
      map[temp] = true;
      res.push(temp);
    }
  }
  return res;
}

// 数组去重2
Array.from(new Set(arr));

// 数组去重3
[...new Set(arr)];