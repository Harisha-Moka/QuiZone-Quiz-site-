const questions = [
    {
        question: "What is Flask?",
        answers: [
            { text: " A Python IDE", correct: false},
            { text: "A Python package manager", correct: false },
            { text: " A Python web framework", correct: true },
            { text: "A Python database library", correct: false },
        ]
    },
    {
        question: "How do you create a basic Flask app?",
        answers: [
            { text: "import flask", correct: false},
            { text: "pip install flask", correct: false },
            { text: "from flask import Flask", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "What is the purpose of the @app.route() decorator?",
        answers: [
            { text: "Defines the URL routes for a Flask app", correct: true },
            { text: "Handles database interactions", correct: false },
            { text: "Renders HTML templates", correct: false },
            { text: "Manages user sessions", correct: false },
        ]
    },
    {
        question: "How do you pass variables to a Flask template?",
        answers: [
            { text: " Using the render_template() function", correct: false},
            { text: "Using the {{ variable_name }} syntax in the template", correct: true },
            { text: "Using the request.args object", correct: false },
            { text: " Using the session object", correct: false },
        ]
    },
    {
        question: "What is the default HTTP method for a Flask route?",
        answers: [
            { text: "GET", correct: true },
            { text: "POST", correct: false },
            { text: "PUT", correct: false },
            { text: " DELETE", correct: false },
        ]
    },
    {
        question: "How do you handle POST requests in Flask?",
        answers: [
            { text: "Using the request.method attribute", correct: false},
            { text: "Using the request.form object", correct: false },
            { text: "Using the request.args object", correct: false },
            { text: "Both A and B", correct: true },
        ]
    },
    {
        question: "What is Flask-SQLAlchemy used for?",
        answers: [
            { text: "Creating and managing databases", correct: true },
            { text: "Handling user authentication", correct: false },
            { text: " Rendering HTML templates", correct: false },
            { text: "Sending emails", correct: false },
        ]
    },
    {
        question: "How do you create a simple form in Flask using WTForms?",
        answers: [
            { text: "Using the Form class", correct: false},
            { text: "Using the TextField class", correct: false },
            { text: " Using the SubmitField class", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "What is the purpose of the app.run() method?",
        answers: [
            { text: "Starts the Flask development server", correct: true },
            { text: "Handles database connections", correct: false },
            { text: "Renders HTML templates", correct: false },
            { text: "Manages user sessions", correct: false },
        ]
    },
    {
        question: "How do you create a custom error page in Flask?",
        answers: [
            { text: "Using the redirect() function", correct: false},
            { text: "Using the abort() function", correct: false },
            { text: "Using the @app.errorhandler() decorator", correct: true },
            { text: "Using the url_for() function", correct: false },
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