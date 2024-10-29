const questions = [
    {
        question: "What does npm stand for?",
        answers: [
            { text: "Network Package Manager", correct: false},
            { text: "Node Package Manager", correct: true },
            { text: "Node Platform Module", correct: false },
            { text: "Network Platform Module", correct: false },
        ]
    },
    {
        question: "What is the primary function of npm?",
        answers: [
            { text: "To create and manage Node.js projects", correct: false},
            { text: "To install and update packages for Node.js applications", correct: true },
            { text: "To develop web applications", correct: false },
            { text: "To debug Node.js code", correct: false },
        ]
    },
    {
        question: "Which command is used to install a package from the npm registry?",
        answers: [
            { text: "npm create", correct: false},
            { text: "npm init", correct: false },
            { text: "npm install", correct: true },
            { text: " npm start", correct: false },
        ]
    },
    {
        question: "What is the file that contains the dependencies and scripts for a Node.js project?",
        answers: [
            { text: "package.json", correct: true },
            { text: "package-lock.json", correct: false },
            { text: "index.js", correct: false },
            { text: "README.md", correct: false },
        ]
    },
    {
        question: "How can you update a package to its latest version?",
        answers: [
            { text: "npm update", correct: true},
            { text: "npm upgrade", correct: false },
            { text: "npm refresh", correct: false },
            { text: "npm reinstall", correct: false },
        ]
    },
    {
        question: "What is the purpose of the --save-dev flag when installing a package?",
        answers: [
            { text: "To save the package as a dependency for production", correct: false },
            { text: "To install the package globally", correct: false },
            { text: "To remove the package", correct: false },
            { text: "To save the package as a dependency for development", correct: true},
        ]
    },
    {
        question: "How do you run a script defined in the package.json file?",
        answers: [
            { text: "npm start <script name>", correct: false},
            { text: "node <script name>", correct: false },
            { text: "npm run <script name>", correct: true },
            { text: "npm execute <script name>", correct: false },
        ]
    },
    {
        question: "What is the command to create a new Node.js project?",
        answers: [
            { text: "npm create", correct: false},
            { text: "npm init", correct: true },
            { text: "npm install", correct: false },
            { text: "npm start", correct: false },
        ]
    },
    {
        question: "How can you search for a package on the npm registry?",
        answers: [
            { text: "npm search <package name>", correct: true},
            { text: "npm find <package name>", correct: false },
            { text: "npm locate <package name>", correct: false },
            { text: "npm query <package name>", correct: false },
        ]
    },
    {
        question: "What is the command to publish a package to the npm registry?",
        answers: [
            { text: "npm publish", correct: true},
            { text: "npm upload", correct: false },
            { text: "npm release", correct: false },
            { text: "npm distribute", correct: false },
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