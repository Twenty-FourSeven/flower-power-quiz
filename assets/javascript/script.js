var quizQuestions = [
  {
    question: "Ohana means_______",
    answers: ["bicycle", "a house", "your family"],
    correct: "your family",
  },
  {
    question: "What is one thing all Hawaiians do when they enter a home?",
    answers: ["Bow", "Do a spin", "Take of their shoes"],
    correct: "Take of their shoes",
  },
  {
    question: "What is Hurricane Popcorn?",
    answers: [
      "A nickname for a snow cone",
      "Popcorn with Furikake and Arare",
      "Red popcorn ball",
    ],
    correct: "Popcorn with Furikake and Arare",
  },
  {
    question: "What does it mean when something is ono?",
    answers: ["cool, sweet", "silly, frivolous", "delicious, scrumptious"],
    correct: "cool, sweet",
  },
  {
    question: "In the winter, where would you find the biggest waves?",
    answers: ["The North Shore", "Kawai", "Honolulu"],
    correct: "The North Shore",
  },
  {
    question: "Hawaii was the ______ state to be admitted into the union.",
    answers: ["45th", "49th", "50th"],
    correct: "50th",
  },
];

var startBtn = document.querySelector(".start-btn");
var startContainer = document.querySelector(".start-container");
var quizContainer = document.querySelector(".quiz-container");
const timerEl = document.querySelector(".timer");
var score = 0;
questionIndex = 0;
let time = 90;

startBtn.addEventListener("click", function () {
  startContainer.style.display = "none";
  renderQuestion();
  startTimer();
});

function startTimer() {
  timerEl.textContent = time;
  var timerInveral = setInterval(() => {
    time--;
    timerEl.textContent = time;

    if (time === 0 || questionIndex > quizQuestions.length - 1) {
      clearInterval(timerInveral);
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  const input = document.createElement("input");
  input.setAttribute("placeholder", "Name");
  const submitBtn = document.createElement("button");
  submitBtn.textContent = "SUBMIT";

  quizContainer.append(input, submitBtn);

  //when name submitted to highscores list
  submitBtn.addEventListener("click", function () {
    const userData = {
      name: input.value,
      finalScore: score,
    };
    let storage = JSON.parse(localStorage.getItem("userScores"));
    if (storage === null) {
      storage = [];
    }
    storage.push(userData);

    localStorage.setItem("userScores", JSON.stringify(storage));
    window.location.href = "highscores.html";
  });
}

function renderQuestion() {
  if (questionIndex > quizQuestions.length - 1) return;
  var h1 = document.createElement("h1");
  h1.textContent = quizQuestions[questionIndex].question;
  quizContainer.append(h1);

  // for loop - generate and display possible answer options for current question
  for (var i = 0; i < quizQuestions[questionIndex].answers.length; i++) {
    var btn = document.createElement("button");
    btn.textContent = quizQuestions[questionIndex].answers[i];
    quizContainer.append(btn);

    // add event listener to answer btn, and when clicked check if right or wrong; then call renderQuestion

    btn.addEventListener("click", function () {
      var messageDiv = document.createElement("div");
      if (this.textContent === quizQuestions[questionIndex].correct) {
        // Add 10 seconds and display message when answer is correct
        score += 10;
        quizContainer.innerHTML = "<p>Correct!</p>";
      } else {
        // Subtract 10 seconds and display message when answer is incorrect
        time -= 10;
        quizContainer.innerHTML =
          "<p>Incorrect answer. Ten seconds is deducted from your score.</p>";
      }
      // add container and delay for rendering next question
      quizContainer.appendChild(messageDiv);
      setTimeout(function () {
        quizContainer.innerHTML = "";
        questionIndex++;
        renderQuestion();
      }, 1000); //add 1 sec (1000ms) delay before rendering next question
    });
  }
}
