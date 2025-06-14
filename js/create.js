document.getElementById('quiz-form').addEventListener('submit', saveQuiz);

function addQuestion() {
  const container = document.getElementById('questions-container');

  const questionBlock = document.createElement('div');
  questionBlock.classList.add('question-block');

  const questionHTML = `
    <label>Question:</label>
    <input type="text" class="question" placeholder="Enter question" required />

    <label>Options:</label>
    <input type="text" class="option" placeholder="Option A" required />
    <input type="text" class="option" placeholder="Option B" required />
    <input type="text" class="option" placeholder="Option C" required />
    <input type="text" class="option" placeholder="Option D" required />

    <label>Correct Option (A/B/C/D):</label>
    <select class="correct-answer" required>
      <option value="">Select</option>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="D">D</option>
    </select>
  `;

  questionBlock.innerHTML = questionHTML;
  container.appendChild(questionBlock);
}

function saveQuiz(e) {
  e.preventDefault();

  const title = document.getElementById('quiz-title').value;
  const questions = [];

  const questionElements = document.querySelectorAll('.question-block');

  questionElements.forEach((block) => {
    const questionText = block.querySelector('.question').value;
    const options = Array.from(block.querySelectorAll('.option')).map(opt => opt.value);
    const correct = block.querySelector('.correct-answer').value;

    if (!questionText || options.includes("") || !correct) {
      alert("Please fill out all fields.");
      return;
    }

    questions.push({
      question: questionText,
      options,
      correct
    });
  });

  if (questions.length === 0) {
    alert("Add at least one question.");
    return;
  }

  // Save quiz to localStorage
  const existing = JSON.parse(localStorage.getItem('quizzes')) || [];
  existing.push({ title, questions });
  localStorage.setItem('quizzes', JSON.stringify(existing));

  alert("Quiz saved successfully!");
  window.location.href = "index.html";
}
