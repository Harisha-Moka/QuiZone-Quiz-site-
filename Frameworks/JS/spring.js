const questions = [
    {
        question: "What is the primary goal of Spring Boot?",
        answers: [
            { text: "To simplify the development of Java web applications.", correct: false},
            { text: "To provide a lightweight container for Java applications.", correct: false },
            { text: "To create standalone, production-grade Spring-based applications.", correct: true },
            { text: "To replace the traditional Spring Framework.", correct: false },
        ]
    },
    {
        question: "Which annotation is used to define a Spring Boot application's main class?",
        answers: [
            { text: "@SpringBootApplication", correct: true },
            { text: "@RestController", correct: false },
            { text: "@Service", correct: false },
            { text: "@Component", correct: false },
        ]
    },
    {
        question: "What is the purpose of the @SpringBootApplication annotation?",
        answers: [
            { text: " It defines a Spring Boot application.", correct: false},
            { text: " It enables auto-configuration.", correct: false },
            { text: " It scans for components.", correct: false },
            { text: "All of the above.", correct: true },
        ]
    },
    {
        question: "How can you externalize configuration in a Spring Boot application?",
        answers: [
            { text: "Using the application.properties file.", correct: false},
            { text: "Using the application.yml file.", correct: false },
            { text: "Using environment variables.", correct: false },
            { text: "All of the above.", correct: true },
        ]
    },
    {
        question: "What is the default port for a Spring Boot web application?",
        answers: [
            { text: "80", correct: false},
            { text: "8080", correct: true },
            { text: "8443", correct: false },
            { text: "443", correct: false },
        ]
    },
    {
        question: "Which Spring Boot actuator endpoint provides information about the application's environment?",
        answers: [
            { text: "/info", correct: true },
            { text: "/health", correct: false },
            { text: "/metrics", correct: false },
            { text: "/loggers", correct: false },
        ]
    },
    {
        question: "What is the purpose of Spring Boot DevTools?",
        answers: [
            { text: "To provide security features.", correct: false},
            { text: "To improve development speed and productivity.", correct: true },
            { text: "To simplify deployment.", correct: false },
            { text: "To integrate with external services.", correct: false },
        ]
    },
    {
        question: "How can you disable auto-configuration in a specific class?",
        answers: [
            { text: "Use the @Configuration annotation.", correct: false},
            { text: "Use the @EnableAutoConfiguration annotation.", correct: false },
            { text: "Use the @SpringBootApplication annotation without the @EnableAutoConfiguration attribute.", correct: true },
            { text: "Use the @ComponentScan annotation.", correct: false },
        ]
    },
    {
        question: " What is the role of the @RestController annotation?",
        answers: [
            { text: " It defines a RESTful controller.", correct: true},
            { text: " It defines a component.", correct: false },
            { text: " It enables auto-configuration.", correct: false },
            { text: " It scans for components.", correct: false },
        ]
    },
    {
        question: "How can you create a custom banner for a Spring Boot application?",
        answers: [
            { text: "Use the application.properties file.", correct: false},
            { text: "Use the application.yml file.", correct: false },
            { text: "Use the @Banner annotation.", correct: false },
            { text: " Use the banner.txt file.", correct: true },
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