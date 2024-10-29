const questions = [
    {
        question: "What is the primary purpose of Pega Platform?",
        answers: [
            { text: "To develop web applications", correct: false},
            { text: "To create mobile apps", correct: false },
            { text: "To build customer-centric applications", correct: true },
            { text: "To design user interfaces", correct: false },
        ]
    },
    {
        question: "Which Pega component is used to define the business logic and rules of an application?",
        answers: [
            { text: "Case Manager", correct: false},
            { text: "Decision Tree", correct: true },
            { text: "Activity", correct: false },
            { text: "Flow", correct: false },
        ]
    },
    {
        question: "What is a Pega case used for?",
        answers: [
            { text: "To represent a customer interaction or business process", correct: true},
            { text: "To store data", correct: false },
            { text: "To define user interfaces", correct: false },
            { text: "To implement security rules", correct: false },
        ]
    },
    {
        question: "Which Pega feature allows for the creation of reusable components?",
        answers: [
            { text: "Activity", correct: true },
            { text: "Flow", correct: false },
            { text: "Data Transform", correct: false },
            { text: "Work Party", correct: false },
        ]
    },
    {
        question: "What is the purpose of a Pega Work Party?",
        answers: [
            { text: "To define the roles and responsibilities of users", correct: true },
            { text: "To store data", correct: false },
            { text: "To implement security rules", correct: false },
            { text: "To create user interfaces", correct: false },
        ]
    },
    {
        question: "Which Pega component is used to design user interfaces?",
        answers: [
            { text: "Case Manager", correct: false},
            { text: "Decision Tree", correct: false },
            { text: "Activity", correct: false },
            { text: "Flow", correct: true },
        ]
    },
    {
        question: "What is the Pega Process Commander used for?",
        answers: [
            { text: "To develop and manage Pega applications", correct: true},
            { text: "To store data", correct: false },
            { text: "To define user interfaces", correct: false },
            { text: "To implement security rules", correct: false },
        ]
    },
    {
        question: "Which Pega feature allows for the integration with external systems?",
        answers: [
            { text: "Connectors", correct: true},
            { text: "Flows", correct: false },
            { text: "Activities", correct: false },
            { text: "Data Transforms", correct: false },
        ]
    },
    {
        question: "What is a Pega rule set used for?",
        answers: [
            { text: "To group related rules together", correct: true},
            { text: "To store data", correct: false },
            { text: "To define user interfaces", correct: false },
            { text: "To implement security rules", correct: false },
        ]
    },
    {
        question: "Which Pega component is used to define the data structure of a case?",
        answers: [
            { text: "Decision Tree", correct: false},
            { text: "Activity", correct: false },
            { text: "Case Type", correct: frameElement },
            { text: "Flow", correct: false },
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