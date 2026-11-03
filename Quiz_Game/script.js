// DOM ELEMENTS

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const questionText = document.getElementById("question");
const answerContainer = document.getElementById("answer-container");
const currentQuestionText = document.getElementById("current-question");
const totalQuestionsText = document.getElementById("total-questions");
const scoreText = document.getElementById("score");
const finalScoreText = document.getElementById("final-score");
const maxScoreText = document.getElementById("max-score");
const resultMessageText = document.getElementById("result-message");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the main ingredient of hummus?",
    answers: [
      { text: "Chickpeas", correct: true },
      { text: "Lentils", correct: false },
      { text: "Black beans", correct: false },
      { text: "Kidney beans", correct: false },
    ],
  },
  {
    question: "Which bird is a symbol of New Zealand?",
    answers: [
      { text: "Takahe", correct: false },
      { text: "Kakapo", correct: false },
      { text: "Kiwi", correct: true },
      { text: "Weka", correct: false },
    ],
  },
  {
    question: "What do you call a baby kangaroo?",
    answers: [
      { text: "Cub", correct: false },
      { text: "Joey", correct: true },
      { text: "Pup", correct: false },
      { text: "Fawn", correct: false },
    ],
  },
  {
    question: "What is the main artery in the body called?",
    answers: [
      { text: "Aorta", correct: true },
      { text: "Vein", correct: false },
      { text: "Capillary", correct: false },
      { text: "Artery", correct: false },
    ],
  },
  {
    question: "What color is associated with envy?",
    answers: [
      { text: "Red", correct: false },
      { text: "Green", correct: true },
      { text: "Blue", correct: false },
      { text: "Yellow", correct: false },
    ],
  },
];

// Quiz state variables

let currentQuestionIndex = 0; //this starts from the very first question
let score = 0;
let answersDisabled = false; //to prevent multiple answers being selected

// Display total questions
totalQuestionsText.textContent = quizQuestions.length; //display total number of questions
maxScoreText.textContent = quizQuestions.length; //display max score

//Event Listeners

startBtn.addEventListener("click", startQuiz); //this will allow the user to start the quiz when they click the start button
restartBtn.addEventListener("click", restartQuiz); //this will allow the user to restart the quiz when they click the restart button

// START QUIZ

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  scoreText.textContent = score;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

// SHOW QUESTION

function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionText.textContent = currentQuestionIndex + 1; //display current question number

  // Update progress bar
  const progressPercentage =
    (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercentage + "%";

  // Display question
  questionText.textContent = currentQuestion.question;

  // Clear previous answers
  answerContainer.innerHTML = "";

  // Create answer buttons
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");

    button.textContent = answer.text;
    button.classList.add("answer-btn");

    //this store the correct answer in the button's dataset
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answerContainer.appendChild(button);
  });
}

//Select Answer

function selectAnswer(e) {
  if (answersDisabled) return; //this will prevent multiple answers being selected

  answersDisabled = true;

  const selectedButton = e.currentTarget;
  const correct = selectedButton.dataset.correct === "true"; //this check if the selected answer is correct

  // this highlights selected and correct answers
  Array.from(answerContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }

    button.disabled = true; //this disables all answer buttons
  });

  //Update score in the display window
  if (correct) {
    score++;
    scoreText.textContent = score;
  }

  //Move to the next question
  setTimeout(() => {
    currentQuestionIndex++;

    //to check if there are more questions or if quiz is completed
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

//Show Result

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreText.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage >= 80) {
    resultMessageText.textContent = "Excellent work!";
  } else if (percentage >= 50) {
    resultMessageText.textContent = "Good job!";
  } else if (percentage >= 30) {
    resultMessageText.textContent = "Keep Going!";
  } else {
    resultMessageText.textContent = "Try Again!";
  }
} //this shows result in the screen after completing the quiz

//Restart Quiz

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz(); ///this restarts the quiz again
}
