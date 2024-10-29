const questions = [
    {
        question: "What is the correct way to define a function in Python?",
        answers: [
            { text: "def function_name():", correct: true },
            { text: "function function_name():", correct: false },
            { text: "create function function_name():", correct: false },
            { text: "define function function_name():", correct: false },
        ]
    },
    {
        question: "Which data type is used to represent a sequence of characters in Python?",
        answers: [
            { text: "Integer", correct: false},
            { text: "Float", correct: false },
            { text: "String", correct: true },
            { text: " Boolean", correct: false },
        ]
    },
    {
        question: "What is the output of the following code? \n x=5 \n y=10 \n print(x+y)",
        answers: [
            { text: "15", correct: true },
            { text: "5", correct: false },
            { text: "10", correct: false },
            { text: "2", correct: false },
        ]
    },
    {
        question: "Which operator is used for exponentiation in Python?",
        answers: [
            { text: "^", correct: false},
            { text: "//", correct: false },
            { text: "****", correct: true },
            { text: "%", correct: false },
        ]
    },
    {
        question: "What is the purpose of the break statement in a loop?",
        answers: [
            { text: "To continue to the next iteration.", correct: false},
            { text: "To exit the loop immediately.", correct: true },
            { text: "To define a block of code.", correct: false },
            { text: "To create a loop.", correct: false },
        ]
    },
    {
        question: "Which data structure is used to store unordered, unique elements in Python?",
        answers: [
            { text: "List", correct: false},
            { text: "Tuple", correct: false },
            { text: "Dictionary", correct: false },
            { text: "Set", correct: true },
        ]
    },
    {
        question: "What is the output of the following code? \n my_list=[1,2,3]\nmy_list.append(4)\nprint(my_list)",
        answers: [
            { text: "[1, 2, 3]", correct: false},
            { text: "[4, 1, 2, 3]", correct: false },
            { text: "[1, 2, 3, 4]", correct: true },
            { text: "An error occurs.", correct: false },
        ]
    },
    {
        question: "Which keyword is used to define a class in Python?",
        answers: [
            { text: "class", correct: true },
            { text: "define", correct: false },
            { text: "create", correct: false },
            { text: "new", correct: false },
        ]
    },
    {
        question: "What is the output of the following code? \n def greet(name): \n \t\t print(\"Hello, \" + name + \"!\" \n\n greet(\"Alice\")",
        answers: [
            { text: "Hello, Alice!", correct: true},
            { text: "An error occurs.", correct: false },
            { text: "Hello,", correct: false },
            { text: "Alice!", correct: false },
        ]
    },
    {
        question: "What is the purpose of the self parameter in a Python class method?",
        answers: [
            { text: "To refer to the current instance of the class.", correct: true },
            { text: "To define the class name.", correct: false },
            { text: "To create a new instance of the class.", correct: false },
            { text: "To return the class name.", correct: false },
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