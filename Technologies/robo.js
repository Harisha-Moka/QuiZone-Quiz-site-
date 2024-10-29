const questions = [
    {
        question: "What is the primary function of a robot?",
        answers: [
            { text: "To replace humans in all tasks", correct: false},
            { text: "To perform tasks that are dangerous, repetitive, or precise", correct: true },
            { text: "To create art and music", correct: false },
            { text: "To provide companionship", correct: false },
        ]
    },
    {
        question: "Which branch of robotics focuses on creating robots that resemble humans in appearance and behavior?",
        answers: [
            { text: "Industrial robotics", correct: false},
            { text: "Service robotics", correct: false },
            { text: "Humanoid robotics", correct: true },
            { text: "Autonomous robotics", correct: false },
        ]
    },
    {
        question: "What is a robot's ability to sense and respond to its environment called?",
        answers: [
            { text: " Autonomy", correct: false},
            { text: "Intelligence", correct: false },
            { text: "Perception", correct: true },
            { text: "Manipulation", correct: false },
        ]
    },
    {
        question: "Which component of a robot is responsible for controlling its movements?",
        answers: [
            { text: "Actuators", correct: true },
            { text: "Sensors", correct: false },
            { text: "Microcontroller", correct: false },
            { text: "Power source", correct: false },
        ]
    },
    {
        question: "What is the term for a robot that can learn from its experiences and adapt to new situations?",
        answers: [
            { text: " Autonomous", correct: false},
            { text: "Intelligent", correct: false },
            { text: "Adaptive", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "Which type of robot is commonly used in factories for tasks like assembly and welding?",
        answers: [
            { text: " Industrial robot", correct: true },
            { text: "Service robot", correct: false },
            { text: "Humanoid robot", correct: false },
            { text: "Autonomous robot", correct: false },
        ]
    },
    {
        question: "What is the primary goal of robotics research?",
        answers: [
            { text: "To create robots that can replace humans in all tasks", correct: false},
            { text: " To develop robots that can benefit society and improve quality of life", correct: true },
            { text: "To build robots that are more intelligent than humans", correct: false },
            { text: "To study the nature of intelligence", correct: false },
        ]
    },
    {
        question: "Which ethical consideration is particularly important in the development of autonomous robots?",
        answers: [
            { text: "Privacy", correct: false},
            { text: "Safety", correct: false },
            { text: " Job displacement", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "What is the term for the study of the interaction between humans and robots?",
        answers: [
            { text: "Human-robot interaction", correct: true},
            { text: "Robotics engineering", correct: false },
            { text: "Artificial intelligence", correct: false },
            { text: "Automation", correct: false },
        ]
    },
    {
        question: "Which type of robot is designed to assist humans in tasks like household chores and personal care?",
        answers: [
            { text: "Industrial robot", correct: false},
            { text: "Service robot", correct: true },
            { text: " Humanoid robot", correct: false },
            { text: "Autonomous robot", correct: false },
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