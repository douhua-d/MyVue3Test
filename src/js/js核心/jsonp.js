/**
 * https://zhuanlan.zhihu.com/p/92846599
 * 因为浏览器加载完脚本是自动执行的，
 * 比如我们加载一个脚本，里面只有一行`alert(1)`，那浏览器就会自动弹出1。
 * 所以我们请求的结果其实是一个函数 `callback(data)`，然后会自动执行，
 * 刚好上面定义了这个函数，于是就输出了结果。
 *
 * JSONP 的缺点
 只能支持 GET 请求，说加载脚本却拿数据，欺骗浏览器的感情。

 也可以用Access-Control-Allow-Origin 设置多域名*/

export let jsonp = function(url, params, callback) {
  let queryString = url.indexOf("?") === -1 ? "?" : "&";
  for (let key in params) {
    queryString += `${key}=${params[key]}&`;
  }
  let random = Math.random().toString().replace(".", "");
  let callbackName = "myJsonp" + random;
  let scriptNode = document.createElement("script");
  scriptNode.src = url + queryString;
  window[callbackName] = function(data) {
    callback(data);
    document.body.removeChild(scriptNode);
  };
  document.body.appendChild(scriptNode);
};

window.$jsonp = jsonp;