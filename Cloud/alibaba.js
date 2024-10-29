const questions = [
    {
        question: "What is the primary function of Alibaba Cloud's Elastic Compute Service (ECS)?",
        answers: [
            { text: "Providing storage solutions", correct: false },
            { text: "Offering database management", correct: false },
            { text: "Deploying virtual servers", correct: true },
            { text: " Managing network traffic", correct: false },
        ]
    },
    {
        question: "Which service is used for object storage on Alibaba Cloud?",
        answers: [
            { text: "ApsaraDB RDS", correct: false },
            { text: " Object Storage Service (OSS)", correct: true },
            { text: "ApsaraDB for Redis", correct: false },
            { text: " Elastic Compute Service", correct: false },
        ]  
    },
    {
        question: "What is the purpose of Alibaba Cloud's Server Load Balancer (SLB)?",
        answers: [
            { text: "To distribute network traffic across multiple servers", correct: true },
            { text: "To provide network security", correct: false },
            { text: "To manage cloud storage", correct: false },
            { text: "To deploy virtual machines", correct: false },
        ]  
    },
    {
        question: "Which service is used to create a virtual private cloud (VPC) on Alibaba Cloud?",
        answers: [
            { text: " VPC Networks", correct: true },
            { text: "Cloud Firewall", correct: false },
            { text: "Security Group", correct: false },
            { text: "NAT Gateway", correct: false },
        ]  
    },
    {
        question: "What is the main function of a Security Group in Alibaba Cloud?",
        answers: [
            { text: "To provide network security", correct: true },
            { text: "To manage storage resources", correct: false },
            { text: "To deploy virtual machines", correct: false },
            { text: " To distribute network traffic", correct: false },
        ]  
    },
    {
        question: "Which service is used for real-time data processing on Alibaba Cloud?",
        answers: [
            { text: "MaxCompute", correct: false },
            { text: "DataWorks", correct: false },
            { text: "ApsaraDB for Redis", correct: false },
            { text: "Flink", correct: true },
        ]  
    },
    {
        question: "What is the purpose of Alibaba Cloud's DataWorks?",
        answers: [
            { text: " To provide data visualization tools", correct: true },
            { text: "To manage data storage", correct: false },
            { text: "To deploy virtual machines", correct: false },
            { text: "To distribute network traffic", correct: false },
        ]  
    },
    {
        question: "Which service is used for container orchestration on Alibaba Cloud?",
        answers: [
            { text: "Container Service for Kubernetes (ACK)", correct: true },
            { text: "Serverless App Engine (SAE)", correct: false },
            { text: "Elastic Compute Service (ECS)", correct: false },
            { text: "Object Storage Service (OSS)", correct: false },
        ]  
    },
    {
        question: "What is the primary function of Alibaba Cloud's Serverless App Engine (SAE)?",
        answers: [
            { text: "To deploy and manage serverless applications", correct: true },
            { text: "To provide data storage solutions", correct: false },
            { text: "To manage network traffic", correct: false },
            { text: " To deploy virtual machines", correct: false },
        ]  
    },
    {
        question: "Which country introduced Alibaba Cloud?",
        answers: [
            { text: "India", correct: false },
            { text: "Russia", correct: false },
            { text: "China", correct: true },
            { text: "USA", correct: false },
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