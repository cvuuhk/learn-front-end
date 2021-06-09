let form = document.getElementById("form");
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let password2 = document.getElementById("password2");

function showSuccess(input) {
  input.parentElement.classList.remove("error");
  input.parentElement.classList.add("success");
}
function showError(input, message) {
  const parent = input.parentElement;
  let e = parent.querySelector("small");
  e.textContent = message;
  parent.classList.remove("success");
  parent.classList.add("error");
}
function showDefault(input) {
  input.parentElement.classList.remove("error");
  input.parentElement.classList.remove("success");
}
function checkLength(input, min, max) {
  const length = input.value.trim().length;
  if (length < min || length > max) {
    showError(input, "长度为" + min + "到" + max);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}
function checkUsername() {
  return checkLength(username, 4, 15);
}
function checkEmail() {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!reg.test(email.value.trim())) {
    showError(email, "请输入正确的邮箱");
    return false;
  } else {
    showSuccess(email);
    return true;
  }
}
function checkPassword() {
  return checkLength(password, 4, 15);
}
function checkPasswordMatch() {
  if (password.value !== password2.value) {
    showError(password2, "两次密码不一致");
    return false;
  } else {
    showSuccess(password2);
    return true;
  }
}

[username, email, password, password2].forEach((ele) => {
  ele.addEventListener("focus", () => {
    showDefault(ele);
  });
});
username.addEventListener("blur", checkUsername);
email.addEventListener("blur", checkEmail);
password.addEventListener("blur", checkPassword);
password2.addEventListener("blur", checkPasswordMatch);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    checkUsername() &&
    checkEmail() &&
    checkPassword() &&
    checkPasswordMatch()
  ) {
    alert("全部通过！");
  }
});
