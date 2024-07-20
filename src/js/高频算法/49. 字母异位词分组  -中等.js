// 49. 字母异位词分组  -中等

/**
 * 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
 *
 * 字母异位词 是由重新排列源单词的所有字母得到的一个新单词。
 *
 *
 *
 * 示例 1:
 *
 * 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 * 示例 2:
 *
 * 输入: strs = [""]
 * 输出: [[""]]
 * 示例 3:
 *
 * 输入: strs = ["a"]
 * 输出: [["a"]]
 */

var groupAnagrams = function (strs) {
    const map = new Map();
    for (let str of strs) {
        let count = new Array(26).fill(0);
        for (let s of str) {
            let index = s.charCodeAt() - 'a'.charCodeAt();
            count[index] += 1;
        }
        const key = count.toString();
        const list = map.get(key) ? map.get(key) : [];
        list.push(str);
        map.set(key, list);
    }
    return Array.from(map.values());
};

// 方法二  利用排序
var groupAnagrams = function (strs) {
    const map = new Map();
    for (let str of strs) {
        const strArr = Array.from(str);
        strArr.sort();
        const key = strArr.toString();
        const list = map.get(key) ? map.get(key) : [];
        list.push(str);
        map.set(key, list);
    }
    return Array.from(map.values());
};

console.log(Array.from('abc d'));