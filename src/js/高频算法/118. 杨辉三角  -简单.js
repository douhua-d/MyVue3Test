//  118. 杨辉三角  -简单
// 给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。
// 
// 在「杨辉三角」中，每个数是它左上方和右上方的数的和。
// 
// 
// 
//  
// 
// 示例 1:
// 
// 输入: numRows = 5
// 输出: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
// 示例 2:
// 
// 输入: numRow

/**
 * 生成杨辉三角的前 numRows 行
 * @param {number} numRows - 要生成的行数
 * @returns {number[][]} - 杨辉三角的二维数组
 */
function generate (numRows) {
    const triangle = []; // 用于存储杨辉三角的所有行

    for (let i = 0; i < numRows; i++) {
        const row = new Array(i + 1).fill(1); // 初始化当前行，所有值为 1

        // 填充当前行的值（除了第一个和最后一个值）
        for (let j = 1; j < i; j++) {
            row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
        }

        triangle.push(row); // 将当前行添加到杨辉三角中
    }

    return triangle; // 返回杨辉三角
}

// 示例
console.log(generate(5));


