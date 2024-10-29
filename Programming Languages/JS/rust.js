const questions = [
    {
        question: "What is the primary purpose of the match expression in Rust?",
        answers: [
            { text: "To define functions", correct: false},
            { text: "To create custom data types", correct: false },
            { text: " To perform pattern matching and execute code based on the matched pattern", correct: true },
            { text: "To handle errors and exceptions", correct: false },
        ]
    },
    {
        question: " How does Rust ensure memory safety without a garbage collector?",
        answers: [
            { text: "By using reference counting", correct: false},
            { text: "By using a mark-and-sweep algorithm", correct: false },
            { text: "By using a generational garbage collector", correct: false },
            { text: "By enforcing ownership and borrowing rules", correct: true },
        ]
    },
    {
        question: "Which of the following is not a fundamental data type in Rust?",
        answers: [
            { text: "i32", correct: false},
            { text: "f64", correct: false },
            { text: "bool", correct: false },
            { text: "String", correct: true },
        ]
    },
    {
        question: "What is the purpose of the mut keyword in Rust?",
        answers: [
            { text: "To declare mutable variables", correct: true},
            { text: "To define mutable functions", correct: false },
            { text: "To create mutable data structures", correct: false },
            { text: "To make a variable immutable", correct: false },
        ]
    },
    {
        question: "What is the primary difference between let and const in Rust?",
        answers: [
            { text: "let is used for mutable variables, while const is used for immutable variables.", correct: true },
            { text: "let can be used for both mutable and immutable variables, while const can only be used for immutable variables.", correct: false },
            { text: "let can be used for variables with any data type, while const can only be used for numeric data types.", correct: false },
            { text: "let is used for variables that can be reassigned, while const is used for variables that cannot be reassigned.", correct: false },
        ]
    },
    {
        question: "What is the purpose of the Option type in Rust?",
        answers: [
            { text: "To represent values that may or may not be present", correct: true},
            { text: "To define custom data types", correct: false },
            { text: "To handle errors and exceptions", correct: false },
            { text: "To perform pattern matching", correct: false },
        ]
    },
    {
        question: "How do you create a closure in Rust?",
        answers: [
            { text: "Using the fn keyword", correct: false},
            { text: "Using the | syntax", correct: true },
            { text: "Using the match expression", correct: false },
            { text: "Using the enum keyword", correct: false },
        ]
    },
    {
        question: "What is the primary purpose of the unsafe block in Rust?",
        answers: [
            { text: "To perform operations that are safe but might have performance implications", correct: false},
            { text: "To perform operations that are unsafe and might lead to undefined behavior", correct: true },
            { text: "To define custom data types", correct: false },
            { text: "To handle errors and exceptions", correct: false },
        ]
    },
    {
        question: "What is the primary difference between a Vec and an array in Rust?",
        answers: [
            { text: "Vec is a fixed-size collection, while array is a dynamically sized collection.", correct: false},
            { text: "Vec is a dynamically sized collection, while array is a fixed-size collection.", correct: true },
            { text: "Vec is a mutable collection, while array is an immutable collection.", correct: false },
            { text: "Vec is a generic collection, while array is not.", correct: false },
        ]
    },
    {
        question: "What is the purpose of the Result type in Rust?",
        answers: [
            { text: "To represent values that may or may not be present", correct: false},
            { text: "To define custom data types", correct: false },
            { text: "To represent either a success value or an error", correct: true },
            { text: "To handle errors and exceptions", correct: false },
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