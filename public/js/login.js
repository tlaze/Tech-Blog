const loginFormHandler = async (event) => {

  event.preventDefault();
  const username = document.querySelector("#user-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: "POST",
      body: JSON.stringify({ 
        username,
        password
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } 
    else {
      alert('Invalid Username/Password!');
    }
  }
};
document.querySelector(".login-form").addEventListener("submit", loginFormHandler);
