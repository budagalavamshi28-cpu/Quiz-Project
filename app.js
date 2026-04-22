let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    let q = questions[currentQuestion];

    // Show question
    document.getElementById("question").innerText = q.question;

    // Show options
    let optionsHTML = "";
    q.options.forEach(option => {
       optionsHTML += `<button onclick="selectAnswer('${option}', this)">${option}</button>`;
    });

    document.getElementById("options").innerHTML = optionsHTML;
}

function selectAnswer(selected, element) {
    let correct = questions[currentQuestion].answer;

    // Remove previous selection
    let buttons = document.querySelectorAll("#options button");
    buttons.forEach(btn => btn.style.backgroundColor = "");

    // Highlight selected
    element.style.backgroundColor = "#0d6efd";
    element.style.color = "white";

    if (selected === correct) {
        score++;
    }
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion(document.getElementById("progress").innerText =
    `Question ${currentQuestion + 1} / ${questions.length}`);
    } else {
        // Save score and go to result page
        localStorage.setItem("score", score);
        window.location.href = "result.html";
    }
}

// Load first question when page opens
loadQuestion();