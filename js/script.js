let questions = [
    {
        question: "Je suis française mais j’habite…… Canada depuis 14 ans.",
        answers: ["à", "au", "du", "en"],
        correct: 1
    },
    {
        question: "Il fait très chaud à l’intérieur et il est malheureusement…… d'ouvrir la fenêtre.",
        answers: ["grave", "sevère", "dangereux", "sérieux"],
        correct: 2
    },
    {
        question: "Pratiquez votre français…… nos collections d'exercices interactifs",
        answers: ["avec", "de", "par", "sur"],
        correct: 0
    },
    {
        question: "Je n’ai pas encore téléphoné à Anne mais je…… appellerai ce soir.",
        answers: ["l’", "la", "les", "lui"],
        correct: 0
    },
    {
        question: "Tu veux que je…… les courses avant de rentrer ?",
        answers: ["fais", "faisais", "fasse", "ferai"],
        correct: 2
    },
    {
        question: "La direction ne saurait être tenue pour…… en cas de vol.",
        answers: ["auteur", "cadre", "garant", "responsable"],
        correct: 3
    },
    {
        question: "… David Mermet, son entraîneur, la championne a réussi avec brio ce pari fou de traverser l’Atlantique à la rame.",
        answers: ["à cause de", "à travers", "en raison de ", "grâce à"],
        correct: 3
    },
    {
        question: "L’âge de la pierre taillée…… de 2 millions à 10 000 ans avant J.-C.",
        answers: ["dure", "s'écoule", "s'étend", "survit"],
        correct: 2
    },
    {
        question: "Notre émission vous propose de dresser le portrait…… du nouveau chef du gouvernement.",
        answers: ["automate", "machine", "mécanique", "robot"],
        correct: 3
    },
    {
        question: "Quelle catastrophe ! En entendant la nouvelle j’ai été…",
        answers: ["enterré", "harassé", "ratissé", "terrassé"],
        correct: 3
    },
    {
        question: "Antoine va…… Liban pour les vacances.",
        answers: ["à", "au", "du", "en"],
        correct: 1
    },
    {
        question: "Je te laisse, je dois aller à la poste, je veux…… un colis en Espagne.",
        answers: ["donner", "envoyer", "recevoir", "rendre"],
        correct: 1
    },
    {
        question: "Camille ? Je la connais…… dix ans.",
        answers: ["dans", "de", "depuis", "il y a"],
        correct: 2
    },
    {
        question: "Félix habite au 16e étage de la…… située près du bureau de poste.",
        answers: ["chambre", "cité", "maison", "tour"],
        correct: 3
    },
    {
        question: "Je suis…… par tous les transports que je prends pour aller au travail. Quand j’arrive chez moi, j’ai juste assez d’énergie pour me coucher.",
        answers: ["déçue", "fatiguée", "distraite", "surprise"],
        correct: 1
    },
    {
        question: "J’ai demandé aux collègues quelle date conviendrait le mieux pour la réunion de service mais…… que je propose, ils ne sont jamais satisfaits.",
        answers: ["où", "quel", "qui", "quoi"],
        correct: 3
    },
    {
        question: "Ne t’inquiète pas, je te téléphonerai dès que l’avion…",
        answers: ["atterrirait", "atterrisse", "aura atterri", "avait atterri"],
        correct: 2
    },
    {
        question: "On ne regardera pas la 6e chaîne ce soir ! Je déteste les émissions de télé-réalité !…… je veux bien voir le film documentaire sur la 2e.",
        answers: ["En effet", "En revanche", "Néanmoins", "Or,"],
        correct: 1
    },
    {
        question: "Si ma sœur ne…… pas systématiquement à la légère, elle n’aurait pas tant de défis à relever.",
        answers: ["s'engage", "s'engageait", "s'est engagée", "s'était engagée"],
        correct: 1
    },
    {
        question: "Je suis inquiète de l’…… qu’a Jason pour ce groupe, ça tient du fanatisme.",
        answers: ["accaparement", "admiration", "extase", "inspiration"],
        correct: 1
    },
];

const startButton = document.getElementById("start-quiz");
const quizPage = document.getElementById("quiz-page");
const mainPage = document.getElementById("main-page");
const quizResult = document.getElementById("quiz-result");
const nextButton = document.getElementById("next-question");
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const answerButtons = document.querySelectorAll(".answer");
const scoreDisplay = document.getElementById("score");
const lastscoreDisplay = document.getElementById("last-score-display");
const quizScoreDisplay = document.getElementById("quiz-score")
const levelDisplay = document.querySelector("#level");
const restartButton = document.querySelector(".quiz-restart");
const returnMainButton = document.querySelector(".quiz-return-main");
let score = 0;
let questionIndex = 0;
let timer;
let timeLeft = 20;
let correctAnswers = [];

const checkIcon = '<div class="tick icon"> <i class="fa-regular fa-circle-check"></i></div>';
const crossIcon = '<div class="cross icon"> <i class="fa-regular fa-circle-xmark"></i></div>';


// function to start quiz 
function startQuiz() {
    correctAnswers = [];
    shuffleQuestions();
    mainPage.classList.add("hidden");
    quizPage.classList.remove("hidden");
    showQuestion();
}

// Function to shuffle the questions
function shuffleQuestions() {
    questions = questions.sort(() => Math.random() - 0.5);
}

// Function to get the level based on the score
function getLevel(score) {
    if (score <= 2) return "A1";
    else if (score <= 4) return "A2";
    else if (score <= 6) return "B1";
    else if (score <= 8) return "B2";
    else if (score === 9) return "C1";
    else return "C2";
}

// Function to save the score in local storage
function saveScore(score) {
    localStorage.setItem("quizScore", score);
}

// Function to load the saved score from local storage
function loadScore() {
    const savedScore = localStorage.getItem("quizScore");
    if (savedScore !== null) {
        lastscoreDisplay.innerText = `Last Score: ${savedScore} / 10`;
        document.getElementById('main-page').appendChild(LastscoreDisplay);
    }
}

// function to launch timer 
function startTimer() {
    timeLeft = 20; // reset timer
    document.getElementById("timer").lastChild.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").lastChild.textContent = timeLeft;
        if (timeLeft <= 0) {
            stopTimer();
            showCorrectAnswer();
        }
    }, 1000);
}

//function to stop timer 
function stopTimer() {
    clearInterval(timer);
}
// function to show correct answer after timer expire
function showCorrectAnswer() {
    const correct = questions[questionIndex].correct;
    const correctAnswer = answerButtons[correct];
    correctAnswer.classList.add("correct");
    correctAnswer.insertAdjacentHTML("beforeend", checkIcon);
    answerButtons.forEach(btn => btn.disabled = true); // disable buttons
    nextButton.classList.toggle("hidden")
}

// function to show question
function showQuestion() {
    const currentQuestion = questions[questionIndex];
    questionText.textContent = currentQuestion.question;
    questionNumber.textContent = `${questionIndex + 1}/10`;
    answerButtons.forEach((btn, index) => {
        btn.textContent = currentQuestion.answers[index];
        // reset button states
        btn.disabled = false;
        btn.classList.remove("correct", "incorrect");
        // select answer event listener
        btn.onclick = () => {
            checkAnswer(index); // check answer
            stopTimer() // stop timer after selecting answer
        }
    });

    startTimer();
}

// function for checking selected answer (correct or incorrect)
function checkAnswer(selected) {
    const correct = questions[questionIndex].correct; // index of correct answer in array
    const selectedBtn = answerButtons[selected]; // selected button DOM element
    const correctAnswer = answerButtons[correct]; // correct button answer DOM
    if (selected === correct) {
        correctAnswers.push(questionIndex+1);
        selectedBtn.classList.add("correct");
        selectedBtn.insertAdjacentHTML("beforeend", checkIcon);
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
        selectedBtn.insertAdjacentHTML("beforeend", crossIcon);
        // Mark correct answer if the selected is wrong
        setTimeout(() => {
            correctAnswer.classList.add("correct");
            correctAnswer.insertAdjacentHTML("beforeend", checkIcon);
        }, 1000);
    }
    scoreDisplay.textContent = `Score : ${score}`; // update score
    answerButtons.forEach(btn => btn.disabled = true); // disable buttons
    nextButton.classList.remove("hidden"); // show next question button
}

// function for next question event listener
function nextQuestion() {
    questionIndex++;
    if (questionIndex < 10) {
        nextButton.classList.add("hidden");
        showQuestion();
    } else {
        endQuiz();
    }
}

// Function to update question-item styles if answered correctly
function markCorrectAnswers() {
    const questionItems = document.querySelectorAll('.score-grid .question-item');
    questionItems.forEach((item, index) => {
        if (correctAnswers.includes(index + 1)) {
            item.classList.add('correct-answer');
        }
    });
}

// Function to restart the quiz
function restartQuiz() {
    score = 0;
    questionIndex = 0;
    quizResult.classList.add("hidden");
    quizPage.classList.remove("hidden");
}

// Function to show final score and level
function endQuiz() {
    quizPage.classList.add("hidden");
    quizResult.classList.remove("hidden");
    quizScoreDisplay.textContent = score;
    const level = getLevel(score);
    levelDisplay.textContent = `${level}`;
    markCorrectAnswers(correctAnswers);
    saveScore(score);
}

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);
returnMainButton.addEventListener("click", () => {
    quizResult.classList.add("hidden");
    mainPage.classList.remove("hidden");
    loadScore();
});
document.addEventListener("DOMContentLoaded",loadScore());