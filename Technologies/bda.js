const questions = [
    {
        question: "What is the primary challenge in analyzing Big Data?",
        answers: [
            { text: "Lack of skilled professionals", correct: false},
            { text: "Limited storage capacity", correct: false },
            { text: "High processing power requirements", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "Which of the following is not a characteristic of Big Data?",
        answers: [
            { text: "Velocity", correct: false},
            { text: "Variety", correct: false },
            { text: "Veracity", correct: true },
            { text: "Volume", correct: false },
        ]
    },
    {
        question: "Which of the following is a popular tool for Big Data analysis?",
        answers: [
            { text: "Microsoft Excel", correct: false},
            { text: "Apache Hadoop", correct: true },
            { text: "Google Sheets", correct: false },
            { text: " Microsoft Word", correct: false },
        ]
    },
    {
        question: "What is the purpose of data cleaning in Big Data analysis?",
        answers: [
            { text: "To remove duplicates", correct: false},
            { text: "To correct errors", correct: false },
            { text: "To standardize data formats", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "Which of the following is a common technique for handling missing values in Big Data?",
        answers: [
            { text: "Imputation", correct: false},
            { text: "Deletion", correct: false },
            { text: "Ignoring", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "What is the difference between supervised and unsupervised learning in Big Data analysis?",
        answers: [
            { text: "Supervised learning uses labeled data, while unsupervised learning uses unlabeled data.", correct: true },
            { text: "Supervised learning is used for prediction, while unsupervised learning is used for exploration.", correct: false },
            { text: "Supervised learning is more complex than unsupervised learning.", correct: false },
            { text: "All of the above", correct: false },
        ]
    },
    {
        question: "Which of the following is a common clustering algorithm used in Big Data analysis?",
        answers: [
            { text: "Linear Regression", correct: false},
            { text: "K-means", correct: true },
            { text: "Decision Tree", correct: false },
            { text: "Naive Bayes", correct: false },
        ]
    },
    {
        question: "What is the purpose of data visualization in Big Data analysis?",
        answers: [
            { text: "To make data more understandable", correct: false},
            { text: "To identify patterns and trends", correct: false },
            { text: "To communicate findings effectively", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "Which of the following is a common challenge in Big Data visualization?",
        answers: [
            { text: "Overloading the viewer with information", correct: false},
            { text: "Lack of appropriate tools", correct: false },
            { text: "Difficulty in visualizing high-dimensional data", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "What is the role of a data scientist in Big Data analysis?",
        answers: [
            { text: "To collect and store data", correct: false},
            { text: "To analyze data and extract insights", correct: true },
            { text: "To develop data visualization tools", correct: false },
            { text: "To manage the IT infrastructure", correct: false },
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