const questions = [
    {
        question: "What is the primary purpose of Angular?",
        answers: [
            { text: "To create server-side web applications", correct: false},
            { text: " To build user interfaces for web applications", correct: true },
            { text: "To manage databases", correct: false },
            { text: "To handle network requests", correct: false },
        ]
    },
    {
        question: "Which core concept of Angular is used to define the structure and behavior of an application?",
        answers: [
            { text: "Components", correct: true},
            { text: " Directives", correct: false },
            { text: "Services", correct: false },
            { text: "Modules", correct: false },
        ]
    },
    {
        question: "What is the primary way to pass data down from a parent component to its children in Angular?",
        answers: [
            { text: "@Input() decorator", correct: true},
            { text: "@Output() decorator", correct: false },
            { text: " Services", correct: false },
            { text: "Pipes", correct: false },
        ]
    },
    {
        question: "Which Angular concept allows you to reuse functionality across multiple components?",
        answers: [
            { text: "Components", correct: false},
            { text: "Directives", correct: false },
            { text: "Services", correct: true },
            { text: "Modules", correct: false },
        ]
    },
    {
        question: "What is the purpose of the @NgModule decorator in Angular?",
        answers: [
            { text: "To define a component", correct: false},
            { text: "To define a service", correct: false },
            { text: " To define a module", correct: true },
            { text: " To define a directive", correct: false },
        ]
    },
    {
        question: "Which Angular concept is used to transform data before it is displayed in the template?",
        answers: [
            { text: "Components", correct: false},
            { text: "Directives", correct: false },
            { text: "Services", correct: false },
            { text: "Pipes", correct: true },
        ]
    },
    {
        question: "What is the primary difference between a component and a directive in Angular?",
        answers: [
            { text: "Components have a template, while directives do not.", correct: true},
            { text: "Directives have a template, while components do not.", correct: false },
            { text: "Components are used for structural changes, while directives are used for behavioral changes.", correct: false },
            { text: " Components are used for behavioral changes, while directives are used for structural changes.", correct: false },
        ]
    },
    {
        question: "Which Angular concept is used to handle asynchronous operations like data fetching?",
        answers: [
            { text: "Observables", correct: true},
            { text: "Promises", correct: false },
            { text: "Callbacks", correct: false },
            { text: "All of the above", correct: false },
        ]
    },
    {
        question: "What is the purpose of the routerLink directive in Angular?",
        answers: [
            { text: "To navigate to a different route", correct: true},
            { text: " To define a component", correct: false },
            { text: "To handle form submissions", correct: false },
            { text: "To create custom directives", correct: false },
        ]
    },
    {
        question: "Which Angular concept is used to inject dependencies into a component or service?",
        answers: [
            { text: "Dependency injection", correct: true},
            { text: "Data binding", correct: false },
            { text: "Pipes", correct: false },
            { text: "Modules", correct: false },
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