const questions = [
    {
        question: "What is the fundamental unit of computing in AWS?",
        answers: [
            { text: "Volume", correct: false },
            { text: "AMI", correct: false },
            { text: "Instance", correct: true },
            { text: " VPC", correct: false },
        ]
    },
    {
        question: "Which AWS service provides object storage?",
        answers: [
            { text: "EBS", correct: false },
            { text: " S3", correct: true },
            { text: "RDS", correct: false },
            { text: " EC2", correct: false },
        ]  
    },
    {
        question: "What is the purpose of an AWS VPC?",
        answers: [
            { text: "To provide a virtual private network", correct: true },
            { text: "To manage storage", correct: false },
            { text: "To deploy serverless applications", correct: false },
            { text: "To create instances", correct: false },
        ]  
    },
    {
        question: "Which AWS service is used to create a load balancer?",
        answers: [
            { text: " ELB", correct: true },
            { text: "VPC", correct: false },
            { text: "S3", correct: false },
            { text: "EC2", correct: false },
        ]  
    },
    {
        question: "What is the main function of a security group in AWS?",
        answers: [
            { text: "To manage storage", correct: false },
            { text: "To provide network security", correct: true },
            { text: "To deploy instances", correct: false },
            { text: " To create load balancers", correct: false },
        ]  
    },
    {
        question: "Which AWS service is used for relational databases?",
        answers: [
            { text: "S3", correct: false },
            { text: "DynamoDB", correct: false },
            { text: "EBS", correct: false },
            { text: "RDS", correct: true },
        ]  
    },
    {
        question: "What is the difference between EBS and EFS?",
        answers: [
            { text: " EBS is for block storage, while EFS is for file storage", correct: true },
            { text: "EBS is for file storage, while EFS is for block storage", correct: false },
            { text: "Both are for block storage", correct: false },
            { text: "Both are for file storage", correct: false },
        ]  
    },
    {
        question: "Which AWS service is used for serverless computing?",
        answers: [
            { text: "Lambda", correct: true },
            { text: "EC2", correct: false },
            { text: "RDS", correct: false },
            { text: "S3", correct: false },
        ]  
    },
    {
        question: "What is the purpose of AWS ECS?",
        answers: [
            { text: "To manage relational databases", correct: false },
            { text: "To provide serverless computing", correct: false },
            { text: "To manage containerized applications", correct: true },
            { text: "To create load balancers", correct: false },
        ]  
    },
    {
        question: "What is the full form of AWS?",
        answers: [
            { text: "Architecture Web Services", correct: false },
            { text: "Amazon Web Servers", correct: false },
            { text: "Artificial Web Servers", correct: false },
            { text: "Amazon Web Services", correct: true },
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