const async1 = async () => {
    console.log('async1');
    setTimeout(() => {
        console.log('timer1');
    }, 2000);
    await new Promise(resolve => {
        console.log('promise1');
    });
    console.log('async1 end');
    return 'async1 success';
};
console.log('script start');
async1().then(res => console.log(res));
console.log('script end');
Promise.resolve(1)
    .then(2)
    .then(Promise.resolve(3))
    .catch(4)
    .then(res => console.log(res));
setTimeout(() => {
    console.log('timer2');
}, 1000);

// 打印输出
/**
 * script start
 * async1
 * promise1
 * script end
 * 1
 * timer2
 * timer1
 */


// 微任务 
//  1 

// 宏任务
// 2秒后加入   timer1


async function async1 () {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}

async function async2 () {
    new Promise(function (resolve) {
        console.log('promise1');
        resolve();
    }).then((function () {
        console.log('promise2');
    }));
}

console.log('script start');

setTimeout(function () {
    console.log('setTimeout');
}, 0);

async1();

new Promise(function (resolve) {
    console.log('promise3');
    resolve();
}).then(function () {
    console.log('promise4');
});

console.log('script end');


//  打印
/**
 * start
 * promise1
 * end
 * then1
 * timeout1
 * then2
 * timeout2
 */

// 宏任务
// setTimeout(() => {
//     console.log("timeout1");
//     Promise.resolve().then(() => console.log("then2"));
// }, 0);

// setTimeout(() => {
// //         console.log("timeout2");
// //     }, 0);


// 微任务
// console.log("then1");
//     setTimeout(() => {
//         console.log("timeout2");
//     }, 0);
// then2
