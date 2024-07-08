// 图片请求并发控制、带有失败重试

class ImageLoader {
  constructor(urls, concurrency, maxRetries = 3) {
    this.urls = urls.map(url => ({ url, retries: 0 })); // 每个URL附加一个重试计数
    this.concurrency = concurrency; // 并发限制数
    this.maxRetries = maxRetries; // 最大重试次数
    this.currentCount = 0; // 当前正在处理的请求数
    this.results = []; // 存储已成功加载的图片URL
  }

  // 启动加载过程，返回一个Promise，加载完成时resolve
  load() {
    return new Promise((resolve, reject) => {
      this.resolve = resolve; // 保存resolve，以便在加载完成时调用
      this.reject = reject; // 保存reject，以便在出错时调用
      // 启动并发请求
      for (let i = 0; i < this.concurrency; i++) {
        this.next();
      }
    });
  }

  // 处理下一个图片加载请求
  next() {
    // 如果所有图片都已处理完，且没有正在进行的请求，则结束
    if (this.urls.length === 0 && this.currentCount === 0) {
      return this.resolve(this.results);
    }

    // 如果当前正在处理的请求数小于并发限制，并且有待处理的图片
    if (this.currentCount < this.concurrency && this.urls.length > 0) {
      const { url, retries } = this.urls.shift(); // 获取下一个图片URL，并增加索引
      this.currentCount++; // 增加当前处理的请求数

      // 加载图片
      this.loadImage(url)
        .then(result => {
          this.results.push(result); // 将成功加载的图片URL存储到results中
          this.currentCount--; // 减少当前处理的请求数
          this.next(); // 继续处理下一个图片
        })
        .catch(error => {
          console.error(`Error loading image: ${error}, retries: ${retries}`); // 处理加载失败的情况
          if (retries < this.maxRetries) {
            this.urls.push({ url, retries: retries + 1 }); // 增加重试次数并重新加入队列
          }
          this.currentCount--; // 减少当前处理的请求数
          this.next(); // 继续处理下一个图片
        });
    }
  }

  // 返回一个Promise，加载指定的图片URL
  loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url); // 加载成功时resolve
      img.onerror = () => reject(url); // 加载失败时reject
      img.src = url; // 设置图片src属性开始加载
    });
  }
}

// 示例使用
const urls = [
  "http://e.1hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg",
  "http://c.hiphotos.baidu.com/image/pic/item/30adcbef76094b36de8a2fe5a1cc7cd98d109d99.jpg",
  "http://h.hiphotos.baidu.com/image/pic/item/7c1ed21b0ef41bd5f2c2a9e953da81cb39db3d1d.jpg",
  "http://g.hiphotos.baidu.com/image/pic/item/55e736d12f2eb938d5277fd5d0628535e5dd6f4a.jpg",
  "http://e.hiphotos.baidu.com/image/pic/item/4e4a20a4462309f7e41f5cfe760e0cf3d6cad6ee.jpg",
  "http://b.hiphotos.baidu.com/image/pic/item/9d82d158ccbf6c81b94575cfb93eb13533fa40a2.jpg",
  "http://e.hiphotos.baidu.com/image/pic/item/4bed2e738bd4b31c1badd5a685d6277f9e2ff81e.jpg",
  "http://g.hiphotos.baidu.com/image/pic/item/0d338744ebf81a4c87a3add4d52a6059252da61e.jpg",
  "http://a.hiphotos.baidu.com/image/pic/item/f2deb48f8c5494ee5080c8142ff5e0fe99257e19.jpg",
  "http://f.hiphotos.baidu.com/image/pic/item/4034970a304e251f503521f5a586c9177e3e53f9.jpg",
  "http://b.hiphotos.baidu.com/image/pic/item/279759ee3d6d55fbb3586c0168224f4a20a4dd7e.jpg",
  "http://a.hiphotos.baidu.com/image/pic/item/e824b899a9014c087eb617650e7b02087af4f464.jpg",
  "http://c.hiphotos.baidu.com/image/pic/item/9c16fdfaaf51f3de1e296fa390eef01f3b29795a.jpg",
  "http://d.hiphotos.baidu.com/image/pic/item/b58f8c5494eef01f119945cbe2fe9925bc317d2a.jpg",
  "http://h.hiphotos.baidu.com/image/pic/item/902397dda144ad340668b847d4a20cf430ad851e.jpg",
  "http://b.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9ea5c0e3c23d139b6003bf3b374.jpg",
  "http://a.hiphotos.baidu.com/image/pic/item/8d5494eef01f3a292d2472199d25bc315d607c7c.jpg",
  "http://b.hiphotos.baidu.com/image/pic/item/e824b899a9014c08878b2c4c0e7b02087af4f4a3.jpg",
  "http://g.hiphotos.baidu.com/image/pic/item/6d81800a19d8bc3e770bd00d868ba61ea9d345f2.jpg"
];

const loader = new ImageLoader(urls, 3, 3); // 创建ImageLoader实例，并发限制为3，最大重试次数为3
loader.load()
  .then(results => console.log('All images loaded', results))
  .catch(error => console.error('Error loading images', error));
