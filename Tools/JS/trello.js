const questions = [
    {
        question: "What is Trello primarily used for?",
        answers: [
            { text: "Creating complex mathematical models", correct: false},
            { text: "Developing web applications", correct: false },
            { text: "Data visualization and analysis", correct: false },
            { text: "Project management and collaboration", correct: true },
        ]
    },
    {
        question: "What are the basic building blocks of Trello?",
        answers: [
            { text: "Boards, lists, and cards", correct: true },
            { text: "Worksheets, charts, and graphs", correct: false },
            { text: "Databases, tables, and queries", correct: false },
            { text: "Documents, presentations, and spreadsheets", correct: false },
        ]
    },
    {
        question: "What is the purpose of a Trello board?",
        answers: [
            { text: "To represent a specific project or workflow", correct: true },
            { text: "To store files and documents", correct: false },
            { text: "To create visualizations", correct: false },
            { text: "To track progress on individual tasks", correct: false },
        ]
    },
    {
        question: "What is a Trello list used for?",
        answers: [
            { text: "To group related tasks together", correct: true},
            { text: "To store attachments and files", correct: false },
            { text: "To create visualizations", correct: false },
            { text: "To track progress on individual tasks", correct: false },
        ]
    },
    {
        question: "What is a Trello card used for?",
        answers: [
            { text: "To store attachments and files", correct: false},
            { text: "To represent a specific task or action", correct: true },
            { text: "To create visualizations", correct: false },
            { text: "To track progress on individual tasks", correct: false },
        ]
    },
    {
        question: "How can you add more details to a Trello card?",
        answers: [
            { text: "By creating new lists", correct: false},
            { text: "By changing the board", correct: false },
            { text: "By adding attachments", correct: false },
            { text: "By adding labels, checklists, and due dates", correct: true },
        ]
    },
    {
        question: "What is the purpose of labels in Trello?",
        answers: [
            { text: "To categorize cards based on different criteria", correct: true},
            { text: "To add attachments to cards", correct: false },
            { text: "To create new lists", correct: false },
            { text: "To change the board", correct: false },
        ]
    },
    {
        question: "How can you collaborate with others on a Trello board?",
        answers: [
            { text: "By creating a new board for each collaborator", correct: false},
            { text: "By sharing the board link publicly", correct: false },
            { text: "By inviting them to the board", correct: true },
            { text: "By using the comments feature", correct: false },
        ]
    },
    {
        question: "What is the purpose of Trello Power-Ups?",
        answers: [
            { text: "To create new boards", correct: false},
            { text: "To change the board layout", correct: false },
            { text: "To add attachments to cards", correct: false },
            { text: "To add extra features and functionality to Trello", correct: true },
        ]
    },
    {
        question: "Can you integrate Trello with other tools like Slack or Google Drive?",
        answers: [
            { text: "Yes", correct: true},
            { text: "No", correct: false },
            { text: "Only if you have a paid Trello account", correct: false },
            { text: "Only if you have a Trello Enterprise plan", correct: false },
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