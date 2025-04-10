//js中的递归函数之执行顺序
//https://blog.csdn.net/qq_42858057/article/details/108617593
//递归调用
function foo2(i) {
  if (i == 4) {
    return;
  }
  console.log("fb:" + i);
  foo2(i + 1);
  console.log("fe:" + i);
}

foo2(1);

// 伪代码： 递归调用
// foo(1);//一开始传了一个1进来
function foo(i) {
  if (i == 4) {
    return;
  }
  console.log("fb:" + i);//第一行输出---fb:1
  //此时执行:foo(i + 1);
  function foo(i) {//i = i + 1 = 2
    if (i == 4) {
      return;
    }
    console.log("fb:" + i);//第二行输出---fb:2
    function foo(i) {//i = i + 1 = 3
      if (i == 4) {
        return;
      }
      console.log("fb:" + i);//第三行输出---fb:3
      console.log("fe:" + i);//第四行输出---fe:3
    }

    console.log("fe:" + i);//第五行输出---fe:2
  }

  //所以后面的console.log("fe:" + i);被推到嵌套函数foo(i + 1)的后面了
  console.log("fe:" + i);//第六行输出---fe:1
}



// 归并排序2   执行过程
/**
 * merge_sort_f([100, 2, 5, 7, 9, 1, 3] , 0 ,6){
 * if();
 * if();
 *
 * mid = 3;
 *
 * arr1 = merge_sort_f([100, 2, 5, 7, 9, 1, 3] , 0 ,3){
 *  mid =1;
 *  arr1 = merge_sort_f([100, 2, 5, 7, 9, 1, 3] , 0 ,1) ; [2,100];
 *  arr2 = merge_sort_f([100, 2, 5, 7, 9, 1, 3] , 2 ,3);  [5,7];
 *  merge([2,100],[5,7]);
 * }
 * // 最后 merge_sort_f([100, 2, 5, 7, 9, 1, 3] , 0 ,3) 返回 [2,5,7,100]
 * // 给了  merge_sort_f([100, 2, 5, 7, 9, 1, 3] , 0 ,6) 函数执行中的arr1 =[2,5,7,100];
 * // merge_sort_f([100, 2, 5, 7, 9, 1, 3] , 0 ,6) 执行中 mid=3,arr1 =merge_sort_f([100, 2, 5, 7, 9, 1, 3] , 0 ,3)拿到了结果
 * 继续执行 merge_sort_f([100, 2, 5, 7, 9, 1, 3] , 0 ,6) mid=3;
 *
 * arr2 =  merge_sort_f([100, 2, 5, 7, 9, 1, 3] , 4,6){
 *       mid = 5;
 *       arr1 = merge_sort_f([100, 2, 5, 7, 9, 1, 3] , 4,5); 拿到return的值 [1,9];
 *       arr2 = merge_sort_f([100, 2, 5, 7, 9, 1, 3] , 6,6); 拿到return的值 [3];
 *       继续执行 return merge([1,9],[3])
 * }
 * //本次执行结束 拿到 [1,3,9]
 *
 * 继续跳到  最外层执行 merge_sort_f([100, 2, 5, 7, 9, 1, 3] , 0 ,6)
 * 合并 arr1 =[2,5,7,100]; arr2=[1,3,9];拿到最后的结果
 * }
 *
 */


