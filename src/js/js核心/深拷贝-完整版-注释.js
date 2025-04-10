
let date = new Date();
console.log(123,date.__proto__.constructor);
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