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

function quickSort (arr) {
    if (arr.length < 2) {
        return arr;
    }
    let flag = arr[0];
    let left = [];
    let right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < flag) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(flag, quickSort(right));
}

Function.prototype.myBind = function (context = window, ...args1) {
    let fn = this;
    return function bound (...args2) {
        if (this instanceof bound) {
            return new bound(...args1, ...args2);
        }
        return fn.apply(context, args1.concat(args2));
    };
};

function cloneDeep (target) {
    const map = new WeakMap();

    function isObject (data) {
        return (data && typeof data === 'object') || typeof data === 'function';
    }

    function clone (data) {
        if (!isObject(data)) return;

        if ([Date, RegExp].includes(data.constructor)) {
            return new data.constructor(data);
        }
        if (typeof data === 'function') {
            return new Function('return' + data.toString())();
        }

        const exist = map.get(data);
        if (exist) {
            return exist;
        }

        if (data instanceof Map) {
            const result = new Map();
            map.set(data, result);
            data.forEach((val, key) => {
                if (isObject(val)) {
                    result.set(key, clone(val));
                } else {
                    result.set(key, val);
                }
            });
            return result;
        }

        if (data instanceof Set) {
            const result = new Set();
            map.set(data, result);
            data.forEach(val => {
                if (isObject(val)) {
                    result.add(clone(val));
                } else {
                    result.add(val);
                }
            });
            return result;
        }

        const keys = Reflect.ownKeys(data);
        const allDesc = Object.getOwnPropertyDescriptors(data);
        const result = Object.create(Object.getPrototypeOf(data), allDesc);
        map.set(data, result);

        keys.forEach(key => {
            const val = data[key];
            if (isObject(val)) {
                result[key] = clone(val);
            } else {
                result[key] = val;
            }
        });

        return result;
    }

    return clone(target);
}

const map = new Map();
map.set({ a: 1 }, 2);
map.set(3, 'rt');
map.set('fggg', 23);
map.forEach((val, key) => {
    console.log(val, key);
});