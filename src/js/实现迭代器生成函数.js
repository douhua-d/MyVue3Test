/**
 * JS原生的集合类型数据结构，只有Array（数组）和Object（对象）；而ES6中，又新增了Map和Set。
 * 四种数据结构各自有着自己特别的内部实现，但我们仍期待以同样的一套规则去遍历它们，
 * 所以ES6在推出新数据结构的同时也推出了一套统一的接口机制——迭代器（Iterator）。
 */

/**
 * ES6约定，任何数据结构只要具备Symbol.iterator属性（这个属性就是Iterator的具体实现，
 * 它本质上是当前数据结构默认的迭代器生成函数），就可以被遍历——准确地说，是被for...of...循环和迭代器的next方法遍历。 
 * 事实上，for...of...的背后正是对next方法的反复调用。
 */

const arr = [1, 2, 3]
// 通过调用iterator，拿到迭代器对象
const iterator = arr[Symbol.iterator]()

// 对迭代器对象执行next，就能逐个访问集合的成员
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

// 而for...of...做的事情，基本等价于下面这通操作：
// 通过调用iterator，拿到迭代器对象
const iterator = arr[Symbol.iterator]()

// 初始化一个迭代结果
let now = { done: false }

// 循环往外迭代成员
while(!now.done) {
    now = iterator.next()
    if(!now.done) {
        console.log(`现在遍历到了${now.value}`)
    }
}

/**
 * 我们说迭代器对象全凭迭代器生成函数帮我们生成。在ES6中，实现一个迭代器生成函数并不是什么难事儿，
 * 因为ES6早帮我们考虑好了全套的解决方案，内置了贴心的生成器（Generator）供我们使用：
 */

// ES6 中的实现 主要使用内置的 生成器  Generator
// 编写一个迭代器生成函数
function *iteratorGenerator() {
    yield '1号选手'
    yield '2号选手'
    yield '3号选手'
}

const iterator = iteratorGenerator()

iterator.next()
iterator.next()
iterator.next()

/**
 * 写一个生成器函数并没有什么难度，但在面试的过程中，面试官往往对生成器这种语法糖背后的实现逻辑更感兴趣。
 * 下面我们要做的，不仅仅是写一个迭代器对象，
 * 而是用ES5去写一个能够【生成迭代器对象】的【迭代器生成函数】（解析在注释里）：
 */

// ES5 实现
// 定义 生成器函数(迭代器生成函数)，  入参是任意集合
function iteratorGenerator(list) {
    // idx记录当前访问的索引
    let idx = 0
    // len记录传入集合的长度
    let len = list.length
    return {
        // 自定义next方法
        next: function() {
            // 如果索引还没有超出集合长度，done为false
            let done = idx >= len
            // 如果done为false，则可以继续取值
            let value = !done ? list[idx++] : undefined

            // 将当前值与遍历是否完毕（done）返回
            return {
                done: done,
                value: value
            }
        }
    }
}

let iterator = iteratorGenerator(['1号选手', '2号选手', '3号选手'])
iterator.next()
iterator.next()
iterator.next()
