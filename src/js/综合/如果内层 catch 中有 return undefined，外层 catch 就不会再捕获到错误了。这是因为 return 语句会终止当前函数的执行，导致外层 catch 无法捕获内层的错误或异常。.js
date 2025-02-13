/**
 * 如果内层 catch 中有 return undefined，外层 catch 就不会再捕获到错误了。这是因为 return 语句会终止当前函数的执行，导致外层 catch 无法捕获内层的错误或异常。
 *
 * 原因：
 * 在 JavaScript 中，try...catch 结构是通过捕获异常来处理错误的。如果 try 块中的代码抛出异常，catch 块就会捕获到这个异常。但如果在 内层 catch 中有一个 return 语句，这意味着：
 *
 * 内层 catch 捕获异常后，立即返回一个值（在这个例子中是 undefined）。
 * 返回的过程中，函数的执行就会结束，外层的 catch 不会再执行，因为控制流已经被 return 打断。
 */

function outerFunction() {
    try {
        try {
            // 内层代码，抛出一个异常
            throw new Error('Inner error');
        } catch (innerError) {
            // 内层捕获异常并返回 undefined
            console.log('Inside inner catch:', innerError.message);
            return undefined; // 返回结束当前函数的执行
        }
    } catch (outerError) {
        // 外层捕获异常
        console.log('Inside outer catch:', outerError.message);
    }
}

let result = outerFunction();
console.log('Result:', result);

// Inside inner catch: Inner error
// Result: undefined