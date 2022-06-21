//https://blog.csdn.net/qq_39246667/article/details/105792204
//https://juejin.cn/post/6974326659117744141

// 此示例代表 get 请求
let getJson = function(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(xhr.responseText));
      }
    };
    xhr.send();
  });
};


// ES6类实现
const GET = "GET";
const POST = "POST";
const noop = () => {
};

class Ajax {
  constructor() {
    this.xhr = new XMLHttpRequest();
  }

  //格式化数据
  formatData(data = {}) {
    const arr = [];
    for (let key in data) {
      arr.push(encodeURIComponent(key) + "=" + data[key]);
    }
    return arr.join("&");
  }

  request(options = {}) {
    const self = this;
    this.data = this.formatData(options.data);
    this.type = (options.type || GET).toUpperCase();
    this.url = options.url;
    if (!this.url) {
      throw new Error("ajax url is required.");
    }
    this.success = options.success || noop;
    this.error = options.error || noop;

    if (this.type === GET) {
      this.xhr.open(this.type, this.url + "?" + this.data, true);
      this.xhr.send();
    } else if (this.type === POST) {
      this.xhr.open(this.type, this.url, true);
      this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      this.xhr.send();
    }

    this.xhr.onreadystatechange = function() {
      if (self.xhr.readyState === 4) {
        if ([200, 204, 206].indexOf(self.xhr.status) > -1) {
          const result = self.xhr.responseText;
          typeof self.success === "function" &&
          self.success.call(self.xhr, result);
        } else {
          const error = self.xhr.responseText;
          typeof self.error === "function" && self.error.call(self.xhr, error);
        }
      }
    };
  }

}

