const questions = [
    {
        question: "What is the core function of Salesforce?",
        answers: [
            { text: "Customer Relationship Management (CRM)", correct: true },
            { text: "Enterprise Resource Planning (ERP)", correct: false },
            { text: "Human Capital Management (HCM)", correct: false },
            { text: " IT Service Management (ITSM)", correct: false },
        ]
    },
    {
        question: "Which Salesforce module is used for managing leads and opportunities?",
        answers: [
            { text: "Sales Cloud", correct: true },
            { text: "Service Cloud", correct: false },
            { text: "Marketing Cloud", correct: false },
            { text: " Commerce Cloud", correct: false },
        ]  
    },
    {
        question: "What is the purpose of a Salesforce account?",
        answers: [
            { text: "To represent a customer organization", correct: true },
            { text: "To track interactions with individual customers", correct: false },
            { text: "To manage marketing campaigns", correct: false },
            { text: "To provide a self-service portal for customers", correct: false },
        ]  
    },
    {
        question: "Which Salesforce module is used for managing customer service cases?",
        answers: [
            { text: "Sales Cloud", correct: false },
            { text: "Service Cloud", correct: true },
            { text: "Marketing Cloud", correct: false },
            { text: "Commerce Cloud", correct: false },
        ]  
    },
    {
        question: " What is the purpose of a Salesforce campaign?",
        answers: [
            { text: " To represent a customer organization", correct: false },
            { text: "To track interactions with individual customers", correct: false },
            { text: "To manage marketing campaigns", correct: true },
            { text: "To provide a self-service portal for customers", correct: false },
        ]  
    },
    {
        question: "Which Salesforce module is used for managing e-commerce transactions?",
        answers: [
            { text: " Sales Cloud", correct: false },
            { text: "Service Cloud", correct: false },
            { text: "Marketing Cloud", correct: false },
            { text: "Commerce Cloud", correct: true },
        ]  
    },
    {
        question: "What is the purpose of a Salesforce contact?",
        answers: [
            { text: " To represent a customer organization", correct: false },
            { text: "To track interactions with individual customers", correct: true },
            { text: "To manage marketing campaigns", correct: false },
            { text: " To provide a self-service portal for customers", correct: false },
        ]  
    },
    {
        question: "Which Salesforce module is used for managing marketing automation?",
        answers: [
            { text: "Sales Cloud", correct: false },
            { text: "Service Cloud", correct: false },
            { text: "Marketing Cloud", correct: true },
            { text: "Commerce Cloud", correct: false },
        ]  
    },
    {
        question: "What is the purpose of a Salesforce opportunity?",
        answers: [
            { text: "To represent a potential sale", correct: true },
            { text: "To track interactions with individual customers", correct: false },
            { text: "To manage marketing campaigns", correct: false },
            { text: " To provide a self-service portal for customers", correct: false },
        ]  
    },
    {
        question: "What is the purpose of a Salesforce community?",
        answers: [
            { text: "  To represent a customer organization", correct: false },
            { text: "To track interactions with individual customers", correct: false },
            { text: " To create a branded online community for customers and partners", correct: true },
            { text: " To provide a self-service portal for customers", correct: false },
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