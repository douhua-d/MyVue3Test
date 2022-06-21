/**
 * https://juejin.cn/post/6932387485750296589
 * 观察者模式又称为发布-订阅模式，实际上这两者略有不同，不过广义上认为是同样的意思。
 * 指多个对象间存在一对多的依赖关系，
 * 当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。
 * 一个经典的例子是报社和订阅报纸的人。
 * */

class Notifier {
  constructor() {
    this.observerList = [];
  }

  add(obj) {
    this.observerList.push(obj);
  }

  remove(obj) {
    let index = this.observerList.findIndex(item => item === obj);
    this.observerList.splice(index, 1);
  }

  notify() {
    this.observerList.forEach(obj => {
      obj.update();
    });
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update() {
    console.log(this.name, "接收到通知");
  }
}

let notifier = new Notifier();
let observe1 = new Observer("古力娜扎");
let observe2 = new Observer("赵丽颖");
notifier.add(observe1);
notifier.add(observe2);

notifier.notify();
// notifier.remove(observe2);
// notifier.notify();
