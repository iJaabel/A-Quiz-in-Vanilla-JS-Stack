const mathQuestions = [
  /**
   * add your questions here
   *
   * this is the structure of each question object
   * {
   *   question: "",
   *   answers: [
   *     { text: "", correct: true },
   *     { text: "", correct: false },
   *     { text: "", correct: false },
   *     { text: "", correct: false },
   *   ],
   * },
   *
   */

  {
    question: "What is 1 + 1?",
    answers: [
      { text: "1", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false },
      { text: "4", correct: false },
    ],
  },
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "3", correct: false },
      { text: "5", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "What is 4 * 2?",
    answers: [
      { text: "6", correct: false },
      { text: "8", correct: true },
      { text: "10", correct: false },
      { text: "12", correct: false },
    ],
  },
  {
    question: "What is 8 / 4?",
    answers: [
      { text: "2", correct: true },
      { text: "3", correct: false },
      { text: "4", correct: false },
      { text: "5", correct: false },
    ],
  },
  {
    question: "What is 8 - 4?",
    answers: [
      { text: "4", correct: true },
      { text: "3", correct: false },
      { text: "2", correct: false },
      { text: "1", correct: false },
    ],
  },
  {
    question: "What is 4 - 4?",
    answers: [
      { text: "0", correct: true },
      { text: "1", correct: false },
      { text: "2", correct: false },
      { text: "3", correct: false },
    ],
  },
]

// -----------------------------------------------
// initialize variables

const questionElement = document.getElementById("question")
const answersButton = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0
let score = 0

function startQuiz() {
  currentQuestionIndex = 0
  score = 0
  nextButton.innerHTML = "Next"
  showQuestion()
}

function showQuestion() {
  resetState()
  let currentQuestion = mathQuestions[currentQuestionIndex]
  let questionNumber = currentQuestionIndex + 1
  questionElement.innerText = `Question ${questionNumber}: ${currentQuestion.question}`

  currentQuestion.answers.forEach((answer) => {
    let button = document.createElement("button")
    button.innerText = answer.text
    button.classList.add("btn")
    answersButton.appendChild(button)

    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  // will remove all previous answers
  nextButton.style.display = "none"
  while (answersButton.firstChild) {
    answersButton.removeChild(answersButton.firstChild)
  }
}

function selectAnswer(e) {
  // checks is the selected answer is correct and adds a class
  const selectedBtn = e.target
  const isCorrect = selectedBtn.dataset.correct === "true"
  if (isCorrect) {
    selectedBtn.classList.add("correct")
    ++score
  } else {
    selectedBtn.classList.add("incorrect")
  }

  // will enable the next button
  Array.from(answersButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct")
    }
    button.disabled = true
  })
  nextButton.style.display = "block"
}

function showScore() {
  resetState()
  questionElement.innerText = `You scored ${score} out of ${mathQuestions.length}`
  nextButton.innerText = "Try Again?"
  nextButton.style.display = "block"
}

function handleNextButton() {
  ++currentQuestionIndex
  if (currentQuestionIndex < mathQuestions.length) {
    showQuestion()
  } else {
    showScore()
  }
}

// -----------------------------------------------

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < mathQuestions.length) {
    handleNextButton()
  } else {
    startQuiz()
  }
})

startQuiz()
