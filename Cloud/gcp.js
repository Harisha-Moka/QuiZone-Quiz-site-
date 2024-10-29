const questions = [
    {
        question: "What is the fundamental unit of compute resources in GCP?",
        answers: [
            { text: "Instance", correct: true },
            { text: "Bucket", correct: false },
            { text: "Zone", correct: false },
            { text: "Project", correct: false },
        ]
    },
    {
        question: "Which GCP service is used for object storage?",
        answers: [
            { text: "Compute Engine", correct: false },
            { text: "Cloud Storage", correct: true },
            { text: "BigQuery", correct: false },
            { text: "Cloud SQL", correct: false },
        ]  
    },
    {
        question: "What is the purpose of a GCP project?",
        answers: [
            { text: "To organize and manage resources", correct: true },
            { text: "To provide network connectivity", correct: false },
            { text: "To store data in a structured format", correct: false },
            { text: "To create and manage virtual machines", correct: false },
        ]  
    },
    {
        question: "Which GCP service is best suited for running large-scale batch processing jobs?",
        answers: [
            { text: "Cloud Functions", correct: false },
            { text: "App Engine", correct: false },
            { text: "Dataflow", correct: true },
            { text: "Kubernetes Engine", correct: false },
        ]  
    },
    {
        question: "What is the difference between a region and a zone in GCP?",
        answers: [
            { text: "Regions are geographical locations, while zones are data centers within a region.", correct: true },
            { text: "Zones are geographical locations, while regions are data centers within a zone.", correct: false },
            { text: "Regions and zones are the same thing.", correct: false },
            { text: "Regions are used for billing, while zones are used for resource allocation.", correct: false },
        ]  
    },
    {
        question: "Which GCP service is used for serverless computing?",
        answers: [
            { text: "App Engine", correct: false },
            { text: "Compute Engine", correct: false },
            { text: "Cloud SQl", correct: false },
            { text: "Cloud Functions ", correct: true },
        ]  
    },
    {
        question: "What is the purpose of a load balancer in GCP?",
        answers: [
            { text: "To distribute traffic across multiple instances", correct: true },
            { text: "To provide network security", correct: false },
            { text: "To store data in a structured format", correct: false },
            { text: "To create and manage virtual machines", correct: false },
        ]  
    },
    {
        question: "Which GCP service is used for relational databases?",
        answers: [
            { text: "Cloud Storage", correct: false },
            { text: "BigQuery", correct: false },
            { text: "Dataflow", correct: false },
            { text: "Cloud SQL", correct: true },
        ]  
    },
    {
        question: "What is the purpose of a virtual private cloud (VPC) in GCP?",
        answers: [
            { text: " To create and manage virtual machines", correct: false },
            { text: "To store data in a structured format", correct: false },
            { text: "To provide network security", correct: true },
            { text: "To distribute traffic across multiple instances", correct: false },
        ]  
    },
    {
        question: "Which GCP service is used for real-time analytics?",
        answers: [
            { text: "BigQuery", correct: false },
            { text: "Pub/Sub", correct: true },
            { text: "Dataflow", correct: false },
            { text: "Cloud SQL", correct: true },
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