const questions = [
    {
        question: "What is the correct way to declare a constant in Swift?",
        answers: [
            { text: "var", correct: false},
            { text: "let", correct: true },
            { text: "const", correct: false },
            { text: "constant", correct: false },
        ]
    },
    {
        question: "Which of the following is a value type in Swift?",
        answers: [
            { text: "String", correct: true},
            { text: "Array", correct: false },
            { text: "Class", correct: false },
            { text: "All of the above", correct: false },
        ]
    },
    {
        question: "How do you create an optional value in Swift?",
        answers: [
            { text: "By using the ? symbol after the type", correct: true},
            { text: "By using the ! symbol after the type", correct: false },
            { text: "By using the nil keyword", correct: false },
            { text: " By using the maybe keyword", correct: false },
        ]
    },
    {
        question: "What is the purpose of the guard statement in Swift?",
        answers: [
            { text: "To define a constant or variable", correct: false},
            { text: "To create a conditional statement", correct: false },
            { text: "To handle optional values", correct: false },
            { text: "To early exit from a function", correct: true },
        ]
    },
    {
        question: "Which of the following is a collection type in Swift?",
        answers: [
            { text: "Dictionary", correct: false},
            { text: "Set", correct: false },
            { text: "Array", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "What is the difference between a struct and a class in Swift?",
        answers: [
            { text: "Structs are reference types, while classes are value types.", correct: false},
            { text: "Classes can inherit from other classes, while structs cannot.", correct: true },
            { text: "Structs are always immutable, while classes can be mutable.", correct: false },
            { text: "Structs are thread-safe, while classes are not.", correct: false },
        ]
    },
    {
        question: "What is the purpose of the self keyword in Swift?",
        answers: [
            { text: "To refer to the current instance of a class or struct", correct: true},
            { text: "To define a function", correct: false },
            { text: "To create a property", correct: false },
            { text: " To call a method", correct: false },
        ]
    },
    {
        question: " How do you create a closure in Swift?",
        answers: [
            { text: "By using the func keyword", correct: false},
            { text: "By using the closure keyword", correct: false },
            { text: "By using curly braces {}", correct: true },
            { text: " By using parentheses ()", correct: false },
        ]
    },
    {
        question: "What is the output of the following Swift code? \n let numbers=[1,2,3,4,5]\nlet evenNum = numbers.filter{$0%2==0}\nprint(evenNum)",
        answers: [
            { text: "[1, 2, 3, 4, 5]", correct: false},
            { text: "[2, 4]", correct: true },
            { text: "[1, 3, 5]", correct: false },
            { text: "An error", correct: false },
        ]
    },
    {
        question: "What is the purpose of the guard let statement in Swift?",
        answers: [
            { text: "To define a constant or variable", correct: false},
            { text: "To create a conditional statement", correct: false },
            { text: "To handle optional values", correct: true },
            { text: "To early exit from a function", correct: false },
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