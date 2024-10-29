const questions = [
    {
        question: "What is Tableau primarily used for?",
        answers: [
            { text: "Creating complex mathematical models", correct: false},
            { text: "Developing web applications", correct: false },
            { text: "Data visualization and analysis", correct: true },
            { text: "Programming databases", correct: false },
        ]
    },
    {
        question: "Which component of Tableau is used to connect to data sources?",
        answers: [
            { text: "Dashboard", correct: false},
            { text: "Worksheet", correct: false },
            { text: "Data Source", correct: true },
            { text: "View", correct: false },
        ]
    },
    {
        question: "What is the basic unit of analysis in Tableau?",
        answers: [
            { text: "Row", correct: false},
            { text: "Column", correct: false },
            { text: "Mark", correct: true },
            { text: "Field", correct: false },
        ]
    },
    {
        question: "Which type of chart is best suited for showing trends over time?",
        answers: [
            { text: "Bar chart", correct: false},
            { text: "Pie chart", correct: false },
            { text: "Line chart", correct: true },
            { text: "Scatter plot", correct: false },
        ]
    },
    {
        question: "What is the purpose of filters in Tableau?",
        answers: [
            { text: "To change the data source", correct: false},
            { text: "To limit the data displayed", correct: true },
            { text: "To modify the chart type", correct: false },
            { text: "To create new calculations", correct: false },
        ]
    },
    {
        question: "Which Tableau feature allows you to create interactive dashboards?",
        answers: [
            { text: "Filters", correct: false},
            { text: "Calculations", correct: false },
            { text: "Legends", correct: false },
            { text: " Actions", correct: true },
        ]
    },
    {
        question: "What is the difference between a discrete and continuous dimension?",
        answers: [
            { text: "Discrete dimensions have a finite number of values, while continuous dimensions have an infinite number of values.", correct: true},
            { text: "Discrete dimensions are used for categorical data, while continuous dimensions are used for numerical data.", correct: false },
            { text: "Discrete dimensions are used for numerical data, while continuous dimensions are used for categorical data.", correct: false },
            { text: "There is no difference between discrete and continuous dimensions.", correct: false },
        ]
    },
    {
        question: "There is no difference between discrete and continuous dimensions.",
        answers: [
            { text: "AVG", correct: false},
            { text: "SUM", correct: true },
            { text: "COUNT", correct: false },
            { text: "MIN", correct: false },
        ]
    },
    {
        question: "What is a calculated field in Tableau?",
        answers: [
            { text: "A field created by combining existing fields using mathematical operations or logical expressions.", correct: true},
            { text: "A field that is part of the original data source", correct: false },
            { text: "A field that determines the order of data in a visualization.", correct: false },
            { text: "A field that is used to filter data.", correct: false },
        ]
    },
    {
        question: "Which Tableau feature allows you to annotate visualizations with text or shapes?",
        answers: [
            { text: "Labels", correct: false},
            { text: "Tooltips", correct: false },
            { text: "Legends", correct: false },
            { text: " Markings", correct: true },
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