const questions = [
    {
        question: "What is the primary function of Workday Cloud?",
        answers: [
            { text: "Human Capital Management (HCM)", correct: true },
            { text: " Enterprise Resource Planning (ERP)", correct: false },
            { text: "Customer Relationship Management (CRM)", correct: false },
            { text: " IT Service Management (ITSM)", correct: false },
        ]
    },
    {
        question: " Which Workday module is used for managing employee data and records?",
        answers: [
            { text: "Core HCM", correct: true },
            { text: "Talent Acquisition", correct: false },
            { text: "Payroll", correct: false },
            { text: " Time Tracking", correct: false },
        ]  
    },
    {
        question: "What is the purpose of a Workday worker?",
        answers: [
            { text: " To represent an employee or contractor", correct: true },
            { text: "To track time and attendance", correct: false },
            { text: " To manage payroll", correct: false },
            { text: "To manage benefits", correct: false },
        ]  
    },
    {
        question: "Which Workday module is used for managing the recruitment and hiring process?",
        answers: [
            { text: "Core HCM", correct: false },
            { text: " Talent Acquisition", correct: false },
            { text: "Payroll", correct: false },
            { text: "Time Tracking", correct: true },
        ]  
    },
    {
        question: "What is the purpose of a Workday position?",
        answers: [
            { text: " To represent a job role or position", correct: true },
            { text: "To track time and attendance", correct: false },
            { text: "To manage payroll", correct: false },
            { text: "To manage benefits", correct: false },
        ]  
    },
    {
        question: " Which Workday module is used for managing payroll processes?",
        answers: [
            { text: "Core HCM", correct: false },
            { text: " Talent Acquisition", correct: false },
            { text: " Payroll", correct: true },
            { text: " Time Tracking", correct: false },
        ]  
    },
    {
        question: "  What is the purpose of a Workday time card?",
        answers: [
            { text: "To track employee time and attendance", correct: true },
            { text: " To manage payroll", correct: false },
            { text: "To manage benefits", correct: false },
            { text: "To manage performance reviews", correct: false },
        ]  
    },
    {
        question: " Which Workday module is used for managing employee benefits?",
        answers: [
            { text: " Core HCM", correct: true },
            { text: "Talent Acquisition", correct: false },
            { text: "Payroll", correct: false },
            { text: " Benefits", correct: false },
        ]  
    },
    {
        question: "What is the purpose of a Workday performance objective?",
        answers: [
            { text: "To track employee time and attendance", correct: false },
            { text: "To manage payroll", correct: false },
            { text: "To manage benefits", correct: true },
            { text: "To set and track performance goals", correct: false },
        ]  
    },
    {
        question: "Which Workday module is used for managing learning and development programs?",
        answers: [
            { text: " Core HCM", correct: false },
            { text: " Talent Acquisition", correct: true },
            { text: "Payroll", correct: false },
            { text: "Learning", correct: false },
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