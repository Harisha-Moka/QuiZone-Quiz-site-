const questions = [
    {
        question: "What is the first step in the data science process?",
        answers: [
            { text: "Data cleaning", correct: false },
            { text: "Data analysis", correct: false },
            { text: "Data visualization", correct: false },
            { text: "Data collection", correct: true },
        ]
    },
    {
        question: "Which of the following is a common data visualization technique?",
        answers: [
            { text: "Regression analysis", correct: false },
            { text: "Clustering", correct: false },
            { text: "Bar chart", correct: true },
            { text: "Hypothesis testing", correct: false },
        ]
    },
    {
        question: "What is the goal of data mining?",
        answers: [
            { text: "To collect data from various sources", correct: false},
            { text: " To clean and prepare data for analysis", correct: false },
            { text: "To discover patterns and insights in data", correct: true },
            { text: "To visualize data in a meaningful way", correct: false },
        ]
    },
    {
        question: "Which statistical technique is used to measure the strength of the relationship between two variables?",
        answers: [
            { text: "Correlation", correct: true },
            { text: "Regression", correct: false },
            { text: "Hypothesis testing", correct: true },
            { text: "Clustering", correct: false },
        ]
    },
    {
        question: "What is the term for a machine learning algorithm that learns from examples and improves its performance over time?",
        answers: [
            { text: "Supervised learning", correct: true},
            { text: "Unsupervised learning", correct: false },
            { text: "Reinforcement learning", correct: false },
            { text: "Deep learningl", correct: false },
        ]
    },
    {
        question: "Which machine learning algorithm is commonly used for classification tasks?",
        answers: [
            { text: "Linear regression", correct: false},
            { text: "Decision tree", correct: true },
            { text: "K-means clustering", correct: false },
            { text: "Principal component analysis", correct: false },
        ]
    },
    {
        question: "What is the purpose of data normalization?",
        answers: [
            { text: " To make data consistent and comparable", correct: true},
            { text: "To reduce the dimensionality of data", correct: false },
            { text: "To handle missing values", correct: false },
            { text: "To improve data quality", correct: false },
        ]
    },
    {
        question: "Which statistical technique is used to assess the significance of a difference between two groups?",
        answers: [
            { text: "T-test", correct: true },
            { text: "ANOVA", correct: false },
            { text: " Chi-square test", correct: false },
            { text: "Correlation", correct: false },
        ]
    },
    {
        question: "What is the term for a large dataset that is difficult to process with traditional data processing tools?",
        answers: [
            { text: "Big data", correct: true},
            { text: "Data warehouse", correct: false },
            { text: "Data lake", correct: false },
            { text: "Data mart", correct: false },
        ]
    },
    {
        question: "Which programming language is widely used for data science and machine learning?",
        answers: [
            { text: " Java", correct: false},
            { text: "C++", correct: false },
            { text: "Python", correct: true },
            { text: " SQL", correct: false },
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