const questions = [
    {
        question: "What is the primary purpose of Microsoft Project?",
        answers: [
            { text: "Word processing", correct: false},
            { text: " Spreadsheet creation ", correct: false },
            { text: "Presentation design", correct: false },
            { text: "Project management", correct: true },
        ]
    },
    {
        question: "Which feature in Project allows you to create new tasks?",
        answers: [
            { text: " Project tab -> New Task", correct: false},
            { text: "Home tab -> New Task", correct: false },
            { text: " Insert -> Task", correct: true },
            { text: "View tab -> New Task", correct: false },
        ]
    },
    {
        question: "How do you set the start date of a task in Project?",
        answers: [
            { text: "Gantt chart -> Double-click task -> Set Start Date", correct: true },
            { text: "Task tab -> Set Start Date", correct: false },
            { text: " View tab -> Set Start Date", correct: false },
            { text: " Project tab -> Set Start Date", correct: false },
        ]
    },
    {
        question: "What is the purpose of a resource in Project?",
        answers: [
            { text: "To store project data", correct: false},
            { text: " To represent a person or equipment assigned to a task ", correct: true },
            { text: "To create relationships between tasks", correct: false },
            { text: " To format the appearance of the project", correct: false },
        ]
    },
    {
        question: "How do you change the duration of a task in Project?",
        answers: [
            { text: " Project tab -> Change Duration", correct: false},
            { text: " View tab -> Change Duration", correct: false },
            { text: "Task tab -> Change Duration ", correct: false },
            { text: "Gantt chart -> Double-click task -> Change Duration", correct: true },
        ]
    },
    {
        question: "What is the difference between a predecessor and a successor task in Project?",
        answers: [
            { text: "A successor task is a task that must be completed before a predecessor task can begin. ", correct: false},
            { text: "A predecessor task is a task that must be completed before a successor task can begin", correct: true },
            { text: "Both are the same thing", correct: false },
            { text: "Neither is used in Project.", correct: false },
        ]
    },
    {
        question: "How do you create a baseline plan in Project?",
        answers: [
            { text: "Project tab -> Create Baseline", correct: true },
            { text: "Gantt chart -> Create Baseline", correct: false },
            { text: " View tab -> Create Baseline ", correct: false },
            { text: "Task tab -> Create Baseline", correct: false },
        ]
    },
    {
        question: "What is a critical path in Project?",
        answers: [
            { text: "The shortest path through the project schedule", correct: false},
            { text: "The longest path through the project schedule", correct: true },
            { text: "A path that can be delayed without affecting the project completion date ", correct: false },
            { text: "A path that must be completed before other tasks can begin", correct: false },
        ]
    },
    {
        question: "How do you create a resource calendar in Project?",
        answers: [
            { text: " Resource tab -> Create Resource Calendar", correct: true},
            { text: " Gantt chart -> Create Resource Calendar", correct: false },
            { text: " View tab -> Create Resource Calendar ", correct: false },
            { text: "Project tab -> Create Resource Calendar", correct: false },
        ]
    },
    {
        question: "What is the purpose of the Earned Value Management (EVM) technique in Project?",
        answers: [
            { text: "To create relationships between tasks ", correct: false},
            { text: "To format the appearance of the project", correct: false },
            { text: "To measure project progress and performance", correct: true },
            { text: "To create a baseline plan", correct: false },
        ]
    }
];

const heading = document.getElementById("heading")
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    heading.innerHTML = `You are free to close the window now`
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    answerButtons.innerHTML = `Do you want to take the test again? if "yes" please click the "play again" otherwise you can close the window`
    nextButton.innerHTML = `play Again`;
    nextButton.style.display ="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();