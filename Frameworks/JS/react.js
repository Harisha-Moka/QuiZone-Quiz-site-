const questions = [
    {
        question: "What is the primary purpose of React.js?",
        answers: [
            { text: "To create server-side web applications", correct: false},
            { text: "To build user interfaces for web applications", correct: true },
            { text: "To manage databases", correct: false },
            { text: "To handle network requests", correct: false },
            
        ]
    },
    {
        question: "Which core concept of React.js enables efficient updates to the UI?",
        answers: [
            { text: " Components", correct: false},
            { text: " Virtual DOM", correct: true },
            { text: "Props", correct: false },
            { text: "State", correct: false },
        ]
    },
    {
        question: "What is the primary way to pass data down from a parent component to its children in React.js?",
        answers: [
            { text: "Props", correct: true},
            { text: " State", correct: false },
            { text: "Context", correct: false },
            { text: "Refs", correct: false },
        ]
    },
    {
        question: "Which lifecycle method is called only once when a component is first mounted to the DOM?",
        answers: [
            { text: "componentDidMount", correct: true},
            { text: "componentWillMount", correct: false },
            { text: "componentDidUpdate", correct: false },
            { text: "componentWillUnmount", correct: false },
        ]
    },
    {
        question: "What is the purpose of the useState hook in React.js?",
        answers: [
            { text: "To manage component state", correct: true },
            { text: "To define custom hooks", correct: false },
            { text: "To handle side effects", correct: false },
            { text: "To render components conditionally", correct: false },
        ]
    },
    {
        question: "Which React.js concept allows you to reuse components across different parts of your application?",
        answers: [
            { text: "Components", correct: true},
            { text: "Props", correct: false },
            { text: "State", correct: false },
            { text: "Context", correct: false },
        ]
    },
    {
        question: "What is the primary difference between a class component and a functional component in React.js?",
        answers: [
            { text: "Class components use state and lifecycle methods, while functional components use hooks.", correct: true },
            { text: "Class components are more performant than functional components.", correct: false },
            { text: "Functional components can only be used for presentational logic.", correct: false },
            { text: "Class components are more complex to write than functional components.", correct: false },
        ]
    },
    {
        question: "Which React.js hook is used to handle side effects like data fetching or subscriptions?",
        answers: [
            { text: "useState", correct: false},
            { text: "useEffect", correct: true },
            { text: "useContext", correct: false },
            { text: "useReducer", correct: false },
        ]
    },
    {
        question: "What is the purpose of the key prop in React.js when rendering lists?",
        answers: [
            { text: "To provide a unique identifier for each list item", correct: true},
            { text: "To determine the order of list items", correct: false },
            { text: "To set the style of list items", correct: false },
            { text: "To add event handlers to list items", correct: false },
        ]
    },
    {
        question: "Which React.js concept allows you to share data across multiple components without passing props through intermediate components?",
        answers: [
            { text: "Components", correct: false},
            { text: "Props", correct: false },
            { text: "State", correct: false },
            { text: " Context", correct: true },
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