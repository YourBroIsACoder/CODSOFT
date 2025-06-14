document.getElementById('registerForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;

  const user = {
    username,
    password
  };

  localStorage.setItem('quizUser', JSON.stringify(user));
  alert('Registered successfully! Please log in.');
  window.location.href = 'login.html';
});


document.getElementById('loginForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const savedUser = JSON.parse(localStorage.getItem('quizUser'));

  if (savedUser && savedUser.username === username && savedUser.password === password) {
    alert('Login successful!');
    localStorage.setItem('loggedIn', 'true');
    window.location.href = 'index.html';
  } else {
    alert('Invalid username or password!');
  }
});
