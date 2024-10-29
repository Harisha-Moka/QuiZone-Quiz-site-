const questions = [
    {
        question: "What is the correct syntax to declare a constant in C#?",
        answers: [
            { text: "const int x = 10;", correct: true },
            { text: "final int x = 10;", correct: false },
            { text: "static int x = 10;", correct: false },
            { text: "constant int x = 10;", correct: false },
        ]
    },
    {
        question: "Which keyword is used to inherit a class from another class in C#?",
        answers: [
            { text: "extends", correct: false},
            { text: "implements", correct: false },
            { text: "inherits", correct: false },
            { text: "derives", correct: true },
        ]
    },
    {
        question: "What is the output of the following C# code? \n int x =5; \n int y = x++; \n console.WriteLine(y);",
        answers: [
            { text: "4", correct: false},
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: false },
        ]
    },
    {
        question: "Which data type is used to represent a single character in C#?",
        answers: [
            { text: "char", correct: true },
            { text: "string", correct: false },
            { text: "text", correct: false },
            { text: "character", correct: false },
        ]
    },
    {
        question: " What is the purpose of the using keyword in C#?",
        answers: [
            { text: "To declare variables", correct: false},
            { text: "To define methods", correct: false },
            { text: "To create objects", correct: false },
            { text: " To manage resource disposal", correct: true },
        ]
    },
    {
        question: "Which operator is used to check if two values are equal in C#?",
        answers: [
            { text: "==", correct: true },
            { text: "=", correct: false },
            { text: "!=", correct: false },
            { text: "<>", correct: false },
        ]
    },
    {
        question: "What is the difference between a class and a struct in C#?",
        answers: [
            { text: "Classes are reference types, while structs are value types.", correct: false},
            { text: "Classes can be inherited, while structs cannot.", correct: false },
            { text: "Classes can have default constructors, while structs cannot.", correct: false },
            { text: "All of the above.", correct: true },
        ]
    },
    {
        question: "What is the purpose of the finally block in a try-catch statement?",
        answers: [
            { text: "To execute code regardless of whether an exception is thrown.", correct: true },
            { text: "To catch exceptions.", correct: false },
            { text: "To throw exceptions.", correct: false },
            { text: "To handle exceptions.", correct: false },
        ]
    },
    {
        question: "Which keyword is used to create a generic method in C#?",
        answers: [
            { text: "template", correct: true },
            { text: "generic", correct: false },
            { text: "type", correct: false },
            { text: "T", correct: false },
        ]
    },
    {
        question: "What is the output of the following C# code? \n string str = \"Hello,world \";",
        answers: [
            { text: "world!", correct: false},
            { text: "Hello,", correct: false },
            { text: "world", correct: true },
            { text: "Hello", correct: false },
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