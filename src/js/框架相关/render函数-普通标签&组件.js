// 把 elementVnode 渲染到 id 为 app 的元素下
render(elementVnode, document.getElementById('app'))

function mountElement(vnode, container) {
  // 创建元素
  const el = document.createElement(vnode.tag)
  // 将元素添加到容器
  container.appendChild(el)
}

// 组件 的本质是产出vnode
class MyComponent {
  render() {
    // render 函数产出 VNode
    return {
      tag: 'div'
    }
  }
}
// 如上，我们使用 class 定义了一个类，它是一个组件(有状态组件)，我们可以使用如下 VNode 来描述它
const componentVnode = {
  tag: MyComponent
}

function render(vnode, container) {
  if (typeof vnode.tag === 'string') {
    // html 标签
    mountElement(vnode, container)
  } else {
    // 组件
    mountComponent(vnode, container)
  }
}

//  如上，通过 判断 vnode.tag 是否是字符串 来区分：一个 VNode 到底是 html 标签还是组件。
//  如果是组件的话，调用 mountComponent 函数挂载组件，而非 mountElement，如下是 mountComponent 函数的实现：
function mountComponent(vnode, container) {
  // 创建组件实例
  const instance = new vnode.tag()
  // 渲染
  instance.$vnode = instance.render()
  // 挂载
  mountElement(instance.$vnode, container)
}

/**
 * 道理很简单，由于 vnode.tag 指向组件类，所以我们创建一个组件实例，
 * 接着调用其 render 函数产出 VNode 并将其添加到实例属性 instance.$vnode，
 * 最后借用 mountElement 函数完成标签的挂载即可。
 *
 * 实际上为了便于理解，本节代码的简化程度很大，更加详细严谨的代码会在后续的具体章节中体现。
 * 不过这足以说明问题：可以让 VNode 的 tag 属性指向组件本身，从而使用 VNode 来描述组件
 */