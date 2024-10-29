const questions = [
    {
        question: "What is the correct syntax for declaring a variable in JavaScript?",
        answers: [
            { text: "var variableName;", correct: true },
            { text: "declare variableName;", correct: false },
            { text: "variableName = value;", correct: false },
            { text: "let variableName = value;", correct: false },
        ]
    },
    {
        question: "Which data type is used to represent a sequence of characters in JavaScript?",
        answers: [
            { text: "Number", correct: false},
            { text: "Boolean", correct: false },
            { text: "String", correct: true },
            { text: "Object", correct: false },
        ]
    },
    {
        question: "What is the purpose of the typeof operator in JavaScript?",
        answers: [
            { text: "It returns the data type of a variable.", correct: true },
            { text: "It declares a new variable.", correct: false },
            { text: "It performs mathematical operations.", correct: false },
            { text: "It creates an object.", correct: false },
        ]
    },
    {
        question: "What is the output of the following code? \n let x =5; \n let y=10; \n console.log(x+y);",
        answers: [
            { text: "15", correct: true },
            { text: "510", correct: false },
            { text: "2", correct: false },
            { text: "Error", correct: false },
        ]
    },
    {
        question: "Which keyword is used to define a function in JavaScript?",
        answers: [
            { text: "define", correct: false},
            { text: "function", correct: true },
            { text: "create", correct: false },
            { text: "method", correct: false },
        ]
    },
    {
        question: "What is the purpose of the this keyword in JavaScript?",
        answers: [
            { text: "To declare a variable.", correct: false},
            { text: "To create a new object.", correct: false },
            { text: "To refer to the current object.", correct: true },
            { text: "To perform mathematical operations.", correct: false },
        ]
    },
    {
        question: "What is the output of the following code? \n console.log(typeof null); ",
        answers: [
            { text: "object", correct: true},
            { text: "null", correct: false },
            { text: "undefined", correct: false },
            { text: "string", correct: false },
        ]
    },
    {
        question: "How do you access the last element of an array in JavaScript?",
        answers: [
            { text: "array[0]", correct: false},
            { text: "array.length", correct: false },
            { text: "array[array.length - 1]", correct: true },
            { text: "array.last()", correct: false },
        ]
    },
    {
        question: "What is the purpose of the try...catch block in JavaScript?",
        answers: [
            { text: "To handle errors", correct: true },
            { text: "To define a function", correct: false },
            { text: "To create a loop", correct: false },
            { text: "To create an object", correct: false },
        ]
    },
    {
        question: "Which keyword is used to exit a loop in JavaScript?",
        answers: [
            { text: "break", correct: true },
            { text: "continue", correct: false },
            { text: "return", correct: false },
            { text: "exit", correct: false },
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