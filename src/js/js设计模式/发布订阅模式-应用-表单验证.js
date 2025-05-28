// 实际应用：简单的表单验证
const formValidator = new EventEmitter();

// 表单元素
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const submitButton = document.getElementById('submit');

// 注册验证器
const validateUsername = (username) => {
  const isValid = username.length >= 3;
  formValidator.emit('validation:username', isValid);
  return isValid;
};

const validateEmail = (email) => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  formValidator.emit('validation:email', isValid);
  return isValid;
};

// 监听验证事件
formValidator.on('validation:username', isValid => {
  usernameInput.className = isValid ? 'valid' : 'invalid';
});

formValidator.on('validation:email', isValid => {
  emailInput.className = isValid ? 'valid' : 'invalid';
});

// 监听所有验证结果以决定表单是否可提交
let usernameValid = false;
let emailValid = false;

formValidator.on('validation:username', isValid => {
  usernameValid = isValid;
  updateSubmitButton();
});

formValidator.on('validation:email', isValid => {
  emailValid = isValid;
  updateSubmitButton();
});

const updateSubmitButton = () => {
  submitButton.disabled = !(usernameValid && emailValid);
};

// 输入事件处理
usernameInput.addEventListener('input', (e) => validateUsername(e.target.value));
emailInput.addEventListener('input', (e) => validateEmail(e.target.value));