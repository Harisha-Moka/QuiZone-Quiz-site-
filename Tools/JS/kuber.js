const questions = [
    {
        question: "What is Kubernetes primarily used for?",
        answers: [
            { text: "Managing physical servers", correct: false},
            { text: "Developing web applications", correct: false },
            { text: "Deploying and managing containerized applications", correct: true },
            { text: "Creating virtual machines", correct: false },
        ]
    },
    {
        question: "What is a Pod in Kubernetes?",
        answers: [
            { text: "A group of containers that share a network namespace", correct: true },
            { text: "A single container", correct: false },
            { text: "A virtual machine", correct: false },
            { text: "A Kubernetes cluster", correct: false },
        ]
    },
    {
        question: "What is the role of a Kubernetes Master node?",
        answers: [
            { text: "Running containerized applications", correct: false},
            { text: "Storing application data", correct: false },
            { text: "Providing network connectivity", correct: false },
            { text: "Managing the Kubernetes cluster", correct: true },
        ]
    },
    {
        question: "What is a Service in Kubernetes?",
        answers: [
            { text: " A group of Pods", correct: false},
            { text: "A Kubernetes cluster", correct: false },
            { text: "A network proxy that provides a stable IP address and port for a set of Pods", correct: true },
            { text: "A container image", correct: false },
        ]
    },
    {
        question: "What is a Deployment in Kubernetes?",
        answers: [
            { text: " A group of Nodes", correct: false},
            { text: "A desired state for a set of Pods", correct: true },
            { text: "A Kubernetes cluster", correct: false },
            { text: "A container image", correct: false },
        ]
    },
    {
        question: "What is a ReplicaSet in Kubernetes?",
        answers: [
            { text: "A group of Pods", correct: true},
            { text: "A desired state for a set of Pods", correct: false },
            { text: "A Kubernetes cluster", correct: false },
            { text: "A container image", correct: false },
        ]
    },
    {
        question: "What is a Helm chart?",
        answers: [
            { text: "A Kubernetes resource", correct: false},
            { text: "A template for defining and managing Kubernetes applications", correct: true },
            { text: "A Kubernetes cluster", correct: false },
            { text: "A container image", correct: false },
        ]
    },
    {
        question: "What is the purpose of a ConfigMap in Kubernetes?",
        answers: [
            { text: "To store configuration data for applications", correct: true},
            { text: "To manage network traffic", correct: false },
            { text: "To define the desired state for a set of Pods", correct: false },
            { text: "To create Kubernetes clusters", correct: false },
        ]
    },
    {
        question: "What is a PersistentVolumeClaim (PVC) in Kubernetes used for?",
        answers: [
            { text: "To request persistent storage for applications", correct: true },
            { text: "To manage network traffic", correct: false },
            { text: "To define the desired state for a set of Pods", correct: false },
            { text: "To create Kubernetes clusters", correct: false },
        ]
    },
    {
        question: "What is the primary benefit of using Kubernetes for container orchestration?",
        answers: [
            { text: "Simplifies the deployment and management of containerized applications", correct: true},
            { text: "Increases the complexity of managing applications", correct: false },
            { text: "Reduces the need for automation", correct: false },
            { text: "Makes applications more difficult to scale", correct: false },
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