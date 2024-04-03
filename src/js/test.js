function iteratorGenerator (list) {
    let index = 0;
    let len = list.length;
    return {
        next () {
            let done = index >= len;
            let value = !done ? list[index++] : undefined;
            return { done, value };
        }
    };
}

let iterator = iteratorGenerator(['1号选手', '2号选手', '3号选手']);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

function insertSort (arr) {
    for (let i = 1; i < arr.length; i++) {
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

function _render (vNode) {
    if (typeof vNode === 'number') {
        vNode = String(vNode);
    }
    if (typeof vNode === 'string') {
        return document.createTextNode(vNode);
    }
    const dom = document.createElement(vNode.tag);
    if (vNode.attrs) {
        Object.keys(vNode.attrs).forEach(key => {
            dom.setAttribute(key, vNode.attrs[key]);
        });
    }

    vNode.children.forEach(child => dom.appendChild(_render(child)));
    return dom;
}

// 合并区间
var merge = function (intervals) {
    if (intervals.length < 2) {
        return intervals;
    }
    intervals.sort((a, b) => a[0] - b[0]);
    const res = [];
    let curr = intervals[0];
    for (interval of intervals) {
        if (interval[0] <= curr[1]) {
            curr[1] = Math.max(curr[1], interval[1]);
        } else {
            res.push(curr);
            curr = interval;
        }
    }
    if (curr.length > 0) {
        res.push(curr);
    }
    return res;
};

// 反转数组 
var rotate = function (nums, k) {
    const len = nums.length;
    const newArr = new Array(len);
    for (let i = 0; i < len; i++) {
        newArr[(i + k) % len] = nums[i];
    }
    for (let i = 0; i < len; i++) {
        nums[i] = newArr[i];
    }
    return nums;
};

// 除自身意外的数组乘积
var productExceptSelf = function (nums) {
    const result = new Array(nums.length).fill(1);
    let product = 1;  // 假当给定的数组左边界外有一个隐形的 1 ，1乘任何数还是它本身

    // 从左到右一次 记录到目前这个下标数字左边数到它的乘积
    for (let i = 0; i < nums.length; i++) {
        result[i] = result[i] * product;
        product = product * nums[i];
    }

    product = 1;

    // 再从右到左一次 记录到目前这个下标数字左边数到它的乘积
    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] = result[i] * product;
        product = product * nums[i];
    }
    return result;
};

function selectSort (arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length - 1; j++) {
            if (arr[j] < arr[minIndex]) ;
            minIndex = j;
        }
        [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
    }
    return arr;
}

var getIntersectionNode = function (headA, headB) {
    const visited = new Set();
    let temp = headA;
    while (temp !== null) {
        visited.add(temp);
        temp = temp.next;
    }
    temp = headB;
    while (temp !== null) {
        if (visited.has(temp)) {
            return temp;
        }
        temp = temp.next;
    }
    return null;
};

// 反转链表
var reverseList = function (head) {
    let pre = null;
    let curr = head;
    while (curr !== null) {
        let next = curr.next;
        curr.next = pre;
        pre = curr;
        curr = next;
    }
    return pre;
};

var isPalindrome = function (head) {
    const vals = [];

    while (head !== null) {
        vals.push(head.val);
        head = head.next;
    }
    let i = 0, j = vals.length - 1;
    for (i, j; i < j; i++, j--) {
        if (vals[i] === vals[j])
            return true;
    }
    return false;
};

var detectCycle = function (head) {
    if (head === null) return null;
    let slow = head;
    let fast = head;
    let isCycle = fasle;
    while (fast.next !== null && fast.next.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if (fast === slow) {
            isCycle = true;
            break;
        }
    }
    if (!isCycle) return null;
    fast = head;
    while (fast !== slow) {
        slow = slow.next;
        fast = fast.next;
    }
    return fast;
};

var search = function (nums, target) {
    let low = 0, high = nums.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
};

function solve (root) {
    let stack = [], result = [];
    if (!root) return [];
    stack.push(root);
    while (stack.length) {
        const node = stack.pop();
        if (node == null) continue;
        result.push(node.name);
        for (let i = node.children.length - 1; i >= 0; i--) {
            stack.push(node.children[i]);
        }
    }
    return result;
}

