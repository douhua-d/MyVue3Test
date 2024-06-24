/**
 * 编写一个CSS样式规则，用于创建一个响应式的导航栏。
 * 导航栏在屏幕宽度大于或等于768px时水平显示，
 * 而在小于768px时应垂直堆叠显示
 */

/**
 *  <nav class="navbar">
 *         <ul class="navbar-menu">
 *             <li class="navbar-item"><a href="#">Home</a></li>
 *             <li class="navbar-item"><a href="#">About</a></li>
 *             <li class="navbar-item"><a href="#">Services</a></li>
 *             <li class="navbar-item"><a href="#">Contact</a></li>
 *         </ul>
 *     </nav>
 *     
 *     默认的一个  小于768px时
 *     .navbar-menu {
 *     list-style: none;
 *     margin: 0;
 *     padding: 0;
 *     display: flex;
 *     flex-direction: column; /* 垂直排列 
 *     
 *     
 *     
 *     */

// /* 屏幕宽度大于或等于768px时的样式 */
// @media (min-width: 768px) {
// .navbar-menu {
//     flex-direction: row; /* 水平排列 */
//     justify-content: center; /* 水平居中 */
//   }
//
// .navbar-item {
//     flex: 1; /* 平均分配空间 */
//   }
//
// .navbar-item a {
//     text-align: center;
//   }
// }


// 爬虫实现
/**
 * 编写一个js函数，该函数使用fetch API 从给定的URL获取数据，
 * 并解析返回的JSON。该函数返回一个Promise,该Promise在成功获取数据时解析为JSON数据，
 * 或在发生错误时拒绝。另外，如果连续三次尝试从同一URL获取数据都失败，
 * 则函数应抛出一个特定的错误（例如 MaxRetriesExceeded)
 */


class MaxRetriesExceeded extends Error {
  constructor(message) {
    super(message);
    this.name = 'MaxRetriesExceeded';
  }
}

function fetchWithRetries(url, retries = 3) {
  return new Promise((resolve, reject) => {
    function attemptFetch(remainingRetries) {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          if (remainingRetries > 0) {
            console.log(`Retrying... Attempts remaining: ${remainingRetries}`);
            attemptFetch(remainingRetries - 1);
          } else {
            reject(new MaxRetriesExceeded(`Failed to fetch from ${url} after ${retries} attempts`));
          }
        });
    }

    attemptFetch(retries);
  });
}

// 示例用法：
fetchWithRetries('https://jsonplaceholder.typicode.com/todos/1')
  .then(data => {
    console.log('Data fetched successfully:', data);
  })
  .catch(error => {
    if (error instanceof MaxRetriesExceeded) {
      console.error('Max retries exceeded:', error.message);
    } else {
      console.error('Fetch error:', error.message);
    }
  });






