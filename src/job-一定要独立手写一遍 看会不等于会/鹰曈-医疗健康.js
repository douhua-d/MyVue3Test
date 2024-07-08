// 人脸年龄识别过程中，针对每一帧人脸图像，算法给出的年龄会有波动，
// 
// 因此需要采用一定的技术手段，实现年龄值处理、这里采用的方式为：将当前帧以及之前49帧的年龄平均值（一共50帧），作为当前的年龄显示值
// 上述过程可以简述为滑动平均，不足50帧的直接做平均


// 要在 JavaScript 中实现滑动平均算法，将当前帧和之前49帧的年龄平均值作为当前的年龄显示值，
// 可以使用一个数组来存储最近50帧的年龄值，并动态计算它们的平均值。以下是一个可能的实现方案：

class AgeSmoother {
  constructor(windowSize = 50) {
    this.windowSize = windowSize;
    this.ageValues = [];
    this.currentSum = 0;
  }

  addAge(age) {
    // Add the new age to the array and update the sum
    this.ageValues.push(age);
    this.currentSum += age;

    // Remove the oldest age if we have exceeded the window size
    if (this.ageValues.length > this.windowSize) {
      const oldestAge = this.ageValues.shift();
      this.currentSum -= oldestAge;
    }

    // Calculate the average
    const averageAge = this.currentSum / this.ageValues.length;
    return averageAge;
  }
}

// Usage
const ageSmoother = new AgeSmoother(50);

// Simulating the process with incoming age values for each frame
const ageFrames = [22, 23, 21, 24, 25, 26, 23, 22, 21, 20, 25, 26, 24, 23, 22, 24, 25, 27, 28, 29, 24, 23, 25, 26, 27, 22, 23, 21, 24, 25, 26, 23, 22, 21, 20, 25, 26, 24, 23, 22, 24, 25, 27, 28, 29, 24, 23, 25, 26, 27, 22, 23, 21, 24, 25, 26, 23, 22, 21, 20, 25, 26, 24, 23, 22, 24, 25, 27, 28, 29, 24, 23, 25, 26, 27];

ageFrames.forEach(age => {
  const smoothedAge = ageSmoother.addAge(age);
  console.log(`Current smoothed age: ${smoothedAge.toFixed(2)}`);
});


//  说我实现的 内存泄漏？
class Calc {
  constructor() {
    this.beforeAges = [];
  }


  calcCur(fromApiAge) {
    let len = this.beforeAges.length;
    let average;
    if (len < 49) {
      average = this.beforeAges.reduce((total, cur) => total + cur, fromApiAge) / (len + 1);
    } else {
      let count = 0;
      let sum = 0;
      let targetIndex = len - 1;
      while (count <= 49) {
        sum += this.beforeAges[targetIndex];
        count++;
        targetIndex--;
      }
      average = (sum + fromApiAge) / 50;
    }
    return average;
  }


}