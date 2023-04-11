import { questions } from "./data.js";

const progressValueEl = document.querySelector(".progress .value");
const numberEl = document.querySelector(".number");
const questionEl = document.querySelector(".question");
const choice1El = document.querySelector(".choice1");
const choice2El = document.querySelector(".choice2");

let currentNumber = 0;
let mbti = { e: 0, n: 0, t: 0, j: 0 };

function renderQuestion() {
  const question = questions[currentNumber];
  numberEl.innerHTML = question.number;
  questionEl.innerHTML = question.question;
  choice1El.innerHTML = question.choices[0].text;
  choice2El.innerHTML = question.choices[1].text;
  progressValueEl.style.width =
    currentNumber === 0 ? "2%" : (currentNumber / questions.length) * 100 + "%";
}

function calculateMbti(value) {
  switch (value) {
    case "e":
      mbti["e"] += 1;
      break;
    case "i":
      mbti["e"] -= 1;
      break;
    case "n":
      mbti["n"] += 1;
      break;
    case "s":
      mbti["n"] -= 1;
      break;
    case "t":
      mbti["t"] += 1;
      break;
    case "f":
      mbti["t"] -= 1;
      break;
    case "j":
      mbti["j"] += 1;
      break;
    case "p":
      mbti["j"] -= 1;
      break;
  }
}

function nextQuestion(choiceNumber) {
  if (currentNumber === 0 && choiceNumber === 1) {
    location.href = "/sad-ending.html";
    return;
  }

  const question = questions[currentNumber];
  calculateMbti(question.choices[choiceNumber].value);

  if (currentNumber === questions.length - 1) {
    showResultPage();
    return;
  }

  currentNumber = currentNumber + 1;
  renderQuestion();
}

function showResultPage() {
  let result = "";
  if (mbti["e"] > 0) result += "e";
  else result += "i";
  if (mbti["n"] > 0) result += "n";
  else result += "s";
  if (mbti["t"] > 0) result += "t";
  else result += "f";
  if (mbti["j"] > 0) result += "j";
  else result += "p";
  location.href = "/results.html?mbti=" + result;
}

choice1El.addEventListener("click", function () {
  nextQuestion(0);
});
choice2El.addEventListener("click", function () {
  nextQuestion(1);
});

renderQuestion();
