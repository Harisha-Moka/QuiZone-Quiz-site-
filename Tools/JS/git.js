const questions = [
    {
        question: "What is Git primarily used for?",
        answers: [
            { text: "Creating and managing spreadsheets", correct: false},
            { text: "Developing and maintaining websites", correct: false },
            { text: "Writing and editing documents", correct: false },
            { text: "Version control of software projects", correct: true },
        ]
    },
    {
        question: "Which command is used to create a new Git repository?",
        answers: [
            { text: "git init", correct: true},
            { text: "git clone", correct: false },
            { text: "git add", correct: false },
            { text: "git commit", correct: false },
        ]
    },
    {
        question: "What is the purpose of the .gitignore file?",
        answers: [
            { text: "To list files that should be ignored by Git", correct: true},
            { text: "To store the commit history", correct: false },
            { text: "To create branches", correct: false },
            { text: "To merge changes from different branches", correct: false },
        ]
    },
    {
        question: "Which command is used to stage changes for a commit?",
        answers: [
            { text: "git add", correct: true},
            { text: "git commit", correct: false },
            { text: "git push", correct: false },
            { text: "git pull", correct: false },
        ]
    },
    {
        question: "What is a branch in Git?",
        answers: [
            { text: "A snapshot of the repository at a specific point in time", correct: false},
            { text: "A parallel version of the repository", correct: true },
            { text: "A remote repository", correct: false },
            { text: "A local repository", correct: false },
        ]
    },
    {
        question: "Which command is used to create a new branch?",
        answers: [
            { text: "git branch", correct: true},
            { text: "git checkout", correct: false },
            { text: "git merge", correct: false },
            { text: "git pull", correct: false },
        ]
    },
    {
        question: "How do you switch to an existing branch in Git?",
        answers: [
            { text: "git branch <branch_name>", correct: false},
            { text: "git checkout <branch_name>", correct: true },
            { text: "git merge <branch_name>", correct: false },
            { text: "git pull <branch_name>", correct: false },
        ]
    },
    {
        question: "What is the purpose of the git remote add command?",
        answers: [
            { text: "To add a remote repository to your local repository", correct: true },
            { text: "To create a new branch", correct: false },
            { text: "To stage changes for a commit", correct: false },
            { text: "To merge changes from different branches", correct: false },
        ]
    },
    {
        question: "Which command is used to push changes from your local repository to a remote repository?",
        answers: [
            { text: "git add", correct: false},
            { text: "git commit", correct: false },
            { text: "git push", correct: true },
            { text: "git pull", correct: false },
        ]
    },
    {
        question: "What is the purpose of the git pull command?",
        answers: [
            { text: "To pull changes from a remote repository to your local repository", correct: true},
            { text: "To create a new branch", correct: false },
            { text: "To stage changes for a commit", correct: false },
            { text: "To merge changes from different branches", correct: false },
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