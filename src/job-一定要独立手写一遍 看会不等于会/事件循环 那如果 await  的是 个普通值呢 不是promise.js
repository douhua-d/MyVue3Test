const async1 = async () => {
  console.log("async1 start");
  const result = await "normal value";
  console.log("async1 end");
  return result;
};

console.log("script start");
async1().then(res => console.log(res));
console.log("script end");

// 正解
// script start
// async1 start
// script end
// async1 end
// normal value