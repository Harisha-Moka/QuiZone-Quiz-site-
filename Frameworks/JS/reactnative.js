const questions = [
    {
        question: "What is the primary purpose of React Native?",
        answers: [
            { text: "To create cross-platform web applications", correct: false},
            { text: "To build native mobile applications for iOS and Android", correct: true },
            { text: "To develop server-side applications", correct: false },
            { text: "To design user interfaces for desktop applications", correct: false },
        ]
    },
    {
        question: "Which of the following is NOT a core component in React Native?",
        answers: [
            { text: "Text", correct: false},
            { text: "View", correct: false },
            { text: "Image", correct: false },
            { text: " Button", correct: false },
            { text: "All of the above are core components", correct: true },
        ]
    },
    {
        question: "How do you pass data from a parent component to a child component in React Native?",
        answers: [
            { text: "Using props", correct: true },
            { text: "Using state", correct: false },
            { text: "Using context", correct: false },
            { text: "Using callbacks", correct: false },
        ]
    },
    {
        question: "What is the primary method for managing state in a React Native component?",
        answers: [
            { text: "Using props", correct: false},
            { text: "Using callbacks", correct: false },
            { text: "Using the useState hook", correct: true },
            { text: "Using the setState method", correct: false },
        ]
    },
    {
        question: "Which navigation library is commonly used in React Native?",
        answers: [
            { text: "React Router", correct: false},
            { text: "React Navigation", correct: true },
            { text: "Redux", correct: false },
            { text: "Axios", correct: false },
        ]
    },
    {
        question: "How do you style components in React Native?",
        answers: [
            { text: "Using CSS", correct: false},
            { text: "Using inline styles", correct: false },
            { text: "Using a separate stylesheet file", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "What is the purpose of the useEffect hook in React Native?",
        answers: [
            { text: "To manage state", correct: false},
            { text: "To handle side effects like API calls or subscriptions", correct: true },
            { text: " To render components", correct: false },
            { text: "To create custom hooks", correct: false },
        ]
    },
    {
        question: "Which of the following is a popular state management library for React Native?",
        answers: [
            { text: "Redux", correct: false},
            { text: "Context API", correct: false },
            { text: "MobX", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "How do you create a new React Native project?",
        answers: [
            { text: "Using the create-react-app command", correct: false},
            { text: "Using the react-native init command", correct: true },
            { text: "By cloning a template repository", correct: false },
            { text: " All of the above", correct: false },
        ]
    },
    {
        question: "What is the primary advantage of using React Native for mobile app development?",
        answers: [
            { text: "It's faster to develop with than native development", correct: false},
            { text: "It allows you to write code in JavaScript", correct: false },
            { text: " It enables you to share code between iOS and Android platforms", correct: false },
            { text: "All of the above", correct: true },
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