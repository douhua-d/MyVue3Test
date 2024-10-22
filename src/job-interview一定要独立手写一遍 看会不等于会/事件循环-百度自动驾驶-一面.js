console.log('start');

setTimeout(() => {
    console.log('timeout1');
    Promise.resolve().then(() => console.log('then2'));
}, 0);

new Promise((resolve) => {
    console.log('promise1');
    resolve();
}).then(() => {
    console.log('then1');
    setTimeout(() => {
        console.log('timeout2');
    }, 0);
});

console.log('end');

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