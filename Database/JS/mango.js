const questions = [
    {
        question: "What type of database is MongoDB?",
        answers: [
            { text: "Relational Database", correct: false},
            { text: "NoSQL Database ", correct: true },
            { text: "Object-Relational Database", correct: false },
            { text: "Graph Database", correct: false },
        ]
    },
    {
        question: "Which data model does MongoDB use?",
        answers: [
            { text: " Document", correct: true },
            { text: "Relational", correct: false },
            { text: "Hierarchical", correct: false },
            { text: "Graph", correct: false },
        ]
    },
    {
        question: "How are data stored in MongoDB?",
        answers: [
            { text: "As rows and columns", correct: false},
            { text: "As key-value pairs", correct: false },
            { text: "As documents with fields and values ", correct: true },
            { text: "As nodes and relationships", correct: false },
        ]
    },
    {
        question: "What is the primary unit of data storage in MongoDB?",
        answers: [
            { text: "Table", correct: false},
            { text: "Record", correct: false },
            { text: "Collection", correct: false },
            { text: "Document", correct: true },
        ]
    },
    {
        question: "How do you create a new collection in MongoDB?",
        answers: [
            { text: "db.createCollection(\"collection_name\")", correct: true },
            { text: " CREATE COLLECTION collection_name ", correct: false },
            { text: " USE collection_name ", correct: false },
            { text: " INSERT INTO collection_name", correct: false },
        ]
    },
    {
        question: "What is the equivalent of a SQL JOIN operation in MongoDB?",
        answers: [
            { text: "Aggregate pipeline", correct: false},
            { text: " Lookup stage", correct: true },
            { text: " $match stage", correct: false },
            { text: " $project stage", correct: false },
        ]
    },
    {
        question: "How do you query for documents with a specific field value in MongoDB?",
        answers: [
            { text: "db.collection_name.find({field_name: value})", correct: true },
            { text: " SELECT * FROM collection_name WHERE field_name = value", correct: false },
            { text: "db.collection_name.select(field_name, value)", correct: false },
            { text: " db.collection_name.filter(field_name == value)", correct: false },
        ]
    },
    {
        question: "What is the purpose of indexing in MongoDB?",
        answers: [
            { text: "To improve query performance ", correct: true },
            { text: " To store data in a specific format", correct: false },
            { text: " To create relationships between documents", correct: false },
            { text: " To enforce data integrity", correct: false },
        ]
    },
    {
        question: "How do you create a compound index in MongoDB?",
        answers: [
            { text: "db.collection_name.createIndex({field1: 1, field2: -1})", correct: false},
            { text: "CREATE INDEX index_name ON collection_name(field1, field2)", correct: false },
            { text: " db.collection_name.ensureIndex({field1: 1, field2: -1})", correct: false },
            { text: "All of the above", correct: false },
        ]
    },
    {
        question: "What is the difference between MongoDB Atlas and MongoDB Community Server?",
        answers: [
            { text: "Atlas is a cloud-based service, while Community Server is an on-premises installation.", correct: false},
            { text: "Community Server is a cloud-based service, while Atlas is an on-premises installation.", correct: false },
            { text: "Both are the same", correct: false },
            { text: "Neither is a MongoDB product.", correct: false },
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