const questions = [
    {
        question: "What is biotechnology?",
        answers: [
            { text: "The study of living organisms and their products.", correct: false},
            { text: "The use of biological processes to solve problems.", correct: false },
            { text: "The application of biological processes to create products.", correct: false },
            { text: "All of the above.", correct: true },
        ]
    },
    {
        question: "Which of the following is a major field of biotechnology?",
        answers: [
            { text: "Medical biotechnology", correct: false},
            { text: "Agricultural biotechnology", correct: false },
            { text: "Industrial biotechnology", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "What is recombinant DNA technology?",
        answers: [
            { text: "The process of combining DNA from different organisms.", correct: false},
            { text: "The study of genetic engineering.", correct: false },
            { text: "The use of enzymes to cut and paste DNA.", correct: false },
            { text: " All of the above.", correct: true },
        ]
    },
    {
        question: "What is a transgenic organism?",
        answers: [
            { text: "An organism that has been genetically modified.", correct: true },
            { text: "An organism that has been cloned.", correct: false },
            { text: "An organism that has been naturally selected.", correct: false },
            { text: "An organism that has been artificially selected.", correct: false },
        ]
    },
    {
        question: "What is CRISPR-Cas9?",
        answers: [
            { text: "A gene editing tool.", correct: true},
            { text: "A type of DNA sequencing.", correct: false },
            { text: "A cloning technique.", correct: false },
            { text: "A genetic engineering technique.", correct: false },
        ]
    },
    {
        question: "What is the main advantage of using genetically modified crops?",
        answers: [
            { text: "They are more resistant to pests and diseases.", correct: false},
            { text: "They produce higher yields.", correct: false },
            { text: "They are more nutritious.", correct: false },
            { text: "All of the above.", correct: true },
        ]
    },
    {
        question: "What is the main concern about the use of genetically modified organisms?",
        answers: [
            { text: "They may be harmful to human health.", correct: false},
            { text: "They may harm the environment.", correct: false },
            { text: "They may reduce biodiversity.", correct: false },
            { text: " All of the above.", correct: true },
        ]
    },
    {
        question: "What is cloning?",
        answers: [
            { text: "The process of genetically modifying an organism.", correct: false},
            { text: "The process of studying the genetic code.", correct: false },
            { text: "The process of creating an identical copy of an organism.", correct: true },
            { text: "The process of selecting organisms based on their traits.", correct: false },
        ]
    },
    {
        question: "What is stem cell research?",
        answers: [
            { text: "The study of cells that are specialized.", correct: false},
            { text: "The study of cells that can differentiate into different cell types.", correct: true },
            { text: "The study of cells that are dead.", correct: false },
            { text: "The study of cells that are not dividing.", correct: false },
        ]
    },
    {
        question: "What is the potential application of biotechnology in medicine?",
        answers: [
            { text: "Development of new drugs", correct: false},
            { text: "Gene therapy", correct: false },
            { text: "Tissue engineering", correct: false },
            { text: "All of the above", correct: false },
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