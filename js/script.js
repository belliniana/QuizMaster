const questions = [

    {
        question: "Qual linguagem é usada para estilizar páginas web?",
        answers: ["HTML", "JavaScript", "CSS", "Python"],
        correct: 2
    },

    {
        question: "Qual empresa criou o JavaScript?",
        answers: ["Microsoft", "Netscape", "Google", "Oracle"],
        correct: 1
    },

    {
        question: "Qual método adiciona item ao final de um array?",
        answers: ["push()", "pop()", "shift()", "filter()"],
        correct: 0
    },

    {
        question: "Qual tag cria um link?",
        answers: ["<img>", "<a>", "<div>", "<h1>"],
        correct: 1
    },

    {
        question: "O que significa DOM?",
        answers: [
            "Document Object Model",
            "Data Object Model",
            "Document Online Method",
            "Digital Object Method"
        ],
        correct: 0
    }

];

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const timerElement =
    document.getElementById("timer");

const progressElement =
    document.getElementById("progress");

const counterElement =
    document.getElementById("questionCounter");

const quizScreen =
    document.getElementById("quizScreen");

const resultScreen =
    document.getElementById("resultScreen");

const finalScore =
    document.getElementById("finalScore");

const message =
    document.getElementById("message");

const bestScoreElement =
    document.getElementById("bestScore");

const restartBtn =
    document.getElementById("restartBtn");

let currentQuestion = 0;
let score = 0;
let timeLeft = 20;
let interval;

function startTimer() {

    clearInterval(interval);

    timeLeft = 20;

    timerElement.textContent =
        `${timeLeft}s`;

    interval =
        setInterval(() => {

            timeLeft--;

            timerElement.textContent =
                `${timeLeft}s`;

            if (timeLeft <= 0) {

                nextQuestion();

            }

        }, 1000);

}

function loadQuestion() {

    const q =
        questions[currentQuestion];

    counterElement.textContent =
        `Pergunta ${currentQuestion + 1}/${questions.length}`;

    progressElement.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    questionElement.textContent =
        q.question;

    answersElement.innerHTML = "";

    q.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.classList.add(
            "answer-btn"
        );

        button.textContent =
            answer;

        button.addEventListener(
            "click",
            () => checkAnswer(index)
        );

        answersElement.appendChild(
            button
        );

    });

    startTimer();

}

function checkAnswer(index) {

    const correct =
        questions[currentQuestion]
            .correct;

    if (index === correct) {

        score++;

    }

    nextQuestion();

}

function nextQuestion() {

    currentQuestion++;

    if (
        currentQuestion <
        questions.length
    ) {

        loadQuestion();

    } else {

        finishQuiz();

    }

}

function finishQuiz() {

    clearInterval(interval);

    quizScreen.style.display =
        "none";

    resultScreen.style.display =
        "block";

    finalScore.textContent =
        `Você acertou ${score} de ${questions.length}`;

    let texto = "";

    if (score <= 2) {

        texto =
            "Continue estudando.";

    } else if (score <= 4) {

        texto =
            "Bom resultado.";

    } else {

        texto =
            "Excelente desempenho!";
    }

    message.textContent =
        texto;

    let best =
        Number(
            localStorage.getItem(
                "bestQuizScore"
            )
        ) || 0;

    if (score > best) {

        best = score;

        localStorage.setItem(
            "bestQuizScore",
            best
        );

    }

    bestScoreElement.textContent =
        `${best} pontos`;

}

restartBtn.addEventListener(
    "click",
    () => {

        currentQuestion = 0;

        score = 0;

        quizScreen.style.display =
            "block";

        resultScreen.style.display =
            "none";

        loadQuestion();

    });

loadQuestion();