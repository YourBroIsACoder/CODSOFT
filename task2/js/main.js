window.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  const welcomeMessage = document.createElement('p');
  welcomeMessage.textContent = isLoggedIn
    ? `Welcome back! Ready to take or create a quiz?`
    : `Welcome! Please login or register to get started.`;

  document.querySelector('.container')?.appendChild(welcomeMessage);
});
