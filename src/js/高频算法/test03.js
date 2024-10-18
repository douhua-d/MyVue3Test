const compareVersion = (version1, version2) => {
    const v1parts = version1.split('.');
    const v2parts = version2.split('.');
    const maxLength = Math.max(v1parts.length, v2parts.length);
    for (let i = 0; i < maxLength; i++) {
        let a = i < v1parts.length ? parseInt(v1parts[i]) : 0;
        let b = i < v2parts.length ? parseInt(v2parts[i]) : 0;
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
    }

    return 0;
};

// // 示例
// console.log(compareVersion("1.01", "1.001")); // 输出: 0
// console.log(compareVersion("1.0", "1.0.0"));  // 输出: 0
// console.log(compareVersion("0.1", "1.1"));    // 输出: -1
// console.log(compareVersion("1.0.1", "1"));    // 输出: 1
// console.log(compareVersion("7.5.2.4", "7.5.3")); // 输出: -1


function findMaxCharAndCount(str) {
    let charMap = {};
    let maxChar = '';
    let maxCount = 0;
    for (let char of str) {
        charMap[char] = (charMap[char] || 0) + 1;
        if (charMap[char] > maxCount) {
            maxChar = char;
            maxCount = charMap[char]
        }
    }
    return { maxChar, maxCount }
}

// // 测试示例
// const exampleStr = "abcabcabcbbccccc";
// const result2 = findMaxCharAndCount(exampleStr);
// console.log(`字符最多的是${result2.maxChar}，出现了${result2.maxCount}次`);


function reverse(x) {
    const MAX_INT = 2 ** 31 - 1;
    const MIN_INT = -(2 ** 31);
    const flag = x > 0 ? 1 : -1;
    const reversedStr = Math.abs(x).toString().split('').reverse().join('');
    const result = flag * parseInt(reversedStr, 10);
    if (result > MAX_INT || result < MIN_INT) {
        return 0
    }
    return result
}

// console.log(reverse(-123));


function isPalindrome(x) {
    if (x < 0) {
        return false
    }
    const str = x.toString();
    let left = 0;
    let right = str.length - 1;
    while (left < right) {
        if (str[left] !== str[right]) {
            return false
        }
        left++;
        right--;
    }
    return true
}

// console.log(isPalindrome(121)); // 输出: false

function threeSumClosest(nums, target) {
    let closestSum = Infinity;
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length - 2; i++) {
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right];
            if (Math.abs(sum - target) < Math.abs(closestSum - target)) {
                closestSum = sum
            }
            if (sum === target) {
                return closestSum;
            }
            if (sum < target) {
                left++;
            }
            if (sum > target) {
                right--;
            }
        }
    }
    return closestSum
}

// 测试用例
// console.log(threeSumClosest([-1, 2, 1, -4], 1)); // 输出: 2
// console.log(threeSumClosest([0, 0, 0], 1)); // 输出: 0


function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

function swapPairs(head) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    let first = head;
    while (first && first.next) {
        let second = first.next;
        let nextPair = second.next;

        second.next = first;
        first.next = nextPair;
        prev.next = second;

        prev = second;
        first = nextPair
    }
    return dummy.next
}

function removeDuplicates(nums) {
    if (nums.length === 0) return 0;
    let i = 0;
    for (let j = i + 1; j < nums.length; j++) {
        if (nums[j] !== nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return i + 1
}
// // 测试
// const nums = [1, 1, 2, 2, 3, 4, 4, 5,6];
// const length = removeDuplicates(nums);
// console.log('数组中不重复元素的长度:', length);
// console.log('去重后的数组:', nums.slice(0, length));

function jump(nums) {
    let jumps = 0;
    let current_end = 0;
    let farthest = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i])
        if (current_end >= nums.length - 1) {
            break
        }
        if (i === current_end) {
            jumps++;
            current_end = farthest;
        }
    }
    return jumps;
}

// // 测试用例
// console.log(jump([2, 3, 1, 1, 4])); // 输出: 2
// console.log(jump([2, 3, 0, 1, 4])); // 输出: 2

function groupAnagrams(strs) {
    const map = new Map();
    for (let str of strs) {
        let count = new Array(26).fill(0);
        for (let char of str) {
            let index = char.charCodeAt() - 'a'.charCodeAt();
            count[index]++;
        }
        let key = count.join('');
        let list = map.get(key) ? map.get(key) : [];
        list.push(str);
        map.set(key, list)
    }

    return Array.from(map.values())
}

let strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
console.log(groupAnagrams(strs));
