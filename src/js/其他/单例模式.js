/**
 * 单例模式
 * 系统中被唯一使用 && 一个类只有一个实例
 * 实际运用：Jquery $,登陆框  vuex redux
 * */

class SingleObject {
  login() {  // 每次 new 都会生成一个login方法，实例方法
    console.log("login.....");
  }
}

// 类的静态方法  不管new多少次SingleObject，也只有一个 getInstance方法
SingleObject.getInstance = (function() {
  let instance;
  return function() {
    if (!instance) {
      instance = new SingleObject();
      return instance;
    }
  };
})();

let obj1 = SingleObject.getInstance();
obj1.login();
let obj2 = SingleObject.getInstance();
obj2.login();

console.log(obj1 === obj2);  // true

console.log("分割线-----------");

let obj3 = new SingleObject();  //无法完全控制  在外边不允许手动再new  只有做到构造调用私有化才可以完全控制（利用TS的private）
obj3.login();

console.log(obj1 === obj3); // false

//  登录框单例模式
class LoginForm {
  constructor() {
    this.state = "hide";
  }

  show() {
    if (this.state === "show") {
      console.log("已显示");
      return;
    }
    this.state === "show";
    console.log("登录框已显示");
  }

  hide() {
    if (this.state === "hide") {
      console.log("已隐藏");
      return;
    }
    this.state === "hide";
    console.log("登录框已隐藏");
  }
}

LoginForm.getInstace = (function() {
  let instance;
  return function() {
    if (!instance) {
      instance = new LoginForm();
    }
    return instance;
  };
})();
