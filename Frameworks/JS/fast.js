const questions = [
    {
        question: "What is the primary purpose of FastAPI?",
        answers: [
            { text: "A web framework for building asynchronous applications", correct: true },
            { text: "A database management system for Python", correct: false },
            { text: "A machine learning library for Python", correct: false },
            { text: "A web scraping tool for Python", correct: false },
        ]
    },
    {
        question: " Which of the following is a core feature of FastAPI that emphasizes performance and efficiency?",
        answers: [
            { text: "Asynchronous programming support", correct: true },
            { text: "Synchronous programming only", correct: false },
            { text: "Limited data validation", correct: false },
            { text: "Old-school development practices", correct: false },
        ]
    },
    {
        question: "What is the role of Pydantic in FastAPI?",
        answers: [
            { text: "It's used for asynchronous programming", correct: false},
            { text: " It's a dependency injection framework", correct: false },
            { text: "It's used for data validation and serialization", correct: true },
            { text: " It's a web server", correct: false },
        ]
    },
    {
        question: "How does FastAPI handle request and response data?",
        answers: [
            { text: "It uses a proprietary format", correct: false},
            { text: "It primarily uses JSON", correct: true },
            { text: " It only supports XML", correct: false },
            { text: "It doesn't handle data", correct: false },
        ]
    },
    {
        question: "What is the primary benefit of using FastAPI's built-in documentation system?",
        answers: [
            { text: " It's difficult to use", correct: false},
            { text: "It's not customizable", correct: false },
            { text: "It generates interactive documentation", correct: true},
            { text: "It requires manual updates", correct: false },
        ]
    },
    {
        question: "How can you handle asynchronous tasks in FastAPI?",
        answers: [
            { text: "Using the asyncio module", correct: false},
            { text: "Using background tasks", correct: true },
            { text: "Using synchronous functions", correct: false },
            { text: "There's no way to handle asynchronous tasks", correct: false },
        ]
    },
    {
        question: "What is the purpose of dependency injection in FastAPI?",
        answers: [
            { text: "To make code less reusable", correct: false},
            { text: "To make code harder to test", correct: false },
            { text: "To simplify code organization and reusability", correct: true },
            { text: "To increase complexity", correct: false },
        ]
    },
    {
        question: "How can you test FastAPI applications?",
        answers: [
            { text: "Manually testing each endpoint", correct: false},
            { text: "There's no way to test FastAPI applications", correct: false },
            { text: "Using a proprietary testing tool", correct: false },
            { text: "Using a testing framework like pytest", correct: true },
        ]
    },
    {
        question: "What is the default ASGI server used by FastAPI?",
        answers: [
            { text: "Uvicorn", correct: true },
            { text: " Gunicorn", correct: false },
            { text: "Tornado", correct: false },
            { text: "Flask", correct: false },
        ]
    },
    {
        question: "Which HTTP method is typically used to create a new resource?",
        answers: [
            { text: "GET", correct: false},
            { text: "POST", correct: true },
            { text: " PUT", correct: false },
            { text: "DELETE", correct: false },
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