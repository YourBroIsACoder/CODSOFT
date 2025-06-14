document.addEventListener("DOMContentLoaded", () => {
  const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
  if (quizzes.length === 0) {
    document.getElementById("quiz-container").innerHTML = "<p>No quizzes available.</p>";
    return;
  }

  const quiz = quizzes[quizzes.length - 1];
  const form = document.getElementById("quiz-container");

  quiz.questions.forEach((q, index) => {
    const questionBlock = document.createElement("div");
    questionBlock.classList.add("question-block");

    const questionHTML = `
      <p><strong>${q.question}</strong></p>
      ${q.options.map((opt, i) => {
        const letter = String.fromCharCode(65 + i);
        return `
          <label class="quiz-option">
            <input type="radio" name="q${index}" value="${letter}" required /> ${opt}
          </label>
        `;
      }).join("")}
    `;

    questionBlock.innerHTML = questionHTML;
    form.insertBefore(questionBlock, form.lastElementChild); 
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let score = 0;

    quiz.questions.forEach((q, index) => {
      const selected = form.querySelector(`input[name="q${index}"]:checked`);
      if (selected && selected.value === q.correct) {
        score++;
      }
    });

    form.innerHTML = `
      <h2>Quiz Completed!</h2>
      <p class="final-score">You scored ${score} out of ${quiz.questions.length}</p>
      <div class="button-group">
        <a class="btn" href="index.html">Go to Home</a>
      </div>
    `;
  });
});
