let vnode = {
  tag: "DIV",
  attrs: {
    id: "app"
  },
  children: [
    {
      tag: "SPAN",
      children: [
        { tag: "A", children: [] }
      ]
    },
    {
      tag: "SPAN",
      children: [
        { tag: "A", children: [] },
        { tag: "A", children: [] }
      ]
    }
  ]
};

// 把上面虚拟Dom转化成下方真实Dom
/**
 * <div id="app">
 *   <span>
 *     <a></a>
 *   </span>
 *   <span>
 *     <a></a>
 *     <a></a>
 *   </span>
 * </div>
 */

// 将字符串转化为文本节点；
// 将数字转化为字符串再转化为文本节点；
// 将多属性节点转换为文本节点，子节点再延续上面的过程；

//Virtual DOM => DOM
function render(vnode, container) {
  container.appendChild(_render(vnode));
}

// 真正的渲染函数
function _render(vnode) {
  // 如果是数字类型转化为字符串
  if (typeof vnode === "number") {
    vnode = String(vnode);
  }
  // 字符串类型直接就是文本节点
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }
  // 普通DOM
  const dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    // 遍历属性
    Object.keys(vnode.attrs).forEach((key) => {
      const value = vnode.attrs[key];
      dom.setAttribute(key, value);
    });
  }
  // 子数组进行递归操作
  vnode.children.forEach((child) => dom.appendChild(_render(child)));
  return dom;
}

console.log(_render(vnode));

