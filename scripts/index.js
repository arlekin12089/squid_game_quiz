const questions = [
  {
    question: "Which US President wrote his own story about Sherlock Holmes?",
    type: "radiobutton",
    answers: [
      { text: "John F. Kennedy", isCorrect: false },
      { text: "Franklin Roosevelt", isCorrect: true },
      { text: "Ronald Reagan", isCorrect: false }
    ]
  },
  {
    question:
      "What tax was imposed in the 12th century in England to force men to go to war?",
    type: "radiobutton",
    answers: [
      { text: "Tax on loitering", isCorrect: false },
      { text: "Tax on cowardice", isCorrect: true },
      { text: "Tax on lack of boots", isCorrect: false }
    ]
  },
  {
    question: "Tourists coming to Mallorca are required to pay tax ...",
    type: "radiobutton",
    answers: [
      { text: "For swimming trunks", isCorrect: false },
      { text: "For palms", isCorrect: false },
      { text: "For the sun", isCorrect: true }
    ]
  },
  {
    question: "What is the largest cat on the planet?",
    type: "radiobutton",
    answers: [
      { text: "Tiger", isCorrect: true },
      { text: "Cheetah", isCorrect: false },
      { text: "Leo", isCorrect: false }
    ]
  },
  {
    question: "What is the largest planet in the solar system?",
    type: "radiobutton",
    answers: [
      { text: "Jupiter", isCorrect: true },
      { text: "Saturn", isCorrect: false },
      { text: "Neptune", isCorrect: false }
    ]
  },
  {
    question: "Which star is closest to Earth?",
    type: "radiobutton",
    answers: [
      { text: "North Star", isCorrect: false },
      { text: "Sirius", isCorrect: false },
      { text: "Sun", isCorrect: true }
    ]
  },
  {
    question: "What trees grow from acorns?",
    type: "radiobutton",
    answers: [
      { text: "Oak", isCorrect: true },
      { text: "Maple", isCorrect: false },
      { text: "Walnut", isCorrect: false }
    ]
  },
  {
    question: "How many colors are in a rainbow?",
    type: "radiobutton",
    answers: [
      { text: 10, isCorrect: false },
      { text: 8, isCorrect: false },
      { text: 7, isCorrect: true }
    ]
  },
  {
    question: "What is the hardest substance in our body?",
    type: "radiobutton",
    answers: [
      { text: "Bones", isCorrect: false },
      { text: "Teeth", isCorrect: true },
      { text: "Hair", isCorrect: false }
    ]
  },
  {
    question: "What animal is a mammal?",
    type: "checkbox",
    answers: [
      { text: "Horse", isCorrect: true },
      { text: "Whale", isCorrect: true },
      { text: "Varan", isCorrect: false }
    ]
  }
];

let allAnswers = [];

const welcomeScreen = document.querySelector("#welcome_container");
const startButton = document.querySelector("#welcome_start_button");

const questionScreen = document.querySelector("#question_container");
const questionTitleContainer = document.querySelector("#question_title");
const questionAnswersContainer = document.querySelector(
  "#question_answer_options"
);
const nextButton = document.querySelector("#question_button_next");
const resetButton = document.querySelector("#question_button_reset");
const errorMessage = document.querySelector("#question_error");

const answersScreen = document.querySelector("#answers_container");
const startOverButton = document.querySelector("#answers_button_reset");
const scoreLabel = document.querySelector("#answers_score");
const answersContent = document.querySelector("#answers_content");

const screens = [welcomeScreen, questionScreen, answersScreen];
const SCREEN_WELCOME = 0;
const SCREEN_QUESTION = 1;
const SCREEN_ANSWERS = 2;

function showScreen(screenIndex) {
  screens.forEach((screen, index) => {
    if (screenIndex === index) {
      screen.hidden = false;
    } else {
      screen.hidden = true;
    }
  });
}

function startQuiz() {
  showScreen(SCREEN_QUESTION);
  // Show first question
  showQuestion(0);
}

let currentQuestionIndex = 0;
function showQuestion(questionIndex) {
  // Save current question index to be used by Next button event listener
  currentQuestionIndex = questionIndex;
  // Get current question object
  let question = questions[questionIndex];
  // Set question title in DOM
  questionTitleContainer.textContent = question.question;
  // Create HTML string with answers
  let answersHtml = "";
  question.answers.forEach((answer, answerIndex) => {
    answersHtml += createAnswerOptionHtml(
      question.type,
      answer.text,
      answerIndex
    );
  });
  // Add answers HTML to container's DOM
  questionAnswersContainer.innerHTML = answersHtml;

  // Set next button text
  if (questionIndex === questions.length - 1) {
    nextButton.textContent = "Show answers";
  } else {
    nextButton.textContent = "Next";
  }
}

function createAnswerOptionHtml(type, text, answerIndex) {
  if (type === "radiobutton") {
    return `
    <div class="label_cover">
      <input type="radio" name="answer" id="${answerIndex}">
      <label for="${answerIndex}" class="label_radio">${text}</label>
    </div>
   `;
  } else {
    return `
    <div class="label_cover">
      <input type="checkbox" name="answer" id="${answerIndex}">
      <label for="${answerIndex}" class="label_checkbox">${text}</label>
    </div>`;
  }
}

function getAnswersFromInputs(answerInputs) {
  let answers = [];
  answerInputs.forEach((input) => {
    answers.push(input.checked === true);
  });
  return answers;
}

function showResults() {
  showScreen(SCREEN_ANSWERS);

  let score = 0;
  let resultsHtml = "";
  questions.forEach((question, questionIndex) => {
    // Take answers to current question from global answers array
    let questionAnswers = allAnswers[questionIndex];

    // Check if answer is correct and increase score if it is.
    let isCorrect = question.answers.every((answer, answerIndex) => {
      return answer.isCorrect === questionAnswers[answerIndex];
    });
    if (isCorrect) {
      score++;
    }

    // Create HTML with question and answers and add it to results content container
    resultsHtml += createResultsHtml(question, questionAnswers);
  });
  answersContent.innerHTML = resultsHtml;

  let scoreColor;
  if (score > 0.75 * questions.length) {
    scoreColor = "green";
  } else if (score > 0.5 * questions.length) {
    scoreColor = "orange";
  } else {
    scoreColor = "red";
  }
  scoreLabel.textContent = `Correct answers: ${score}/${questions.length}`;
  scoreLabel.style.color = scoreColor;
}

function createResultsHtml(question, userAnswers) {
  let result = `<h3>${question.question}</h3>
  <ul>
  `;
  question.answers.forEach((answer, index) => {
    let isChecked = userAnswers[index];
    let isCorrect = answer.isCorrect;
    let color = "black";
    if (isChecked) {
      if (isCorrect) {
        color = "green";
      } else {
        color = "red";
      }
    }
    result += `<li style="color: ${color}">${answer.text}</li>`;
  });
  result += `</ul>`;

  return result;
}

startButton.addEventListener("click", () => {
  startQuiz();
});

resetButton.addEventListener("click", () => {
  startQuiz();
});

startOverButton.addEventListener("click", () => {
  startQuiz();
});

nextButton.addEventListener("click", () => {
  // Get input elements from DOM
  let answerInputs = questionAnswersContainer.querySelectorAll(
    "[name='answer']"
  );
  // Read their states as answers like [true, false, false].
  let currentAnswers = getAnswersFromInputs(answerInputs);
  // Check if at least one answer is true (one option selected)
  let hasCheckedOptions = currentAnswers.some((element) => element);
  if (!hasCheckedOptions) {
    // If not, show error and return immediately
    errorMessage.style.opacity = "1";
    return;
  }
  // If answer is selected, hide error message (it might be still shown after previous try)
  errorMessage.style.opacity = "0";
  // And save our answers in the global answer array
  allAnswers[currentQuestionIndex] = currentAnswers;

  // Show next screen if we have answered last question
  if (currentQuestionIndex === questions.length - 1) {
    showResults();
  } else {
    // Or Show next question if there are more questions
    showQuestion(currentQuestionIndex + 1);
  }
});

showScreen(SCREEN_WELCOME);

//Change mode
const mode = document.getElementById("mode");

mode.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});
