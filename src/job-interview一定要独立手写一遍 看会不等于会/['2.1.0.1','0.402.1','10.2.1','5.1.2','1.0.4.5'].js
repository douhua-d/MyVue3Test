/**
 * 版本号排序
 * 输入：['2.1.0.1','0.402.1','10.2.1','5.1.2','1.0.4.5']
 * 输出：['10.2.1','5.1.2',2.1.0.1','1.0.4.5','0.402.1']
 */

// sort 方法 (a,b)  return 的值  > 0  时 排序顺序：b会在a 前边  为降序
  //  return的值  < 0 时   排序顺序： a,b  为升序

const sortVersion = (arr) => {
    arr.sort((a, b) => {
      let arr1 = a.split(".");
      let arr2 = b.split(".");
      let i = 0;
      while (true) {
        let s1 = arr1[i];
        let s2 = arr2[i];
        i++;

        if (s1 === undefined || s2 === undefined) {
          return arr2.length - arr1.length;
        }
        if (s1 === s2) continue;
        return s2 - s1;
      }
    });
    return arr;
  };

console.log(sortVersion(["2.1.0.1", "0.402.1", "10.2.1", "5.1.2", "1.0.4.5"]));