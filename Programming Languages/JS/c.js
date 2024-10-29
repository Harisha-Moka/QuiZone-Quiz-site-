const questions = [
    {
        question: "What is the correct syntax for declaring a pointer variable in C?",
        answers: [
            { text: " int* ptr;", correct: true },
            { text: "*int ptr;", correct: false },
            { text: "int ptr*;", correct: false },
            { text: " int ptr;", correct: false },
        ]
    },
    {
        question: "Which of the following is not a valid data type in C?",
        answers: [
            { text: "float", correct: false},
            { text: "char", correct: false },
            { text: "boolean", correct: true },
            { text: " double", correct: false },
        ]
    },
    {
        question: "What is the purpose of the #include directive in C?",
        answers: [
            { text: "To define a new data type", correct: false},
            { text: " To include external files into the current program", correct: true },
            { text: "To declare a function", correct: false },
            { text: "To create a loop", correct: false },
        ]
    },
    {
        question: "Which operator is used to access the value stored at a memory address pointed to by a pointer?",
        answers: [
            { text: "&", correct: false},
            { text: "*", correct: true },
            { text: "->", correct: false },
            { text: "[]", correct: false },
        ]
    },
    {
        question: "What is the output of the following C code? \n int x = 5; \n printf(\"%d\", x++);",
        answers: [
            { text: "5", correct: true},
            { text: "6", correct: false },
            { text: "4", correct: false },
            { text: "0", correct: false },
        ]
    },
    {
        question: "Which keyword is used to define a constant in C?",
        answers: [
            { text: "const", correct: true},
            { text: "static", correct: false },
            { text: "volatile", correct: false },
            { text: "extern", correct: false },
        ]
    },
    {
        question: "What is the difference between malloc and calloc in C?",
        answers: [
            { text: "malloc initializes memory to zero, while calloc doesn't.", correct: false},
            { text: "calloc initializes memory to zero, while malloc doesn't.", correct: true },
            { text: " Both initialize memory to zero.", correct: false },
            { text: "Both don't initialize memory to zero.", correct: false },
        ]
    },
    {
        question: "Which function is used to read a character from the keyboard in C?",
        answers: [
            { text: "getchar()", correct: true },
            { text: "putchar()", correct: false },
            { text: "scanf()", correct: false },
            { text: "printf()", correct: false },
        ]
    },
    {
        question: "What is the purpose of the break statement in a loop?",
        answers: [
            { text: " To continue to the next iteration of the loop", correct: false},
            { text: "To exit the loop immediately ", correct: true },
            { text: "To declare a new variable", correct: false },
            { text: "To call a function", correct: false },
        ]
    },
    {
        question: "Which data type is used to store a string in C?",
        answers: [
            { text: "char", correct: false},
            { text: "string", correct: false },
            { text: "array of char", correct: true },
            { text: "struct", correct: false },
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