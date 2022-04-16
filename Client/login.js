const inputs = document.querySelectorAll(".input");

function addClass() {
  let parent = this.parentNode.parentNode;
  parent.classList.add("focus");
}

function removeClass() {
  let parent = this.parentNode.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", addClass);
  input.addEventListener("blur", removeClass);
});

const loginForm = document.getElementById('login');
const signupForm = document.getElementById('signup');
function toggleFormSignUp(){
    loginForm.classList.add('hide')
    signupForm.classList.remove('hide')
}

function toggleFormLogin(){
    loginForm.classList.remove('hide')
    signupForm.classList.add('hide')
}