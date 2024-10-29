const questions = [
    {
        question: "What is the primary goal of machine learning?",
        answers: [
            { text: "To create artificial intelligence", correct: false},
            { text: "To teach computers to learn from data", correct: true },
            { text: "To develop robots", correct: false },
            { text: "To analyze large datasets", correct: false },
        ]
    },
    {
        question: "Which type of machine learning involves training a model on labeled data?",
        answers: [
            { text: "Unsupervised learning", correct: false},
            { text: "Supervised learning", correct: true },
            { text: "Reinforcement learning", correct: false },
            { text: "Deep learning", correct: false },
        ]
    },
    {
        question: "What is the process of dividing a dataset into training and testing sets used for?",
        answers: [
            { text: "Data cleaning", correct: false},
            { text: "Model evaluation", correct: true },
            { text: "Feature engineering", correct: false },
            { text: "Data visualization", correct: false },
        ]
    },
    {
        question: "Which machine learning algorithm is often used for classification tasks?",
        answers: [
            { text: " Linear regression", correct: false},
            { text: "Decision trees", correct: true },
            { text: " K-means clustering", correct: false },
            { text: "Principal component analysis", correct: false },
        ]
    },
    {
        question: "What is the term for a machine learning model that can learn complex patterns from large datasets?",
        answers: [
            { text: "Neural network", correct: true},
            { text: "Decision tree", correct: false },
            { text: "Support vector machine", correct: false },
            { text: "Linear regression", correct: false },
        ]
    },
    {
        question: "Which type of machine learning algorithm is used to find patterns and relationships in unlabeled data?",
        answers: [
            { text: "Supervised learning", correct: false},
            { text: "Unsupervised learning", correct: true },
            { text: "Reinforcement learning", correct: false },
            { text: "Deep learning", correct: false },
        ]
    },
    {
        question: "What is the process of selecting and preparing relevant features from a dataset?",
        answers: [
            { text: " Data cleaning", correct: false},
            { text: "Feature engineering", correct: true },
            { text: "Model evaluation", correct: false },
            { text: "Data visualization", correct: false },
        ]
    },
    {
        question: "Which machine learning algorithm is commonly used for clustering tasks?",
        answers: [
            { text: "K-means clustering", correct: true},
            { text: "Decision trees", correct: false },
            { text: "Linear regression", correct: false },
            { text: "Support vector machine", correct: false },
        ]
    },
    {
        question: "What is the term for the evaluation metric that measures the accuracy of a classification model?",
        answers: [
            { text: "Mean squared error", correct: false},
            { text: "Accuracy", correct: true },
            { text: "Precision", correct: false },
            { text: "Recall", correct: false },
        ]
    },
    {
        question: "Which machine learning technique is used to train models on large datasets with many features?",
        answers: [
            { text: "Gradient descent", correct: false},
            { text: "Backpropagation", correct: false },
            { text: "Regularization", correct: false },
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