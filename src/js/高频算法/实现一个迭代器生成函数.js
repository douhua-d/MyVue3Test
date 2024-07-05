/**
 * JS原生的集合类型数据结构，只有Array（数组）和Object（对象）；而ES6中，又新增了Map和Set。四种数据结构各自有着自己特别的内部实现，但我们仍期待以同样的一套规则去遍历它们，所以ES6在推出新数据结构的同时也推出了一套统一的接口机制——迭代器（Iterator）。
 *
 * ES6约定，任何数据结构只要具备Symbol.iterator属性（这个属性就是Iterator的具体实现，它本质上是当前数据结构默认的迭代器生成函数），就可以被遍历——准确地说，是被for...of...循环和迭代器的next方法遍历。 事实上，for...of...的背后正是对next方法的反复调用。
 *
 * 在ES6中，针对Array、Map、Set、String、TypedArray、函数的 arguments 对象、NodeList 对象这些原生的数据结构都可以通过for...of...进行遍历。原理都是一样的，此处我们拿最简单的数组进行举例，当我们用for...of...遍历数组时：
 */

// 之所以能够按顺序一次一次地拿到数组里的每一个成员，是因为我们借助数组的Symbol.iterator生成了它对应的迭代器对象，通过反复调用迭代器对象的next方法访问了数组成员，像这样：

const arr = [1, 2, 3];
// 通过调用iterator，拿到迭代器对象
const iterator = arr[Symbol.iterator]();

// 对迭代器对象执行next，就能逐个访问集合的成员
iterator.next();
iterator.next();
iterator.next();


// 我们说迭代器对象全凭迭代器生成函数帮我们生成。在ES6中，实现一个迭代器生成函数并不是什么难事儿，因为ES6早帮我们考虑好了全套的解决方案，内置了贴心的生成器（Generator）供我们使用：

/**
 * ES6 版
 */

// 编写一个迭代器生成函数
function* iteratorGenerator() {
  yield "1号选手";
  yield "2号选手";
  yield "3号选手";
}

const iterator = iteratorGenerator();

iterator.next();
iterator.next();
iterator.next();

/**
 * ES5 版
 */

function iteratorGenerator(list) {
  let index = 0;
  return {
    next: function() {
      let done = index >= list.length;
      let value = !done ? list[index++] : undefined;
      return {
        value,
        done
      };
    }
  };
}

// 定义生成器函数，入参是任意集合
function iteratorGenerator(list) {
  // idx记录当前访问的索引
  var idx = 0;
  // len记录传入集合的长度
  var len = list.length;
  return {
    // 自定义next方法
    next: function() {
      // 如果索引还没有超出集合长度，done为false
      var done = idx >= len;
      // 如果done为false，则可以继续取值
      var value = !done ? list[idx++] : undefined;

      // 将当前值与遍历是否完毕（done）返回
      return {
        done: done,
        value: value
      };
    }
  };
}

var iterator = iteratorGenerator(["1号选手", "2号选手", "3号选手"]);
iterator.next();
iterator.next();
iterator.next();