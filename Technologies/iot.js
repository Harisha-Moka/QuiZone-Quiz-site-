const questions = [
    {
        question: "What is the core concept of the Internet of Things (IoT)?",
        answers: [
            { text: "Connecting everyday objects to the internet", correct: true },
            { text: "Creating a global network of computers", correct: false },
            { text: "Developing artificial intelligence", correct: false },
            { text: "Building smart cities", correct: false },
        ]
    },
    {
        question: "Which of the following is a common IoT application?",
        answers: [
            { text: "Smart home devices", correct: false},
            { text: "Autonomous vehicles", correct: false },
            { text: "Wearable technology", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "What is a potential security concern with IoT devices?",
        answers: [
            { text: "Data privacy breaches", correct: false},
            { text: "Remote hacking", correct: false },
            { text: "Denial of Service (DoS) attacks", correct: false },
            { text: " All of the above", correct: true },
        ]
    },
    {
        question: "What is the term for the connection of IoT devices to a centralized platform for data collection and analysis?",
        answers: [
            { text: "Cloud computing", correct: false},
            { text: "Edge computing", correct: false },
            { text: "IoT platform", correct: true },
            { text: "Network infrastructure", correct: false },
        ]
    },
    {
        question: "Which technology enables IoT devices to communicate and interact with each other?",
        answers: [
            { text: "Machine Learning", correct: false},
            { text: "Artificial Intelligence", correct: false },
            { text: "Internet Protocol (IP)", correct: true },
            { text: "Sensor networks", correct: false },
        ]
    },
    {
        question: "What is the primary goal of IoT in healthcare?",
        answers: [
            { text: "Improving patient outcomes", correct: false},
            { text: "Reducing healthcare costs", correct: false },
            { text: "Enhancing remote monitoring", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "Which IoT application is used to monitor and control agricultural processes?",
        answers: [
            { text: "Precision agriculture", correct: true},
            { text: "Smart cities", correct: false },
            { text: "Industrial IoT", correct: false },
            { text: "Wearable technology", correct: false },
        ]
    },
    {
        question: "What is the main advantage of using IoT devices in manufacturing?",
        answers: [
            { text: " Increased productivity", correct: false},
            { text: "Reduced costs", correct: false },
            { text: " Improved quality control", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "Which wireless technology is widely used for IoT devices?",
        answers: [
            { text: "Bluetooth", correct: false},
            { text: "Wi-Fi", correct: false },
            { text: "5G", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "What is the term for the collection and analysis of data from IoT devices?",
        answers: [
            { text: "Data mining", correct: false},
            { text: "Big data", correct: false },
            { text: "Analytics", correct: false },
            { text: " All of the above", correct: true },
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