const axios = require("axios");

class MaxRetriesExceeded extends Error {
  constructor(message) {
    super(message);
    this.name = "MaxRetriesExceeded";
  }
}


fetch(url).then(response => {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json(); // Assuming the response is JSON
});

function fetchWithRetries(url, retries = 3) {
  return new Promise((resolve, reject) => {
    function attemptFetch(remainingRetries) {
      axios.get(url)
        .then(response => {
          resolve(response.data);
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
fetchWithRetries("https://jsonplaceholder.typicode.com/todos/1")
  .then(data => {
    console.log("Data fetched successfully:", data);
  })
  .catch(error => {
    if (error instanceof MaxRetriesExceeded) {
      console.error("Max retries exceeded:", error.message);
    } else {
      console.error("Fetch error:", error.message);
    }
  });
