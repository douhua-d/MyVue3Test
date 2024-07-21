// 版本号排序
const versionSort = (arr) => {
    arr.sort((a, b) => {
        const arr1 = a.split('.');
        const arr2 = b.split('.');
        let i = 0;
        while (true) {
            const s1 = arr1[i];
            const s2 = arr2[i];
            i++;
            if (s1 === undefined || s2 === undefined) {
                return arr2.length - arr1.length;
            }
            if (s1 === s2) continue;
            return s2 - s1;
        }
    });
};

// const arr = ["0.1.1", "2.3.3", "0.302.1", "4.2", "4.3.5", "4.3.5.5"];
// versionSort(arr);
// console.log(arr);

// 插入排序 O(N2)
function insertSort (arr) {
    const len = arr.length;
    for (let i = 1; i < len; i++) {
        let j = i - 1;
        let curr = arr[i];
        while (j >= 0 && arr[j] > curr) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = curr;
    }
    return arr;
}

//  跳跃游戏
function jumps (nums) {
    let jumps = 0;
    let maxReach = 0;
    let end = 0;

    for (let i = 0; i < nums.length - 1; i++) {
        maxReach = Math.max(maxReach, i + nums[i]);
        if (i === end) {
            jumps++;
            end = maxReach;
        }
    }

    return jumps;
}

// 两两交换链表节点
function swapParis (head) {
    let dummy = new ListNode();
    dummy.next = head;

    let prev = dummy;
    let first = head;

    while (first && first.next) {
        let second = first.next;
        let nextPair = second.next;

        second.next = first;
        first.next = nextPair;
        prev.next = second;

        prev = first;
        first = nextPair;
    }

    return dummy.next;

}

// 手写深度比较isEqual
function isEqual (obj1, obj2) {
    const isObject = (data) => data !== null && typeof data === 'object';

    if (!isObject(obj1) || !isObject(obj2)) {
        return obj1 === obj2;
    }

    if (obj1 === obj2) return true;

    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }

    for (let key in obj1) {
        if (!isEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}

// 对象扁平化
function objectFlat (obj) {
    let res = {};

    function flat (obj, preKey = '') {
        Object.entries(obj).forEach(([key, val]) => {
            let newKey = preKey ? `${preKey}.${key}` : key;
            if (val && typeof val === 'object') {
                flat(val, newKey);
            } else {
                res[newKey] = val;
            }
        });
    }

    flat(obj);
    return res;
}

// 反转链表
function reverseLinkedList (head) {
    let prev = null;
    let curr = head;
    while (curr !== null) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

// 判断是否是环形链表
function hasCycle (head) {
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;

        if (fast === slow) {
            return true;
        }
    }
    return false;
}

// 插入排序  
function insertSort (arr) {
    let len = arr.length;
    for (let i = 1; i < len; i++) {
        let j = i - 1;
        let curr = arr[i];
        while (j >= 0 && arr[j] > curr) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = curr;
    }
    return arr;
}

// 缺失的第一个正数
function firstMissingPositive (arr) {
    let nums = arr.filter(num => num > 0);
    if (!nums.length) return 1;
    nums.sort((a, b) => a - b);
    if (nums[0] !== 1) {
        return 1;
    }
    for (let i = 0; i < nums.length; i++) {
        if (nums[i + 1] - nums[i] > 1) {
            return nums[i] + 1;
        }
    }
    return nums[nums.length - 1] + 1;
}

// console.log(firstMissingPositive([1, 2, 3]));

// 手写一个二分查找
function search (arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            return mid;
        }
        if (arr[mid] < target) {
            left = mid + 1;
        }
        if (arr[mid] > target) {
            right = mid - 1;
        }
    }
    return targetIndex;
}

console.log(search([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7));

// 实现两数之和
function twoSum (arr, target) {
    let map = new Map();
    for (let i = 0; i < arr.length; i++) {
        let complete = target - arr[i];
        if (map.has(complete)) {
            return [i, map.get(complete)];
        } else {
            map.set(arr[i], i);
        }
    }
    return [];
}

// 实现三数之和 
function threeSum (arr) {
    let res = [];
    let len = arr.length;
    arr.sort((a, b) => a - b);  // todo 别忘了  先排序
    for (let i = 0; i < len - 2; i++) {
        let j = i + 1;
        let k = len - 1;

        while (i > 0 && arr[i] === arr[i - 1]) {
            continue;
        }

        while (j <= k) {
            let total = arr[i] + arr[j] + arr[k];
            if (total < 0) {
                j++;
                while (j < k && arr[j] === arr[j - 1]) {
                    j++;
                }
            } else if (total > 0) {
                k--;
                while (j < k && arr[k] === arr[k + 1]) {
                    k--;
                }
            } else {
                res.push(arr[i], arr[j], arr[k]);

                // todo 别忘了后边还有逻辑呢  移动指针 和 判断重复
                j++;
                k--;
                while (j < k && arr[j] === arr[j - 1]) {
                    j++;
                }
                while (j < k && nums[k] === nums[k + 1]) {
                    k--;
                }
            }
        }
    }
    return res;
}

// 最长回文子串
function longestStr (str) {
    if (str.length < 2) {
        return str;
    }

    let start = 0;
    let maxLength = 1;

    function expandAroundCenter (left, right) {
        while (left >= 0 && right <= str.length - 1 && str[left] === str[right]) {

            // todo 注意点 需要判断之后才更新赋值啊！！
            if (right - left + 1 > maxLength) {
                maxLength = right - left + 1;
                start = left;
            }

            // todo  别总忘修改迭代条件值啊！！
            left--;
            right++;
        }
    }

    for (let i = 0; i < str.length - 1; i++) {
        expandAroundCenter(i - 1, i + 1);
        expandAroundCenter(i, i + 1);
    }

    // todo 注意-结束的索引是加上 长度 + start ！！

    return str.substring(start, start + maxLength);
}


// 无重复字符的最长子串  返回的是长度
function longestStr (s) {
    let len = s.length;
    if (len < 2) {
        return len;
    }
    let left = 0, right = 0;
    let set = new Set();
    let maxLen = 0;
    while (right < len) {
        if (!set.has(s[right])) {
            set.add(s[right]);
            right++;
            maxLen = Math.max(maxLen, set.size);
        } else {
            while (set.has(s[right])) {
                set.delete(s[left]);
                left++;
            }
        }
    }
    return maxLen;
}

// 实现一个单例模式


function fn () {
    this.type = 'lazy';
    this.obj = {};
}

// 懒汉式
const lazySingleTon = (function () {
    let _instance = null;
    return function () {
        return _instance || (_instance = new fn());
    };
})();

// 饿汉式
const hungrySingleTon = (function () {
    let _instance = new fn();
    return function () {
        return _instance;
    };
})();


// 找到与目标整数最接近的整数  字节二面
function findCloset (arr, target) {
    let len = arr.length;
    if (!len) {
        throw new Error('数组不能为空');
    }
    let closet = arr[0];
    let minDiff = Math.abs(target - closet);
    for (let i = 1; i < len; i++) {
        let diff = Math.abs(target - arr[i]);
        if (diff < minDiff) {
            minDiff = diff;
            closet = arr[i];
        } else if (diff === minDiff) {
            continue;
        }
    }
    return closet;
}

// 实现最近最少使用算法  LRU  实现LRU淘汰算法
class LRUCache {
    constructor (length) {
        this.length = length;
        this.data = new Map();
    }

    set (key, value) {
        if (this.data.has(key)) {
            this.data.delete(key);
        }

        this.data.set(key, value);
        if (this.data.size > this.length) {
            let oldKey = this.data.keys().next().value;
            this.data.delete(oldKey);
        }
    }

    get (key) {
        if (!this.data.has(key)) {
            return null;
        }

        let val = this.data.get(key);
        this.data.delete(key);
        this.data.set(key, val);
        // todo  记得返回 val啊！！
        return val;
    }
}

// 数组去重
let arr = [1, 4, 6, 7, 6];
let res = arr.filter((item, index) => arr.indexOf(item) === index);
console.log({ res });

console.log([...new Set(arr)]);

// 反转字符串
/**
 * 输入：["h","e","l","l","o"]
 * 输出：["o","l","l","e","h"]
 */
function reverseStr (s) {
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
    return s;
}

console.log('reverseStr===', reverseStr(['h', 'e', 'l', 'l', 'o']));

// 移动零
let moveZero = (arr) => {
    let noZeroIndex = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            arr[noZeroIndex] = arr[i];
            noZeroIndex++;
        }
    }

    for (let i = noZeroIndex; i < arr.length; i++) {
        arr[i] = 0;
    }
    return arr;
};

// 删除有序数组中的重复项  
const removeDuplicates = (arr) => {
    if (arr.length === 0) return 0;
    let i = 0;
    for (let j = 1; j < arr.length; j++) {
        if (arr[j] !== arr[i]) {
            i++;
            arr[i] = arr[j];
        }
    }
    return i + 1;
};

// 字母异位词分组  
let groupWords = (strs) => {
    let map = new Map();
    for (let str of strs) {
        const count = new Array(26).fill(0);
        for (let s of str) {
            let index = s.charCodeAt() - 'a'.charCodeAt();
            count[index]++;
        }
        let key = count.toString();
        let list = map.get(key) ? map.get(key) : [];
        list.push(str);
        map.set(key, list);
    }
    return Array.from(map.values());
};

// 将数组分成和相等的三个部分
let canThreePartsSum = (arr) => {
    let total = arr.reduce((a, b) => a + b);
    if (total % 3 !== 0) return false;
    let targetSum = total / 3;
    let count = 0;
    let currSum = 0;
    for (let num of arr) {
        // todo 注意：先会加个和
        currSum += num;
        if (currSum === targetSum) {
            count++;
            currSum = 0;
        }
    }
    // todo 注意：判断的是大于等于 不是等于
    return count >= 3;
};