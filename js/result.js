window.addEventListener('DOMContentLoaded', () => {
  const score = localStorage.getItem('score');
  const total = localStorage.getItem('totalQuestions');

  const resultText = document.getElementById('scoreDisplay');

  if (score !== null && total !== null) {
    resultText.textContent = `Your Score: ${score} out of ${total}`;
  } else {
    resultText.textContent = `No quiz results found.`;
  }

  localStorage.removeItem('score');
  localStorage.removeItem('totalQuestions');
});
