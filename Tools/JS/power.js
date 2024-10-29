const questions = [
    {
        question: "What is the primary purpose of Power BI?",
        answers: [
            { text: "To create and manage databases", correct: false},
            { text: "To develop web applications", correct: false },
            { text: "To analyze and visualize data", correct: true },
            { text: "To write code", correct: false },
        ]
    },
    {
        question: "Which component of Power BI is used to import and transform data?",
        answers: [
            { text: "Power BI Desktop", correct: false},
            { text: "Power BI Service", correct: false },
            { text: "Power Query", correct: true },
            { text: "Power Pivot", correct: false },
        ]
    },
    {
        question: "What is a data model in Power BI?",
        answers: [
            { text: "A visual representation of a dataset", correct: false},
            { text: "A collection of related tables", correct: true },
            { text: "A measure used for calculations", correct: false },
            { text: "A type of chart", correct: false },
        ]
    },
    {
        question: "Which type of chart is best suited for showing trends over time?",
        answers: [
            { text: "Bar chart", correct: false},
            { text: "Line chart", correct: true },
            { text: "Pie chart", correct: false },
            { text: "Scatter plot", correct: false },
        ]
    },
    {
        question: "What is a DAX measure used for?",
        answers: [
            { text: "To create calculated fields", correct: true },
            { text: "To import data", correct: false },
            { text: "To design dashboards", correct: false },
            { text: "To create visualizations", correct: false },
        ]
    },
    {
        question: "What is the purpose of a Power BI dashboard?",
        answers: [
            { text: "To store data", correct: false},
            { text: "To create visualizations", correct: false },
            { text: "To present a collection of reports and visualizations", correct: true },
            { text: "To import data", correct: false },
        ]
    },
    {
        question: "Which type of visualization is best suited for comparing multiple categories?",
        answers: [
            { text: "Bar chart", correct: true },
            { text: "Line chart", correct: false },
            { text: "Pie chart", correct: false },
            { text: "Scatter plot", correct: false },
        ]
    },
    {
        question: "What is the purpose of a data relationship in Power BI?",
        answers: [
            { text: "To connect tables based on common fields", correct: true },
            { text: "To create visualizations", correct: false },
            { text: "To import data", correct: false },
            { text: "To calculate measures", correct: false },
        ]
    },
    {
        question: "Which Power BI feature allows you to create interactive reports and dashboards?",
        answers: [
            { text: "Power Query", correct: false},
            { text: "Power Pivot", correct: false },
            { text: "Power View", correct: true },
            { text: "Power BI Desktop", correct: false },
        ]
    },
    {
        question: "What is the primary advantage of using Power BI over other data analysis tools?",
        answers: [
            { text: "It is free", correct: false},
            { text: "It is easy to use", correct: true },
            { text: "It is only available for Windows", correct: false },
            { text: "It requires advanced programming skills", correct: false },
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