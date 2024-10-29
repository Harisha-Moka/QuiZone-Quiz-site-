const questions = [
    {
        question: "What is the primary purpose of the lateinit modifier in Kotlin?",
        answers: [
            { text: "To initialize a variable later in the code", correct: true},
            { text: "To make a variable immutable", correct: false },
            { text: "To declare a nullable variable", correct: false },
            { text: "To provide default values for variables", correct: false },
        ]
    },
    {
        question: "Which of the following is a Kotlin data class?",
        answers: [
            { text: "class Person(val name: String, var age: Int)", correct: true },
            { text: "class Animal { val legs: Int }", correct: false },
            { text: "interface Vehicle { fun drive() }", correct: false },
            { text: "enum class Color { RED, GREEN, BLUE }", correct: false },
        ]
    },
    {
        question: "What is the purpose of the ?. operator in Kotlin?",
        answers: [
            { text: "To perform a type cast", correct: false},
            { text: "To invoke a function", correct: false },
            { text: "To create a new instance of an object", correct: false },
            { text: "To check if a variable is null before accessing its properties", correct: true },
        ]
    },
    {
        question: "Which of the following is a Kotlin extension function?",
        answers: [
            { text: "fun reverseString(str: String): String", correct: false},
            { text: "fun String.reverse(): String", correct: true },
            { text: "class StringExtensions { fun reverse(): String }", correct: false },
            { text: "String::reverse", correct: false },
        ]
    },
    {
        question: "What is the difference between var and val in Kotlin?",
        answers: [
            { text: "var declares mutable variables, while val declares immutable variables.", correct: true },
            { text: "var is used for functions, while val is used for properties.", correct: false },
            { text: "var is a keyword, while val is a data type.", correct: false },
            { text: "There is no difference between var and val.", correct: false },
        ]
    },
    {
        question: "What is the purpose of the when expression in Kotlin?",
        answers: [
            { text: "To define functions", correct: false},
            { text: "To create classes", correct: false },
            { text: "To perform conditional branching", correct: true },
            { text: "To declare variables", correct: false },
        ]
    },
    {
        question: "Which of the following is a Kotlin coroutine builder?",
        answers: [
            { text: "run", correct: false},
            { text: "launch", correct: false },
            { text: "async", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "What is the purpose of the companion object in Kotlin?",
        answers: [
            { text: "To create static members in a class", correct: true },
            { text: "To define a singleton object", correct: false },
            { text: "To implement interfaces", correct: false },
            { text: "To create anonymous functions", correct: false },
        ]
    },
    {
        question: " How do you declare a nullable variable in Kotlin?",
        answers: [
            { text: "By using the ! operator after the data type", correct: false},
            { text: "By using the ? operator after the data type", correct: true },
            { text: "By using the lateinit modifier", correct: false },
            { text: "By using the ?: operator", correct: false },
        ]
    },
    {
        question: "Which of the following is a Kotlin lambda expression?",
        answers: [
            { text: "fun add(a: Int, b: Int) = a + b", correct: false},
            { text: "val numbers = listOf(1, 2, 3)", correct: false },
            { text: "{ x: Int -> x * x }", correct: true },
            { text: "class Person { val name: String }", correct: false },
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