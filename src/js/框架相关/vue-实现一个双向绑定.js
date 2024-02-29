// vue2- Object.defineProperty
const data = {
  text: "default"
};

const input = document.getElementById("input");
const span = document.getElementById("span");

Object.defineProperty(data, "text", {
  // 数据变化 -> 修改视图
  set(newVal) {
    input.value = newVal;
    span.innerHTML = newVal;
  }
});

// 视图变化 -> 修改数据
input.addEventListener("keyup", function(e) {
  data.text = e.target.value;
});


/** vue3- proxy 版本
 *
 */
// 数据
const data = {
  text: "default"
};
const input = document.getElementById("input");
const span = document.getElementById("span");

const handler = {
  // 数据变化 -> 修改视图
  set(target, key, value) {
    target[key] = value;
    input.value = value;
    span.innerHTML = value;
  }
};

const proxy = new Proxy(data, handler);
input.addEventListener("keyup", function(e) {
  proxy.text = e.target.value;
});
