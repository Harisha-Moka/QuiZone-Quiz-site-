const questions = [
    {
        question: "What is the correct way to declare a constant variable in C++?",
        answers: [
            { text: "const int x = 10;", correct: false},
            { text: "int const x = 10;", correct: false },
            { text: "constant int x = 10;", correct: false },
            { text: "Both A and B", correct: true },
        ]
    },
    {
        question: "Which of the following is not a valid C++ data type?",
        answers: [
            { text: "int", correct: false},
            { text: "float", correct: false },
            { text: "char", correct: false },
            { text: "boolean", correct: true },
        ]
    },
    {
        question: "What is the purpose of the #include directive in C++?",
        answers: [
            { text: "To include external libraries", correct: true },
            { text: " To define functions", correct: false },
            { text: "To declare variables", correct: false },
            { text: "To create comments", correct: false },
        ]
    },
    {
        question: "What is the output of the following C++ code? int x=5; \n x++; \n count << x<< end1;",
        answers: [
            { text: "4", correct: false},
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: false },
        ]
    },
    {
        question: "Which of the following is the correct syntax for creating a function in C++?",
        answers: [
            { text: "functionName(parameters) { ... }", correct: false},
            { text: "void functionName(parameters) { ... }", correct: true },
            { text: "functionName parameters { ... }", correct: false },
            { text: "define functionName(parameters) { ... }", correct: false },
        ]
    },
    {
        question: "What is the difference between a class and a struct in C++?",
        answers: [
            { text: " The default access specifier for members in a class is private, while in a struct it's public.", correct: true },
            { text: "There is no difference between class and struct.", correct: false },
            { text: "class can have functions, but struct cannot.", correct: false },
            { text: "struct can have functions, but class cannot.", correct: false },
        ]
    },
    {
        question: "What is the purpose of the this pointer in C++?",
        answers: [
            { text: "To refer to the current object", correct: true },
            { text: "To create a new object", correct: false },
            { text: "To delete an object", correct: false },
            { text: "To call a function", correct: false },
        ]
    },
    {
        question: "What is the output of the following C++ code? int numbers[5] = {1,2,3,4,5}; \n count << numbers[2] << end1;",
        answers: [
            { text: "1", correct: false},
            { text: "2", correct: false },
            { text: "3", correct: true },
            { text: "4", correct: false },
        ]
    },
    {
        question: "What is the correct syntax for creating a pointer in C++?",
        answers: [
            { text: "int* ptr;", correct: true },
            { text: "*int ptr;", correct: false },
            { text: "int &ptr;", correct: false },
            { text: "ptr = &int;", correct: false },
        ]
    },
    {
        question: "What is the purpose of the friend keyword in C++?",
        answers: [
            { text: "To declare a function as a friend of a class", correct: true },
            { text: "To create a new object", correct: false },
            { text: "To delete an object", correct: false },
            { text: "To call a function", correct: false },
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