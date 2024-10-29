const questions = [
    {
        question: "What is the correct syntax to declare a variable named \"age\" of type int in Java?",
        answers: [
            { text: "int age = 25;", correct: true },
            { text: " age int = 25;", correct: false },
            { text: " 25 age int;", correct: false },
            { text: " int 25 age;", correct: false },
        ]
    },
    {
        question: "Which keyword is used to define a constant variable in Java?",
        answers: [
            { text: " final", correct: true},
            { text: "const", correct: false },
            { text: "static", correct: false },
            { text: "constant", correct: false },
        ]
    },
    {
        question: "What is the output of the following code snippet? \n System.out.println(\"Hello, World!\");",
        answers: [
            { text: " Hello, World!", correct: true},
            { text: "\"Hello, World!\"", correct: false },
            { text: "System.out.println(\"Hello, World!\");", correct: false },
            { text: "Error", correct: false },
        ]
    },
    {
        question: "Which of the following data types is used to store a decimal number in Java?",
        answers: [
            { text: "int", correct: false},
            { text: "char", correct: false },
            { text: "boolen", correct: false },
            { text: "double", correct: true },
        ]
    },
    {
        question: "What is the purpose of the main method in a Java program?",
        answers: [
            { text: "It is the entry point of the program.", correct: true},
            { text: "It is used to declare variables.", correct: false },
            { text: "It is used to define classes.", correct: false },
            { text: "It is used to create objects.", correct: false },
        ]
    },
    {
        question: "Which operator is used for concatenation in Java?",
        answers: [
            { text: "*", correct: false},
            { text: "-", correct: false },
            { text: "+", correct: true },
            { text: "/", correct: false },
        ]
    },
    {
        question: "What is the correct syntax to create an object of a class named Person in Java?",
        answers: [
            { text: "Person person = new Person();", correct: true},
            { text: "Person person = Person();", correct: false },
            { text: "new Person person;", correct: false },
            { text: "Person person = new Person;", correct: false },
        ]
    },
    {
        question: "What is the keyword used to inherit properties from a parent class to a child class in Java?",
        answers: [
            { text: "implements", correct: false},
            { text: "extends", correct: true },
            { text: "inherits", correct: false },
            { text: "super", correct: false },
        ]
    },
    {
        question: "Which loop is used to iterate through elements of an array in Java?",
        answers: [
            { text: "for loop", correct: false},
            { text: "while loop", correct: false },
            { text: "do-while loop", correct: false },
            { text: "for-each loop", correct: true },
        ]
    },
    {
        question: "What is the purpose of the try-catch block in Java?",
        answers: [
            { text: "To define methods", correct: false},
            { text: "To handle exceptions", correct: true },
            { text: "To create objects", correct: false },
            { text: "To declare variables", correct: false },
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