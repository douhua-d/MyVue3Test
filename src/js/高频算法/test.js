// 版本号排序
const versionSort = (arr) => {
  arr.sort((a, b) => {
    const arr1 = a.split(".");
    const arr2 = b.split(".");
    let i = 0;
    while (true) {
      const s1 = arr1[i];
      const s2 = arr2[i];
      i++;
      if (s1 === undefined || s2 === undefined) {
        return arr2.length - arr1.length;
      }
      if (s1 === s2) continue;
      return s2 - s1;
    }
  });
};

// const arr = ["0.1.1", "2.3.3", "0.302.1", "4.2", "4.3.5", "4.3.5.5"];
// versionSort(arr);
// console.log(arr);

// 插入排序 O(N2)
function insertSort(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    let j = i - 1;
    let curr = arr[i];
    while (j >= 0 && arr[j] > curr) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = curr;
  }
  return arr
}