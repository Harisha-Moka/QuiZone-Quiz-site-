const questions = [
    {
        question: "What is the primary goal of Artificial Intelligence (AI)?",
        answers: [
            { text: "To create machines that can think and act independently.", correct: true },
            { text: "To develop software that can solve complex mathematical problems.", correct: false },
            { text: "To build robots that can perform household chores.", correct: false },
            { text: "To design computers that can process information faster than humans.", correct: false },
        ]
    },
    {
        question: "Which of the following is a subfield of AI?",
        answers: [
            { text: "Software Engineering", correct: false},
            { text: "Machine Learning", correct: true },
            { text: "Electrical Engineering", correct: false },
            { text: "Civil Engineering", correct: false },
        ]
    },
    {
        question: "What is the Turing Test used for?",
        answers: [
            { text: "To measure the speed of a computer's processor.", correct: false},
            { text: "To determine if a machine can exhibit human-like intelligence.", correct: true },
            { text: "To assess the accuracy of a machine's calculations.", correct: false },
            { text: "To evaluate the efficiency of a machine's energy consumption.", correct: false },
        ]
    },
    {
        question: "Neural networks are inspired by:",
        answers: [
            { text: "The human brain", correct: true },
            { text: "The solar system", correct: false },
            { text: "The circulatory system", correct: false },
            { text: "The electrical grid", correct: false },
        ]
    },
    {
        question: " What is the term for the ability of a machine to learn from data and improve its performance over time?",
        answers: [
            { text: "Deep Learning", correct: false},
            { text: "Artificial Neural Networks", correct: false },
            { text: "Natural Language Processing", correct: false },
            { text: "Machine Learning", correct: true },
        ]
    },
    {
        question: "Which of the following is an example of a supervised learning task?",
        answers: [
            { text: "Recommendation systems", correct: false},
            { text: "Clustering", correct: false },
            { text: "Image classification", correct: true },
            { text: "Dimensionality reduction", correct: false },
        ]
    },
    {
        question: "What is the main difference between supervised and unsupervised learning?",
        answers: [
            { text: "Supervised learning requires labeled data, while unsupervised learning does not.", correct: true },
            { text: "Supervised learning is used for prediction, while unsupervised learning is used for clustering.", correct: false },
            { text: "Supervised learning is more complex than unsupervised learning.", correct: false },
            { text: "Supervised learning is only used for image recognition.", correct: false },
        ]
    },
    {
        question: "What is the purpose of a chatbot?",
        answers: [
            { text: "To perform complex calculations", correct: false},
            { text: "To control robots", correct: false },
            { text: "To analyze large datasets", correct: false },
            { text: "To simulate human conversation", correct: true },
        ]
    },
    {
        question: "Which AI technique is used to process and understand natural language?",
        answers: [
            { text: "Computer Vision", correct: false},
            { text: "Natural Language Processing", correct: true },
            { text: "Reinforcement Learning", correct: false },
            { text: "Expert Systems", correct: false },
        ]
    },
    {
        question: "What is the term for a machine that can perform tasks that typically require human intelligence?",
        answers: [
            { text: "Robot", correct: false},
            { text: "Algorithm", correct: false },
            { text: "Artificial Intelligence", correct: true },
            { text: "Computer", correct: false },
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