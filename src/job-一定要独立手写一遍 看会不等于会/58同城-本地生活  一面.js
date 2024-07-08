//  手写获取url中的参数的方法
function getUrlParams(url) {
  const params = {};

  // 创建一个URL对象
  const urlObj = new URL(url);

  // 获取搜索参数（?后的参数）
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  // 获取哈希部分（#后的参数）
  if (urlObj.hash) {
    const hashParamsString = urlObj.hash.substring(1); // 去掉#号
    const hashParams = new URLSearchParams(hashParamsString);
    hashParams.forEach((value, key) => {
      params[key] = value;
    });
  }

  return params;
}

// 使用示例
const url = 'https://example.com/page?name=John&age=30#token=abc123&status=active';
const params = getUrlParams(url);
console.log(params);
// 输出结果：{ name: "John", age: "30", token: "abc123", status: "active" }




//  手写 Promise.allSettled 


