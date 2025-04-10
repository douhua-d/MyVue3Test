// 大文件上传、分片上传、计算MD5

// 分片计算MD5：对文件进行分片，并逐块计算MD5，减少单次计算的负担。
// 增量计算：结合分片和增量计算，使MD5计算更加高效。

document.getElementById("fileInput").addEventListener("change", async (event) => {
  const files = event.target.files;
  for (const file of files) {
    const md5 = await calculateMD5(file);
    console.log(`File: ${file.name}, MD5: ${md5}`);
    // Continue with file upload
  }
});

function calculateMD5(file) {
  return new Promise((resolve, reject) => {
    const chunkSize = 2 * 1024 * 1024; // 2MB per chunk
    const chunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      spark.append(event.target.result);
      currentChunk++;
      if (currentChunk < chunks) {
        loadNextChunk();
      } else {
        resolve(spark.end());
      }
    };

    fileReader.onerror = () => {
      reject("Error reading file");
    };

    function loadNextChunk() {
      const start = currentChunk * chunkSize;
      const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
      fileReader.readAsArrayBuffer(file.slice(start, end));
    }

    loadNextChunk();
  });
}


//   性能优化：选择性能较好的MD5库，如spark-md5，并结合Web Workers和分片技术优化计算过程。
// 使用Web Workers：在后台线程中计算MD5，避免阻塞主线程，提高用户体验。

//  序列化和反序列化  web worker

// Worker脚本（md5Worker.js）

/**
 * 在Web Worker与主线程之间传输数据时，使用postMessage()方法进行通信，浏览器会对传递的数据进行序列化和反序列化的过程，
 * 以便在不同的线程间传递数据。这个序列化和反序列化的过程就是结构化克隆（Structured Cloning）。
 * 结构化克隆是一种浏览器内置的序列化和反序列化算法，
 * 它可以将复杂的JavaScript对象、数组、字符串、数字、布尔值等数据类型转换成一个可以在不同线程间传递的二进制数据流，
 * 然后再将这个二进制数据流反序列化为与原始数据相同的JavaScript对象。
 
 * 链接：https://juejin.cn/post/7224369270142009403
 * 
 * 使用其他序列化方式：除了结构化克隆，还可以考虑使用其他的序列化方式，例如JSON.stringify和JSON.parse。
 * 虽然JSON序列化和反序列化可能比结构化克隆更慢，但它不会像结构化克隆一样复制整个数据（因仅支持部分数据类型，以及会无视undefined的字段等），
 * 而是将数据转换为JSON字符串，并在接收方解析JSON字符串成JavaScript对象。这样可以一定的避免复制大规模的数据，从而降低性能开销
 *
 */

importScripts("path/to/spark-md5.min.js");

self.onmessage = function(event) {
  const { file, chunkSize } = event.data;
  const spark = new SparkMD5.ArrayBuffer();
  const fileReader = new FileReader();
  let currentChunk = 0;
  const chunks = Math.ceil(file.size / chunkSize);

  fileReader.onload = function(e) {
    spark.append(e.target.result);
    currentChunk++;
    if (currentChunk < chunks) {
      loadNextChunk();
    } else {
      self.postMessage({ md5: spark.end() });
    }
  };

  fileReader.onerror = function() {
    self.postMessage({ error: "Error reading file" });
  };

  function loadNextChunk() {
    const start = currentChunk * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const blob = file.slice(start, end);
    fileReader.readAsArrayBuffer(blob);
  }

  loadNextChunk();
};


// 主线程部分（main.js）

document.getElementById("fileInput").addEventListener("change", async (event) => {
  const files = event.target.files;
  for (const file of files) {
    const md5 = await calculateMD5WithWorker(file);
    console.log(`File: ${file.name}, MD5: ${md5}`);
    // Continue with file upload
  }
});

function calculateMD5WithWorker(file) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("md5Worker.js");
    const chunkSize = 2 * 1024 * 1024; // 2MB per chunk

    worker.postMessage({ file, chunkSize });

    worker.onmessage = function(event) {
      const { md5, error } = event.data;
      if (md5) {
        resolve(md5);
      } else {
        reject(error);
      }
      worker.terminate();
    };
  });
}


