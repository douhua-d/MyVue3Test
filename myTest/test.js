// [5,6,3,2]
function sort(arr) {
  for (let i = 0; i < arr.lengh; i++) {
    for (let j = i + 1; j < arr.lengh - 1; j++) {
      if (arr[i] < arr[j]) {
       let temp = arr[j];
       arr[j] = arr[i];
       arr[i] =temp;
      }
    }
  }
  return arr;
}