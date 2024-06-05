function getKeys(arr) {
  const tree = [];
  for (let i = 0; i++; i < arr.length) {
    for (let j = 1; j++; j < arr.length) {
      if (arr[j].children.includes(arr[i].node)) {

      }
    }
  }


  const queue = [arr[0]];
  const result = [];
  while (queue.length) {
    const cur = queue.shift();
    result.push(cur.val);
    if (cur.children) {
      cur.children.forEach(child => {
        queue.push(child);
      });
    }
  }


}