const questions = [
    {
        question: "What is the default file extension for Microsoft Excel documents?",
        answers: [
            { text: ".txt", correct: false},
            { text: ".doc", correct: false },
            { text: ".docx", correct: false },
            { text: ".xlsx", correct: true },
        ]
    },
    {
        question: "Which function is used to calculate the sum of a range of cells?",
        answers: [
            { text: "SUM", correct: true },
            { text: "AVERAGE", correct: false },
            { text: "COUNT", correct: false },
            { text: "MAX", correct: false },
        ]
    },
    {
        question: "How do you create a formula in Excel?",
        answers: [
            { text: "Start with an equal sign (=) ", correct: true },
            { text: " Start with a plus sign (+)", correct: false },
            { text: "Start with a minus sign (-) ", correct: false },
            { text: "Start with a question mark (?)", correct: false },
        ]
    },
    {
        question: "What is the difference between a relative cell reference and an absolute cell reference?",
        answers: [
            { text: " Relative cell references change when copied, while absolute cell references remain the same.", correct: true },
            { text: " Absolute cell references change when copied, while relative cell references remain the same. ", correct: false },
            { text: "Both types of references change when copied.", correct: false },
            { text: "Both types of references remain the same when copied.", correct: false },
        ]
    },
    {
        question: "How do you change the background color of a cell?",
        answers: [
            { text: " Use the Fill Color button in the Home tab. ", correct: true },
            { text: "Use the Font Color button in the Home tab. ", correct: false },
            { text: " Use the Number Format dropdown in the Home tab.", correct: false },
            { text: "Use the Alignment dropdown in the Home tab.", correct: false },
        ]
    },
    {
        question: "How do you create a chart in Excel?",
        answers: [
            { text: " Insert -> Chart", correct: true},
            { text: "Insert -> Table", correct: false },
            { text: "Insert -> Picture", correct: false },
            { text: " Insert -> Text Box", correct: false },
        ]
    },
    {
        question: "What is the purpose of the Freeze Panes feature?",
        answers: [
            { text: "To lock cells in place", correct: true },
            { text: " To hide cells", correct: false },
            { text: "To protect cells ", correct: false },
            { text: "To merge cells", correct: false },
        ]
    },
    {
        question: "What is a pivot table?",
        answers: [
            { text: "A type of chart", correct: false},
            { text: "A way to summarize data", correct: true },
            { text: "A type of formula", correct: false },
            { text: "A way to protect cells", correct: false },
        ]
    },
    {
        question: "How do you create a nested IF formula?",
        answers: [
            { text: " By using multiple IF functions within each other", correct: true },
            { text: "By using the AND function", correct: false },
            { text: "By using the OR function", correct: false },
            { text: "By using the SUM function", correct: false },
        ]
    },
    {
        question: "What is the purpose of the VLOOKUP function?",
        answers: [
            { text: "To look up a value in a table", correct: true },
            { text: "To calculate the average of a range of cells ", correct: false },
            { text: "To count the number of cells in a range", correct: false },
            { text: "To find the maximum value in a range", correct: false },
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