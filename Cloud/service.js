const questions = [
    {
        question: "What is the core function of ServiceNow?",
        answers: [
            { text: "Customer Relationship Management (CRM)", correct: false },
            { text: "Enterprise Resource Planning (ERP)", correct: false },
            { text: "IT Service Management (ITSM)", correct: true },
            { text: "Human Capital Management (HCM)", correct: false },
        ]
    },
    {
        question: "Which ServiceNow module is used for managing incidents?",
        answers: [
            { text: "Incident Management", correct: true },
            { text: "Problem Management", correct: false },
            { text: "Change Management", correct: false },
            { text: "Asset Management", correct: false },
        ]  
    },
    {
        question: "What is the purpose of a ServiceNow configuration item (CI)?",
        answers: [
            { text: "To represent a physical or logical asset", correct: true },
            { text: "To track changes to the configuration of a CI", correct: false },
            { text: "To manage incidents related to a CI", correct: false },
            { text: "To automate tasks related to a CI", correct: false },
        ]  
    },
    {
        question: "Which ServiceNow module is used for managing changes to the IT infrastructure?",
        answers: [
            { text: " Incident Management", correct: false },
            { text: "Problem Management", correct: false },
            { text: "Change Management", correct: true },
            { text: "Asset Management", correct: false },
        ]  
    },
    {
        question: "What is the purpose of a ServiceNow knowledge base?",
        answers: [
            { text: " To store information about IT services", correct: true },
            { text: "To track changes to the IT infrastructure", correct: false },
            { text: "To manage incidents related to IT services", correct: false },
            { text: "To automate tasks related to IT services", correct: false },
        ]  
    },
    {
        question: " Which ServiceNow module is used for managing problems that cause multiple incidents?",
        answers: [
            { text: "Incident Management", correct: false },
            { text: " Problem Management", correct: true },
            { text: "Change Management", correct: false },
            { text: "Asset Management", correct: false },
        ]  
    },
    {
        question: " What is the purpose of a ServiceNow service catalog?",
        answers: [
            { text: "To store information about IT services", correct: false },
            { text: "To track changes to the IT infrastructure", correct: false },
            { text: "To manage incidents related to IT services", correct: false },
            { text: "To provide a self-service portal for users to request services", correct: true },
        ]  
    },
    {
        question: " Which ServiceNow module is used for managing the lifecycle of IT assets?",
        answers: [
            { text: "Incident Management", correct: false },
            { text: "Problem Management", correct: false },
            { text: "Change Management", correct: false },
            { text: "Asset Management", correct: true },
        ]  
    },
    {
        question: "What is the purpose of a ServiceNow workflow?",
        answers: [
            { text: " To automate tasks and processes", correct: true },
            { text: "To track changes to the IT infrastructure", correct: false },
            { text: "To manage incidents related to IT services", correct: false },
            { text: "To provide a self-service portal for users to request services", correct: false },
        ]  
    },
    {
        question: "What is the purpose of a ServiceNow discovery?",
        answers: [
            { text: "To automate the discovery of IT assets", correct: true },
            { text: "To track changes to the IT infrastructure", correct: false },
            { text: "To manage incidents related to IT services", correct: false },
            { text: "  To provide a self-service portal for users to request services", correct: false },
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