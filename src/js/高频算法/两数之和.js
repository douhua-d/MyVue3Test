function twoSum(arr, target) {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    let complete = target - arr[i];
    if (map.has(complete)) {
      return [i, map.get(complete)];
    } else {
      map.set(arr[i], i);
    }
  }
  return [];
}