const questions = [
    {
        question: "What is the primary purpose of Microsoft Access?",
        answers: [
            { text: " Word processing", correct: false},
            { text: "Spreadsheet creation ", correct: false },
            { text: "Presentation design ", correct: false },
            { text: "Database management", correct: true },
        ]
    },
    {
        question: "Which feature in Access allows you to create new tables?",
        answers: [
            { text: "Create -> Table", correct: true },
            { text: "Insert -> Table", correct: false },
            { text: "Design -> Table", correct: false },
            { text: "Home -> New Table", correct: false },
        ]
    },
    {
        question: "How do you add a new field to a table in Access?",
        answers: [
            { text: "Design view -> Add Field", correct: true},
            { text: "Datasheet view -> Right-click -> Add Field", correct: false },
            { text: "Create -> Table -> Add Field", correct: false },
            { text: "None of the above", correct: false },
        ]
    },
    {
        question: "What is the purpose of a primary key in a table?",
        answers: [
            { text: " To uniquely identify each record in the table", correct: true },
            { text: "To store the data type of each field ", correct: false },
            { text: "To create relationships between tables ", correct: false },
            { text: "To format the appearance of the table", correct: false },
        ]
    },
    {
        question: "How do you change the data type of a field in Access?",
        answers: [
            { text: "Design view -> Field Properties", correct: true },
            { text: "Datasheet view -> Right-click -> Change Data Type ", correct: false },
            { text: " Create -> Table -> Change Data Type ", correct: false },
            { text: "None of the above", correct: false },
        ]
    },
    {
        question: "What is the difference between a query and a form in Access?",
        answers: [
            { text: "A query is used to retrieve specific data from tables, while a form is used to enter and edit data.", correct: true },
            { text: "A form is used to retrieve specific data from tables, while a query is used to enter and edit data.", correct: false },
            { text: " Both are the same thing.", correct: false },
            { text: "Neither is used in Access.", correct: false },
        ]
    },
    {
        question: "How do you create a relationship between two tables in Access?",
        answers: [
            { text: "Tools -> Relationships", correct: true },
            { text: "Design -> Relationships ", correct: false },
            { text: " Create -> Relationships", correct: false },
            { text: "None of the above", correct: false },
        ]
    },
    {
        question: "What is a data macro in Access?",
        answers: [
            { text: " A script that automates tasks in Access ", correct: true },
            { text: "A way to create relationships between tables", correct: false },
            { text: "A way to format the appearance of a table", correct: false },
            { text: "A way to create queries", correct: false },
        ]
    },
    {
        question: "How do you create a report in Access?",
        answers: [
            { text: " Create -> Report ", correct: true },
            { text: " Design -> Report ", correct: false },
            { text: " Tools -> Report ", correct: false },
            { text: "None of the above", correct: false },
        ]
    },
    {
        question: "What is the purpose of the Access Developer Tools?",
        answers: [
            { text: "To create custom user interfaces ", correct: true },
            { text: "To manage databases ", correct: false },
            { text: "To create queries", correct: false },
            { text: "To format the appearance of tables", correct: false },
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