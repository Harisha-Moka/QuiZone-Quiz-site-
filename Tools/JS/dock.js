const questions = [
    {
        question: "What is the primary purpose of Docker?",
        answers: [
            { text: "To create and manage virtual machines", correct: false},
            { text: "To package and run applications in containers", correct: true },
            { text: "To develop web applications", correct: false },
            { text: "To manage databases", correct: false },
        ]
    },
    {
        question: "What is a Docker image?",
        answers: [
            { text: "A running instance of a container", correct: false},
            { text: "A template for creating containers", correct: true },
            { text: "A virtual machine", correct: false },
            { text: "A Dockerfile", correct: false },
        ]
    },
    {
        question: "How do you create a Docker image?",
        answers: [
            { text: "By using the Dockerfile command", correct: false},
            { text: "By using the docker build command", correct: true },
            { text: "By using the docker run command", correct: false },
            { text: "By using the docker ps command", correct: false },
        ]
    },
    {
        question: "What is a Docker container?",
        answers: [
            { text: " A virtual machine", correct: false},
            { text: "A running instance of a Docker image", correct: true },
            { text: "A Dockerfile", correct: false },
            { text: "A Docker network", correct: false },
        ]
    },
    {
        question: "How do you start a Docker container?",
        answers: [
            { text: "By using the docker start command", correct: true },
            { text: "By using the docker run command", correct: false },
            { text: "By using the docker build command", correct: false },
            { text: "By using the docker ps command", correct: false },
        ]
    },
    {
        question: "What is a Docker volume?",
        answers: [
            { text: "A persistent storage mechanism for containers", correct: true},
            { text: "A Docker image", correct: false },
            { text: "A Docker container", correct: false },
            { text: "A Docker network", correct: false },
        ]
    },
    {
        question: "What is the Docker Compose tool used for?",
        answers: [
            { text: "Managing multiple Docker containers", correct: true },
            { text: "Creating Docker images", correct: false },
            { text: "Running Docker containers", correct: false },
            { text: "Building Docker networks", correct: false },
        ]
    },
    {
        question: "What is the Docker Hub?",
        answers: [
            { text: "A registry for Docker images", correct: true },
            { text: "A Docker container", correct: false },
            { text: "A Dockerfile", correct: false },
            { text: "A Docker network", correct: false },
        ]
    },
    {
        question: "What is the difference between a Docker image and a Docker container?",
        answers: [
            { text: "A Docker image is a template, while a Docker container is a running instance.", correct: true },
            { text: "A Docker image is a running instance, while a Docker container is a template.", correct: false },
            { text: "There is no difference between them.", correct: false },
            { text: " A Docker image is a virtual machine, while a Docker container is a container.", correct: false },
        ]
    },
    {
        question: "What is the purpose of Docker networking?",
        answers: [
            { text: "To connect Docker containers to the internet", correct: false},
            { text: "To create isolated networks for Docker containers", correct: true },
            { text: "To manage Docker images", correct: false },
            { text: "To run Docker containers", correct: false },
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