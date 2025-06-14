const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");

let expression = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    if (value) {
      expression += value;
      display.value = expression;
    }
  });
});

clearBtn.addEventListener("click", () => {
  expression = "";
  display.value = "";
});

equalsBtn.addEventListener("click", () => {
  try {
    const result = eval(expression);
    display.value = result;
    expression = result.toString();
  } catch {
    display.value = "Error";
    expression = "";
  }
});
