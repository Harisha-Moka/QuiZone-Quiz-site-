const questions = [
    {
        question: "What is the primary role of a full-stack developer?",
        answers: [
            { text: "To design user interfaces", correct: false},
            { text: "To write server-side code", correct: false },
            { text: "To manage databases", correct: false },
            { text: "To handle all aspects of software development, from the front-end to the back-end", correct: true },
        ]
    },
    {
        question: "Which of the following is a popular front-end framework?",
        answers: [
            { text: "Node.js", correct: false},
            { text: "React", correct: true },
            { text: "Django", correct: false },
            { text: "Laravel", correct: false },
        ]
    },
    {
        question: "What is the back-end of a web application responsible for?",
        answers: [
            { text: "The visual elements that users see", correct: false},
            { text: "The server-side logic and data management", correct: true },
            { text: "The user interface design", correct: false },
            { text: "The client-side scripting", correct: false },
        ]
    },
    {
        question: "Which programming language is commonly used for both front-end and back-end development?",
        answers: [
            { text: "JavaScript", correct: true},
            { text: "Python", correct: false },
            { text: "Java", correct: false },
            { text: "C++", correct: false },
        ]
    },
    {
        question: "What is the purpose of a database in a web application?",
        answers: [
            { text: " To store and retrieve data", correct: true},
            { text: "To design the user interface", correct: false },
            { text: "To handle server-side logic", correct: false },
            { text: "To create client-side scripts", correct: false },
        ]
    },
    {
        question: "Which database management system is widely used for web development?",
        answers: [
            { text: "MySQL", correct: true},
            { text: " Microsoft Word", correct: false },
            { text: "Adobe Photoshop", correct: false },
            { text: "Git", correct: false },
        ]
    },
    {
        question: "What is a REST API used for?",
        answers: [
            { text: "To communicate between the front-end and back-end of a web application", correct: true},
            { text: "To design user interfaces", correct: false },
            { text: "To manage databases", correct: false },
            { text: "To create client-side scripts", correct: false },
        ]
    },
    {
        question: "Which version control system is commonly used by developers?",
        answers: [
            { text: "GitHub", correct: true},
            { text: "Sublime Text", correct: false },
            { text: "Visual Studio Code", correct: false },
            { text: " Photoshop", correct: false },
        ]
    },
    {
        question: "What is the process of optimizing a website for search engines?",
        answers: [
            { text: "Search Engine Optimization (SEO)", correct: true },
            { text: "User Experience (UX) Design", correct: false },
            { text: "Web Development", correct: false },
            { text: "Database Management", correct: false },
        ]
    },
    {
        question: "Which programming language is often used for server-side development in web applications?",
        answers: [
            { text: " HTML", correct: false},
            { text: "CSS", correct: false },
            { text: " JavaScript", correct: false },
            { text: "Python", correct: true },
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