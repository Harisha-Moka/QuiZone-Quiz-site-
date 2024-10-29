const questions = [
    {
        question: "What is augmented reality?",
        answers: [
            { text: "A technology that creates a completely artificial environment", correct: false},
            { text: "A technology that overlays digital information onto the real world", correct: true },
            { text: "A technology that replaces the real world with a digital one", correct: false },
            { text: "A technology that enhances the real world with physical objects", correct: false },
        ]
    },
    {
        question: "Which of the following is an example of augmented reality?",
        answers: [
            { text: "A virtual reality headset", correct: false},
            { text: "A video game console", correct: false },
            { text: "A smartphone app that shows directions on a map", correct: true },
            { text: "A 3D printer", correct: false },
        ]
    },
    {
        question: "What is virtual reality?",
        answers: [
            { text: "A technology that overlays digital information onto the real world", correct: true },
            { text: "A technology that replaces the real world with a completely artificial one", correct: false },
            { text: "A technology that enhances the real world with physical objects", correct: false },
            { text: "A technology that creates a partially artificial environment", correct: false },
        ]
    },
    {
        question: "Which of the following is an example of virtual reality?",
        answers: [
            { text: "A smartphone app that shows directions on a map", correct: false},
            { text: "A video game console", correct: false },
            { text: "A virtual reality headset used for gaming", correct: true },
            { text: "A 3D printer", correct: false },
        ]
    },
    {
        question: "What is the main difference between AR and VR?",
        answers: [
            { text: "AR enhances the real world, while VR replaces it.", correct: true},
            { text: "AR is used for gaming, while VR is used for education.", correct: false },
            { text: "AR is more expensive than VR.", correct: false },
            { text: "VR is more immersive than AR.", correct: false },
        ]
    },
    {
        question: "Which technology requires a headset to be fully experienced?",
        answers: [
            { text: "AR", correct: false},
            { text: "VR", correct: true },
            { text: "Both AR and VR", correct: false },
            { text: "Neither AR nor VR", correct: false },
        ]
    },
    {
        question: "How can VR be used in education?",
        answers: [
            { text: "To create immersive learning experiences", correct: false},
            { text: "To simulate real-world scenarios", correct: false },
            { text: "To provide personalized instruction", correct: false },
            { text: " All of the above", correct: true },
        ]
    },
    {
        question: "What is the potential impact of AR and VR on the entertainment industry?",
        answers: [
            { text: "Increased engagement and immersion for audiences", correct: false},
            { text: "New forms of storytelling and experiences", correct: false },
            { text: "Greater accessibility for people with disabilities", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "Which of the following is a potential challenge of AR and VR technology?",
        answers: [
            { text: "Cost", correct: false},
            { text: "Technical limitations", correct: false },
            { text: "Privacy concerns", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "Which of the following is a potential challenge of AR and VR technology?",
        answers: [
            { text: "Cost", correct: false},
            { text: "Technical limitations", correct: false },
            { text: "Privacy concerns", correct: false },
            { text: "All of the above", correct: true},
        ]
    },
    
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