// 输出  script start 、 async1 start 、promise1 、promise3 、 script end  、promise2 、、 async1 end 、 promise4   setTimeout

// 宏任务： setTimeout

// 微任务：promise2  、、async1 end 、promise4  


class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, fn, once = false) {
    if (this.events[type]) {
      this.events[type].push({ fn, once });
    } else {
      this.events[type] = [{ fn, once }];
    }
  }

  emit(type, ...args) {
    this.events[type].forEach(obj => {
      if(obj.once){
        obj.fn(...args);
        this.off(type,obj.fn)
      }else {
        obj.fn(...args);
      }
    });
  }

  off(type, fn) {
    if (!this.events[type]) return;
    this.events[type] = this.events[type].filter(item => item !== fn);
  }

  once(type, fn) {
    this.on(type, fn, true);
  }
}

function compare(a, b){
  if(Object.prototype.toString().call(a) !== Object.prototype.toString().call(b)){
    return false;
  }

  return JSON.stringify(a) ===  JSON.stringify(b);
  
  
  let type = Object.prototype.toString().call(a);
  if(type === '[object Object]'){
    for (let keyA in a){
      let val =  a[keyA];
      if(b[keyA] !== val){
        return false
      }
    }
  }
}

