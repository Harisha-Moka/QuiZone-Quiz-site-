const questions = [
    {
        question: "What is the primary purpose of Next.js?",
        answers: [
            { text: "A CSS framework", correct: false},
            { text: "A JavaScript library for building user interfaces", correct: false },
            { text: " A server-side rendering framework for React applications", correct: true },
            { text: "A static site generator", correct: false },
        ]
    },
    {
        question: "Which function is used to fetch data at build time in Next.js?",
        answers: [
            { text: "getServerSideProps", correct: false},
            { text: "getInitialProps", correct: false },
            { text: "getStaticProps", correct: true },
            { text: "componentDidMount", correct: false },
        ]
    },
    {
        question: "What is the difference between getServerSideProps and getStaticProps?",
        answers: [
            { text: "getServerSideProps runs on the server at build time, while getStaticProps runs on the server for every request.", correct: false},
            { text: "getServerSideProps runs on the server for every request, while getStaticProps runs on the server at build time.", correct: true },
            { text: "Both functions run on the client side.", correct: false },
            { text: "There is no difference between the two functions.", correct: false },
        ]
    },
    {
        question: "How can you define dynamic routes in Next.js?",
        answers: [
            { text: "By using the routes array in the next.config.js file.", correct: false},
            { text: "By using the Link component from the next/link module.", correct: false },
            { text: "By using the Router component from the next/router module.", correct: false },
            { text: "By using dynamic segments in the file path (e.g., [id].js).", correct: true },
        ]
    },
    {
        question: "What is the purpose of the _app.js file in Next.js?",
        answers: [
            { text: "To define custom server configuration.", correct: false},
            { text: "To define the layout for all pages.", correct: true },
            { text: "To define global state management.", correct: false },
            { text: "To define the entry point for the application.", correct: false },
        ]
    },
    {
        question: "Which of the following is a valid way to import a CSS file in a Next.js component?",
        answers: [
            { text: "import './style.css'", correct: false},
            { text: "<link rel=\"stylesheet\" href=\"./style.css\" />", correct: false },
            { text: "import styled from 'styled-components'", correct: false },
            { text: "Both A and B", correct: true },
        ]
    },
    {
        question: "What is the benefit of using server-side rendering (SSR) in Next.js?",
        answers: [
            { text: "Improved SEO", correct: false},
            { text: "Better user experience", correct: false },
            { text: "Faster load times", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "How can you pre-render a static version of a Next.js page?",
        answers: [
            { text: "By using the getStaticProps function.", correct: false},
            { text: "By using the getServerSideProps function.", correct: false },
            { text: "By using the next export command.", correct: true },
            { text: "By using the next build command.", correct: false },
        ]
    },
    {
        question: "What is the purpose of the next.config.js file?",
        answers: [
            { text: "To define custom routes.", correct: false},
            { text: "To define global state management.", correct: false },
            { text: "To define custom server configuration.", correct: true },
            { text: "To define the entry point for the application.", correct: false },
        ]
    },
    {
        question: "Which of the following is a feature of Next.js?",
        answers: [
            { text: "Automatic code splitting", correct: false},
            { text: "Hot module replacement", correct: false },
            { text: "Incremental Static Regeneration (ISR)", correct: false },
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