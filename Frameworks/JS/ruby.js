const questions = [
    {
        question: "What is the primary purpose of the Gemfile in a Rails application?",
        answers: [
            { text: "To define the application's database schema", correct: false},
            { text: " To specify the application's routing rules", correct: false },
            { text: "To list the dependencies and their versions that the application requires", correct: true },
            { text: "To configure the application's environment variables", correct: false },
        ]
    },
    {
        question: "Which of the following is not a core component of a Rails application?",
        answers: [
            { text: "Model", correct: false},
            { text: "View", correct: false },
            { text: "Controller", correct: false },
            { text: "Gem", correct: true },
        ]
    },
    {
        question: "What is the convention for naming a Rails model class?",
        answers: [
            { text: "Using all lowercase letters and underscores", correct: false},
            { text: "Using CamelCase with the first letter capitalized", correct: true },
            { text: "Using all uppercase letters", correct: false },
            { text: "Using kebab-case with hyphens separating words", correct: false },
        ]
    },
    {
        question: "How do you generate a new migration in Rails?",
        answers: [
            { text: "rails generate migration Create[ModelName]", correct: true },
            { text: "rails new migration [ModelName]", correct: false },
            { text: "rails create migration [ModelName]", correct: false },
            { text: "rails migration generate [ModelName]", correct: false },
        ]
    },
    {
        question: "What is the purpose of the scaffold generator in Rails?",
        answers: [
            { text: "To generate a basic CRUD interface for a model", correct: true},
            { text: "To create a new Rails application", correct: false },
            { text: "To generate a new migration", correct: false },
            { text: "To initialize a new Git repository", correct: false },
        ]
    },
    {
        question: "Which method is used to render a view in a Rails controller?",
        answers: [
            { text: "show", correct: false },
            { text: "render", correct: false},
            { text: "display", correct: false },
            { text: "view", correct: false },
        ]
    },
    {
        question: "What is the convention for naming a Rails controller?",
        answers: [
            { text: "Using all lowercase letters and underscores", correct: false},
            { text: " Using all uppercase letters", correct: false },
            { text: "Using CamelCase with the first letter capitalized", correct: true },
            { text: "Using kebab-case with hyphens separating words", correct: false },
        ]
    },
    {
        question: "What is the purpose of the ActiveRecord gem in Rails?",
        answers: [
            { text: "To handle web requests and responses", correct: false},
            { text: "To manage the application's routing", correct: false },
            { text: "To provide template rendering functionality", correct: false },
            { text: "To provide object-relational mapping (ORM) capabilities", correct: true },
        ]
    },
    {
        question: "How do you create a new Rails application?",
        answers: [
            { text: "rails new [App Name]", correct: true},
            { text: "create rails [App Name]", correct: false },
            { text: "rails generate [App Name]", correct: false },
            { text: "new rails [App Name]", correct: false },
        ]
    },
    {
        question: "What is the default database used by Rails?",
        answers: [
            { text: "PostgreSQL", correct: false},
            { text: "MySQL", correct: false },
            { text: "SQLite", correct: true },
            { text: "MangoDB", correct: false },
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