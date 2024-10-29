const questions = [
    {
        question: "What is the primary purpose of the fit() method in scikit-learn?",
        answers: [
            { text: "To train a machine learning model on a dataset.", correct: true },
            { text: "To make predictions on new data.", correct: false },
            { text: "To preprocess data before training.", correct: false },
            { text: "To evaluate the performance of a model.", correct: false },
        ]
    },
    {
        question: "Which of the following is a common preprocessing technique in scikit-learn?",
        answers: [
            { text: "Feature engineering", correct: false},
            { text: "Model selection", correct: false },
            { text: "Hyperparameter tuning", correct: false },
            { text: "Data scaling", correct: true },
        ]
    },
    {
        question: "What is the main difference between supervised and unsupervised learning?",
        answers: [
            { text: "Supervised learning has labeled data, while unsupervised learning does not.", correct: true },
            { text: "Supervised learning is used for classification only, while unsupervised learning is used for regression only.", correct: false },
            { text: "Supervised learning is more complex than unsupervised learning.", correct: false },
            { text: " Supervised learning is used for clustering only, while unsupervised learning is used for classification.", correct: false },
        ]
    },
    {
        question: "Which scikit-learn module is primarily used for clustering algorithms?",
        answers: [
            { text: "sklearn.linear_model", correct: false},
            { text: "sklearn.tree", correct: false },
            { text: "sklearn.cluster", correct: true },
            { text: "sklearn.ensemble", correct: false },
        ]
    },
    {
        question: "What is the purpose of cross-validation in machine learning?",
        answers: [
            { text: "To split data into training and testing sets.", correct: false},
            { text: "To evaluate a model's performance on unseen data.", correct: true },
            { text: "To select the best hyperparameters for a model.", correct: false },
            { text: "To preprocess data before training.", correct: false },
        ]
    },
    {
        question: "Which scikit-learn algorithm is commonly used for regression tasks?",
        answers: [
            { text: "Decision Tree", correct: false},
            { text: " K-Nearest Neighbors", correct: false },
            { text: "Support Vector Machine", correct: false },
            { text: "Linear Regression", correct: true },
        ]
    },
    {
        question: "What is the primary function of the predict() method in scikit-learn?",
        answers: [
            { text: "To train a machine learning model on a dataset.", correct: false},
            { text: "To make predictions on new data.", correct: true },
            { text: "To preprocess data before training.", correct: false },
            { text: "To evaluate the performance of a model.", correct: false },
        ]
    },
    {
        question: "Which scikit-learn algorithm is commonly used for feature selection?",
        answers: [
            { text: "Random Forest", correct: true },
            { text: " K-Means", correct: false },
            { text: "Logistic Regression", correct: false },
            { text: "Gradient Boosting", correct: false },
        ]
    },
    {
        question: "What is the purpose of the score() method in scikit-learn?",
        answers: [
            { text: "To train a machine learning model on a dataset.", correct: false},
            { text: "To make predictions on new data.", correct: false },
            { text: "To preprocess data before training.", correct: false },
            { text: "To evaluate the performance of a model.", correct: true },
        ]
    },
    {
        question: "Which scikit-learn algorithm is commonly used for dimensionality reduction?",
        answers: [
            { text: "Principal Component Analysis (PCA)", correct: true},
            { text: "Linear Regression", correct: false },
            { text: "Decision Tree", correct: false },
            { text: "K-Means", correct: false },
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