const isValid = (s) => {
  if (s.length % 2 === 1) {
    return false;
  }
  const regObj = {
    "(": ")",
    "[": "]",
    "{": "}"
  };

  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(" || s[i] === "[" || s[i] === "{") {
      stack.push(s[i]);
    } else {
      let cur = stack.pop();
      if (s[i] !== regObj[cur]) {
        return false;
      }
    }
  }

  if (stack.length) {
    return false;
  }

  return true;
};

console.log(isValid("()"));
console.log(isValid("()[]{}"));
console.log(isValid("(]"));
