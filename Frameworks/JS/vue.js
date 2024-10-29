const questions = [
    {
        question: "What is the primary purpose of Vue.js?",
        answers: [
            { text: "To create server-side web applications", correct: false},
            { text: "To build user interfaces for web applications", correct: true },
            { text: "To manage databases", correct: false },
            { text: "To handle network requests", correct: false },
        ]
    },
    {
        question: "Which core concept of Vue.js allows you to declaratively render the UI?",
        answers: [
            { text: "Components", correct: false},
            { text: " Templates", correct: true },
            { text: " Directives", correct: false },
            { text: " Data binding", correct: false },
        ]
    },
    {
        question: "What is the primary way to pass data down from a parent component to its children in Vue.js?",
        answers: [
            { text: "Props", correct: true},
            { text: "State", correct: false },
            { text: "Slots", correct: false },
            { text: "Events", correct: false },
        ]
    },
    {
        question: "Which Vue.js feature enables reactive data binding between the component's data and the rendered template?",
        answers: [
            { text: "Computed properties", correct: true},
            { text: "Watchers", correct: false },
            { text: "Lifecycle hooks", correct: false },
            { text: "Directives", correct: false },
        ]
    },
    {
        question: "What is the purpose of the v-if directive in Vue.js?",
        answers: [
            { text: "To render a block of content conditionally", correct: true},
            { text: " To bind a value to an element attribute", correct: false },
            { text: "To create custom directives", correct: false },
            { text: "To handle form submissions", correct: false },
        ]
    },
    {
        question: "Which Vue.js method is used to update the component's data?",
        answers: [
            { text: "setData", correct: false},
            { text: "update", correct: false },
            { text: "this.$set", correct: true },
            { text: "this.$data", correct: false },
        ]
    },
    {
        question: "What is the primary difference between a component and a mixin in Vue.js?",
        answers: [
            { text: " Components are reusable building blocks, while mixins are used to share code between components.", correct: true},
            { text: "Components are used for data binding, while mixins are used for event handling.", correct: false },
            { text: "Components are used for styling, while mixins are used for logic.", correct: false },
            { text: "There is no difference between components and mixins.", correct: false },
        ]
    },
    {
        question: "Which Vue.js feature allows you to create custom directives?",
        answers: [
            { text: "Directives", correct: true},
            { text: "Mixins", correct: false },
            { text: "Components", correct: false },
            { text: "Computed properties", correct: false },
        ]
    },
    {
        question: "What is the purpose of the v-for directive in Vue.js?",
        answers: [
            { text: "To create custom directives", correct: false},
            { text: "To render a list of items based on an array", correct: true },
            { text: " To handle form submissions", correct: false },
            { text: " To bind a value to an element attribute", correct: false },
        ]
    },
    {
        question: "Which Vue.js feature is used to define custom event handlers?",
        answers: [
            { text: "Directives", correct: false},
            { text: "Mixins", correct: false },
            { text: "Components", correct: false },
            { text: "Events", correct: true },
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