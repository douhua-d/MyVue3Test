console.log(2);
Promise.resolve().then(() => console.log(1));
console.log(3);
// 以上打印顺序 2 3 1


const pArr = [1, 2, 3, 5, 6].map(item => Promise.resolve(item));
console.log({ pArr });

class Promise {
    static resolve (value) {
        if (value instanceof Promise) {
            return value;
        }

        return new Promise(resolve => {
            resolve(value);
        });
    }
}

/**
 * 实现 resolve 静态方法有三个要点:
 *
 * 传参为一个 Promise, 则直接返回它。
 * 传参为一个 thenable 对象，返回的 Promise 会跟随这个对象，采用它的最终状态作为自己的状态。
 * 其他情况，直接返回以该值为成功状态的promise对象。
 */
Promise.myResolve = (param) => {
    if (param instanceof Promise) return param;
    return new Promise((resolve, reject) => {
        if (param && param.then && typeof param.then === 'function') {
            // param 状态变为成功会调用resolve，将新 Promise 的状态变为成功，反之亦然
            param.then(resolve, reject);
        } else {
            resolve(param);
        }
    });
};