questions = [
    {
        question: "What is the default data type for a column in a PostgreSQL table?",
        answers: [
            { text: " VARCHAR", correct: true},
            { text: "INT", correct: false },
            { text: "DATE", correct: false },
            { text: "TEXT", correct: false },
        ]
    },
    {
        question: "Which SQL statement is used to create a new database in PostgreSQL?",
        answers: [
            { text: "CREATE TABLE", correct: false},
            { text: "CREATE DATABASE", correct: true },
            { text: "CREATE SCHEMA", correct: false },
            { text: "CREATE INDEX", correct: false },
        ]
    },
    {
        question: "How do you select all columns and rows from a table named \"customers\" in PostgreSQL?",
        answers: [
            { text: "SELECT * FROM customers ", correct: true },
            { text: "SELECT customers FROM * ", correct: false },
            { text: "SELECT customers", correct: false },
            { text: "FROM customers SELECT *", correct: false },
        ]
    },
    {
        question: "Which SQL statement is used to insert a new row into a table in PostgreSQL?",
        answers: [
            { text: "INSERT INTO", correct: true},
            { text: "UPDATE", correct: false },
            { text: "DELETE", correct: false },
            { text: "CREATE", correct: false },
        ]
    },
    {
        question: "What is the purpose of a primary key in a PostgreSQL table?",
        answers: [
            { text: "To uniquely identify each row ", correct: true },
            { text: "To store the data type of each column", correct: false },
            { text: "To create relationships between tables ", correct: false },
            { text: "To format the appearance of the table", correct: false },
        ]
    },
    {
        question: "How do you create a foreign key constraint in PostgreSQL?",
        answers: [
            { text: " FOREIGN KEY (column_name) REFERENCES table_name(column_name)", correct: false},
            { text: "CONSTRAINT foreign_key_name FOREIGN KEY (column_name) REFERENCES table_name(column_name)", correct: false },
            { text: "ALTER TABLE table_name ADD FOREIGN KEY (column_name) REFERENCES table_name(column_name)", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "What is the difference between a JOIN and a UNION operation in PostgreSQL?",
        answers: [
            { text: "JOIN combines rows from multiple tables based on a related column, while UNION combines all rows from multiple tables. ", correct: true },
            { text: "UNION combines rows from multiple tables based on a related column, while JOIN combines all rows from multiple tables.", correct: false },
            { text: "Both JOIN and UNION combine rows from multiple tables based on a related column.", correct: false },
            { text: "Neither JOIN nor UNION combine rows from multiple tables.", correct: false },
        ]
    },
    {
        question: "What is a materialized view in PostgreSQL?",
        answers: [
            { text: "A precompiled SQL statement ", correct: false},
            { text: "A temporary table ", correct: false },
            { text: "A database trigger", correct: false },
            { text: "A view whose data is precomputed and stored", correct: true },
        ]
    },
    {
        question: "How do you create an index in PostgreSQL?",
        answers: [
            { text: " CREATE INDEX index_name ON table_name(column_name)", correct: false},
            { text: " ALTER TABLE table_name ADD INDEX index_name(column_name) ", correct: false },
            { text: "Both a and b", correct: true },
            { text: "Neither a nor b", correct: false },
        ]
    },
    {
        question: "What is the purpose of the EXPLAIN ANALYZE command in PostgreSQL?",
        answers: [
            { text: "To explain the structure of a table ", correct: false},
            { text: "To explain the syntax of an SQL statement ", correct: false },
            { text: "To explain the execution plan and performance of an SQL statement", correct: true },
            { text: "To explain the data types of columns in a table", correct: false },
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