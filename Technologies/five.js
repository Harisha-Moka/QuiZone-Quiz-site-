const questions = [
    {
        question: "What does 5G stand for?",
        answers: [
            { text: "Fifth Generation", correct: true},
            { text: "Fiber Gigabit", correct: false },
            { text: "Fast Gateway", correct: false },
            { text: "Future Grid", correct: false },
        ]
    },
    {
        question: "Compared to 4G, 5G technology offers significantly improved:",
        answers: [
            { text: " Latency", correct: false},
            { text: " Data transfer rates", correct: false },
            { text: " Battery life", correct: false },
            { text: " Both A and B", correct: true },
        ]
    },
    {
        question: "Which frequency bands are primarily used for 5G networks?",
        answers: [
            { text: " Low-band, mid-band, and high-band", correct: true},
            { text: "High-band and mid-band only", correct: false },
            { text: "Low-band and high-band only", correct: false },
            { text: "Mid-band and high-band only", correct: false },
        ]
    },
    {
        question: "What is the key technology that enables 5G to achieve higher data rates and lower latency?",
        answers: [
            { text: "Massive MIMO", correct: true},
            { text: "Network slicing", correct: false },
            { text: "Edge computing", correct: false },
            { text: "Carrier aggregation", correct: false },
        ]
    },
    {
        question: "Which of the following is a major use case for 5G technology?",
        answers: [
            { text: " Internet of Things (IoT)", correct: false},
            { text: "Augmented and virtual reality", correct: false },
            { text: "Autonomous vehicles", correct: false },
            { text: " All of the above", correct: true },
        ]
    },
    {
        question: "What is the main advantage of using millimeter waves for 5G networks?",
        answers: [
            { text: "Wider coverage area", correct: false},
            { text: "Higher data rates", correct: true },
            { text: "Lower latency", correct: false },
            { text: "Better penetration through walls", correct: false },
        ]
    },
    {
        question: "Network slicing in 5G allows for:",
        answers: [
            { text: "Dynamic allocation of network resources", correct: true},
            { text: "Improved security", correct: false },
            { text: "Higher data rates", correct: false },
            { text: "Lower latency", correct: false },
        ]
    },
    {
        question: "Which technology enables 5G to support a massive number of connected devices?",
        answers: [
            { text: "Massive MIMO", correct: true},
            { text: "Network slicing", correct: false },
            { text: "Edge computing", correct: false },
            { text: "Carrier aggregation", correct: false },
        ]
    },
    {
        question: "What is the primary challenge in deploying 5G networks in rural areas?",
        answers: [
            { text: "Lack of infrastructure", correct: false},
            { text: "Higher costs", correct: false },
            { text: "Limited spectrum availability", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "Which of the following is a potential use case for 5G in the healthcare industry?",
        answers: [
            { text: " Remote surgery", correct: false},
            { text: "Telemedicine", correct: false },
            { text: " Real-time monitoring of patient vitals", correct: false },
            { text: "All of the above", correct: true },
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