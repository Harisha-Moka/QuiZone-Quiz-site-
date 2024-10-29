const questions = [
    {
        question: "What does PHP stand for?",
        answers: [
            { text: "Personal Home Page", correct: false},
            { text: "Hypertext Preprocessor", correct: true },
            { text: "Programming Hypertext Pages", correct: false },
            { text: "Preprocessor Hypertext Processor", correct: false },
        ]
    },
    {
        question: "How do you start a PHP code block?",
        answers: [
            { text: " <php>", correct: false},
            { text: "<?php", correct: true },
            { text: "<script>", correct: false },
            { text: "<style>", correct: false },
        ]
    },
    {
        question: "Which data type is used to store a whole number in PHP?",
        answers: [
            { text: "string", correct: false},
            { text: "float", correct: false },
            { text: "integer", correct: true },
            { text: "boolean", correct: false },
        ]
    },
    {
        question: "What is the correct way to declare a variable in PHP?",
        answers: [
            { text: "variable = value;", correct: false},
            { text: "$variable = value;", correct: true },
            { text: "var variable = value;", correct: false },
            { text: "declare variable = value;", correct: false },
        ]
    },
    {
        question: "Which operator is used for concatenation in PHP?",
        answers: [
            { text: "+", correct: false},
            { text: ".", correct: true },
            { text: "*", correct: false },
            { text: "/", correct: false },
        ]
    },
    {
        question: "What is the output of the following code? \n $x=5; \n$y=10; \n echo $x + $y;",
        answers: [
            { text: "510", correct: false},
            { text: "5", correct: false },
            { text: "15", correct: true },
            { text: "10", correct: false },
        ]
    },
    {
        question: "Which function is used to create an array in PHP?",
        answers: [
            { text: "array()", correct: true },
            { text: "createArray()", correct: false },
            { text: "new Array()", correct: false },
            { text: "makeArray()", correct: false },
        ]
    },
    {
        question: " How do you add an element to an array in PHP?",
        answers: [
            { text: "$array[index] = value;", correct: true },
            { text: "$array.push(value);", correct: false },
            { text: "$array.add(value);", correct: false },
            { text: "$array[value] = index;", correct: false },
        ]
    },
    {
        question: "Which function is used to check if a variable is empty in PHP?",
        answers: [
            { text: "isEmpty()", correct: false},
            { text: "isNull()", correct: false },
            { text: "isBlank()", correct: false },
            { text: "empty()", correct: true },
        ]
    },
    {
        question: "What is the correct way to include a PHP file in another PHP file?",
        answers: [
            { text: "import \"filename.php\";", correct: false},
            { text: "include \"filename.php\";", correct: false },
            { text: "require \"filename.php\";", correct: true },
            { text: " load \"filename.php\";", correct: false },
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