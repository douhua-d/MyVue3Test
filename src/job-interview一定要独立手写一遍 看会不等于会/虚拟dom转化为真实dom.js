const vNode = {
  tag: "DIV",
  attrs: {
    id: "app"
  },
  children: [
    {
      tag: "SPAN",
      children: [
        {
          tag: "A",
          children: []
        }
      ]
    },
    {
      tag: "SPAN",
      children: [
        {
          tag: "A",
          children: []
        },
        {
          tag: "A",
          children: []
        }
      ]
    }
  ]
};

function _render(vNode) {
  if (typeof vNode === "number") {
    vNode = String(vNode);
  }
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }
  let dom = document.createElement(vNode.tag);
  if (vNode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      let val = vNode.attrs[key];
      dom.setAttribute(key, val);
    });
  }
  vNode.children.forEach(child => dom.appendChild(_render(child)));
  return dom;
}