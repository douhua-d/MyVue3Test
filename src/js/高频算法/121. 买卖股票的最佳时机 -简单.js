// 121. 买卖股票的最佳时机  简单

/**
 * @param {number[]} prices - 数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格
 * @return {number} - 返回最大利润，如果不能获取任何利润，返回 0
 */

// 我们来假设自己来购买股票。随着时间的推移，每天我们都可以选择出售股票与否。那么，假设在第 i 天，如果我们要在今天卖股票，那么我们能赚多少钱呢？
// 
// 显然，如果我们真的在买卖股票，我们肯定会想：如果我是在历史最低点买的股票就好了！太好了，在题目中，我们只要用一个变量记录一个历史最低价格 minprice，我们就可以假设自己的股票是在那天买的。那么我们在第 i 天卖出股票能得到的利润就是 prices[i] - minprice。
// 
// 因此，我们只需要遍历价格数组一遍，记录历史最低点，然后在每一天考虑这么一个问题：如果我是在历史最低点买进的，那么我今天卖出能赚多少钱？当考虑完所有天数之时，我们就得到了最好的答案。
// 

function maxProfit(prices) {
  // 初始化变量 minPrice 为一个很大的值，maxProfit 为 0
  let minPrice = Infinity;
  let maxProfit = 0;

  // 遍历价格数组
  for (let i = 0; i < prices.length; i++) {
    // 如果当前价格比 minPrice 小，则更新 minPrice
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    }
    // 否则计算当前价格与 minPrice 的差值（即当前利润），并更新 maxProfit
    else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
    }
  }

  // 返回计算得到的最大利润
  return maxProfit;
}

// 示例使用
const prices = [7, 1, 5, 3, 6, 4];
console.log(maxProfit(prices)); // 输出 5
