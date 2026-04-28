let currentQuestion = 0;
let score = 0;

let timeLeft = 30;
let timerInterval;
const questions = [
    {

        question: "1. What is the capital of India? ",
        options: ["A) Mumbai", "B) New Delhi", "C) Kolkata", "D) Chennai"],
        answer: "B) New Delhi",
        selected: false
    },
    {
        question: "2. Which is the largest state in India",
        options: ["A) Maharashtra", "B) Uttar Pradesh", "C) Rajasthan", "D) Madhya Pradesh"],
        answer: "C) Rajasthan",
        selected: false
    },
    {
        question: "3. Which festival is known as the festival of Lights?",
        options: ["A) Holi", "B) Eid", "C) Diwali", "D) Krishna"],
        answer: "C) Diwali",
        selected: false
    }
];
// 🔥 TIMER FUNCTION
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 30;

    const text = document.getElementById("timerText");
    const circle = document.getElementById("circleTimer");

    const totalTime = 30;

    timerInterval = setInterval(() => {
        timeLeft--;

        text.innerText = timeLeft;

        //  circle animation
        let progress = ((totalTime - timeLeft) / totalTime) * 360;
        circle.style.background = `conic-gradient(#5a4bff ${progress}deg, #e6e6e6 ${progress}deg)`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    let q = questions[currentQuestion];

    // Show question
    document.getElementById("question").innerText = q.question;

    // Show options (Bootstrap buttons)
    let optionsHTML = "";
    q.options.forEach(option => {
        //option == null fire alert
        optionsHTML += `<button class="btn btn-outline-primary w-100 text-start mb-2" onclick="selectAnswer('${option}', this)">${option}</button>`;
    });

    document.getElementById("options").innerHTML = optionsHTML;

    const progressBar = document.getElementById("progressBar");
    const progressContainer = document.getElementById("progressContainer");

    // Ensure value stays between 0 and 100
    progressPercent = Math.round(((currentQuestion + 1) / questions.length) * 100);

    // Update width (visual bar)
    progressBar.style.width = progressPercent + "%";

    // Update text inside bar
    progressBar.textContent = progressPercent + "%";

    // Update accessibility attribute
    progressContainer.setAttribute("aria-valuenow", progressPercent);



    // // 🔥 START TIMER EVERY QUESTION
    startTimer();
}

function selectAnswer(selected, element) {
    questions[currentQuestion].selected = true;
    let correct = questions[currentQuestion].answer;

    // Remove previous selection
    let buttons = document.querySelectorAll("#options button");
    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    // Highlight selected (Bootstrap way)
    element.classList.add("active");

    if (selected === correct) {
        score++;
    }
}

function nextQuestion() {

    clearInterval(timerInterval); // 🔥 stop timer

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        localStorage.setItem("score", score);
        window.location.href = "result.html";
    }
}

// Load first question
loadQuestion();