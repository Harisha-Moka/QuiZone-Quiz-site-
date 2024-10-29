const questions = [
    {
        question: "What is the primary difference between a class and an object in Ruby?",
        answers: [
            { text: "Classes are blueprints for objects, while objects are instances of classes.", correct: true},
            { text: "Classes are instances of objects, while objects are blueprints for classes.", correct: false },
            { text: "There is no difference between classes and objects in Ruby.", correct: false },
            { text: "Classes are immutable, while objects are mutable.", correct: false },
        ]
    },
    {
        question: "Which of the following is a valid way to define a method in Ruby?",
        answers: [
            { text: "def method_name() end", correct: true },
            { text: "method method_name() end", correct: false },
            { text: "function method_name() end", correct: false },
            { text: "procedure method_name() end", correct: false },
        ]
    },
    {
        question: "What is the purpose of the self keyword in Ruby?",
        answers: [
            { text: "To refer to the current object.", correct: true },
            { text: "To define a class.", correct: false },
            { text: "To call a method.", correct: false },
            { text: "To create a new object.", correct: false },
        ]
    },
    {
        question: "What is the result of the following Ruby expression: 10.times { puts \"Hello\" }?",
        answers: [
            { text: "It prints \"Hello\" 10 times.", correct: true },
            { text: " It prints \"Hello\" once.", correct: false },
            { text: "It raises an error.", correct: false },
            { text: "It does nothing.", correct: false },
        ]
    },
    {
        question: " Which data structure in Ruby is used to store key-value pairs?",
        answers: [
            { text: "Array", correct: false},
            { text: "Hash", correct: true },
            { text: "String", correct: false },
            { text: "Integer", correct: false },
        ]
    },
    {
        question: "How do you check if a variable is nil in Ruby?",
        answers: [
            { text: "if variable == nil", correct: false},
            { text: "if variable.nil?", correct: true },
            { text: "if variable is nil", correct: false },
            { text: "if variable != nil", correct: false },
        ]
    },
    {
        question: "What is the purpose of the each method in Ruby?",
        answers: [
            { text: "To iterate over elements of an array or hash.", correct: true },
            { text: "To create a new array.", correct: false },
            { text: "To check if an element exists in an array or hash.", correct: false },
            { text: "To modify elements of an array or hash.", correct: false },
        ]
    },
    {
        question: "What is the result of the following Ruby expression: [1, 2, 3].map { |x| x * 2 }?",
        answers: [
            { text: "[2, 4, 6]", correct: true },
            { text: "[1, 2, 3]", correct: false },
            { text: "[1, 4, 9]", correct: false },
            { text: "An error", correct: false },
        ]
    },
    {
        question: "How do you define a class in Ruby?",
        answers: [
            { text: "class MyClass end", correct: true},
            { text: "define MyClass end", correct: false },
            { text: "create MyClass end", correct: false },
            { text: "new MyClass end", correct: false },
        ]
    },
    {
        question: "What is the purpose of the initialize method in a Ruby class?",
        answers: [
            { text: "To define the class name.", correct: false},
            { text: "To create a new instance of the class.", correct: false },
            { text: "To initialize instance variables of the class.", correct: true },
            { text: " To call other methods in the class.", correct: false },
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