//DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const questionText = document.getElementById("question");
const answerContainer = document.getElementById("answer-container");
const currentQuestionText = document.getElementById("current-question");
const totalQuestionsText = document.getElementById("total-questions");
const scoreText = document.getElementById("score");
const finalScoreText = document.getElementById("final-score");
const maxScoreText = document.getElementById("max-score");
const resultMessageText = document.getElementById("result-message");
const resultButton = document.getElementById("result-btn");
const progressBar = document.getElementById("progress");
const restartBtn = document.getElementById("restart-btn");

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

//Quiz State Vars
let currentQuestionIndex = 0; //starting from the very first question
let score = 0;
let answersDisabled = false; //to prevent multiple answers being selected

totalQuestionsText.textContent = quizQuestions.length; //display total number of questions
//maxScoreText.textContent = quizQuestions.length; //display max score

//Event Listeners

startBtn.addEventListener("click", startQuiz); //this will allow the user to start the quiz when they click the start button
restartBtn.addEventListener("click", restartQuiz); //this will allow the user to restart the quiz when they click the restart button

function startQuiz() {
  //reset vars
  currentQuestionIndex = 0;
  score = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  //reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionText.textContent = currentQuestionIndex + 1; //display current question number

  const progressPercentage =
    ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  progressBar.style.width = `${progressPercentage}%`;

  questionText.textContent = currentQuestion.question;

  answerContainer.innerHTML = ""; //clear previous answers

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.addEventListener("click", () => selectAnswer(answer));
    answerContainer.appendChild(button);
  });
}

function restartQuiz() {
  console.log("Quiz restarted");
}
