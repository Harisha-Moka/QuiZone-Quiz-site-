const questions = [
    {
        question: "What is the fundamental unit of compute resources in IBM Cloud?",
        answers: [
            { text: "Project", correct: false },
            { text: "Virtual Server", correct: true },
            { text: "Instance", correct: false },
            { text: " Zone", correct: false },
        ]
    },
    {
        question: " Which IBM Cloud service is used for object storage?",
        answers: [
            { text: "IBM Cloud Object Storage", correct: true },
            { text: "IBM Cloud Databases", correct: false },
            { text: "IBM Cloud Functions", correct: false },
            { text: " IBM Cloud Kubernetes Service", correct: false },
        ]  
    },
    {
        question: "What is the purpose of an IBM Resource Group?",
        answers: [
            { text: "To organize and manage resources", correct: true },
            { text: "To provide network connectivity", correct: false },
            { text: "To store data in a structured format", correct: false },
            { text: "To create and manage virtual machines", correct: false },
        ]  
    },
    {
        question: "Which IBM Cloud service is best suited for running large-scale batch processing jobs?",
        answers: [
            { text: " IBM Cloud Functions", correct: false },
            { text: "IBM Cloud Kubernetes Service", correct: false },
            { text: "IBM Watson Studio", correct: false },
            { text: "IBM Cloud Pak for Data", correct: true },
        ]  
    },
    {
        question: "What is the difference between an IBM Cloud region and an IBM Cloud zone?",
        answers: [
            { text: " Regions are geographical locations, while availability zones are data centers within a region.", correct: true },
            { text: "Availability zones are geographical locations, while regions are data centers within an availability zone.", correct: false },
            { text: "Regions and availability zones are the same thing.", correct: false },
            { text: "Regions are used for billing, while availability zones are used for resource allocation.", correct: false },
        ]  
    },
    {
        question: "Which IBM service is used for serverless computing?",
        answers: [
            { text: "IBM Cloud Kubernetes Service", correct: false },
            { text: "IBM Watson Studio", correct: false },
            { text: "IBM Cloud Functions", correct: true },
            { text: "IBM Cloud Pak for Data", correct: false },
        ]  
    },
    {
        question: " What is the purpose of a load balancer in IBM Cloud?",
        answers: [
            { text: "To distribute traffic across multiple instances", correct: true },
            { text: "To provide network security", correct: false },
            { text: "To store data in a structured format", correct: false },
            { text: "To create and manage virtual machines", correct: false },
        ]  
    },
    {
        question: "  What is the purpose of a virtual private cloud (VPC) in IBM Cloud?",
        answers: [
            { text: "To provide network security", correct: true },
            { text: "To store data in a structured format", correct: false },
            { text: "To create and manage virtual machines", correct: false },
            { text: "To distribute traffic across multiple instances", correct: false },
        ]  
    },
    {
        question: "Which IBM Cloud service is used for relational databases?",
        answers: [
            { text: " IBM Cloud Object Storage", correct: false },
            { text: "IBM Cloud Functions", correct: false },
            { text: " IBM Cloud Databases", correct: true },
            { text: "IBM Cloud Kubernetes Service", correct: false },
        ]  
    },
    {
        question: "Which IBM Cloud service is used for real-time analytics?",
        answers: [
            { text: " IBM Cloud Functions", correct: false },
            { text: "IBM Watson Studio", correct: true },
            { text: "IBM Cloud Databases", correct: false },
            { text: " IBM Cloud Pak for Data", correct: false },
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