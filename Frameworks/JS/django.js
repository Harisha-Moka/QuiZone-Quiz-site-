const questions = [
    {
        question: "What is the primary purpose of Django?",
        answers: [
            { text: "To create mobile applications", correct: false},
            { text: " To build web applications", correct: true },
            { text: "To develop desktop applications", correct: false },
            { text: "To manage databases", correct: false },
        ]
    },
    {
        question: "Which core concept of Django provides a high-level interface for interacting with databases?",
        answers: [
            { text: "Models", correct: true},
            { text: "Views", correct: false },
            { text: "Templates", correct: false },
            { text: "URLs", correct: false },
        ]
    },
    {
        question: "What is the role of a Django template in rendering HTML?",
        answers: [
            { text: "To define the structure and content of an HTML page", correct: true},
            { text: " To handle database interactions", correct: false },
            { text: " To manage user authentication", correct: false },
            { text: "To process HTTP requests", correct: false },
        ]
    },
    {
        question: "Which Django component is responsible for mapping URLs to specific views?",
        answers: [
            { text: "Models", correct: false},
            { text: "Views", correct: false },
            { text: "Templates", correct: false },
            { text: "URLs", correct: true },
        ]
    },
    {
        question: "What is the purpose of the Django ORM (Object-Relational Mapper)?",
        answers: [
            { text: "To provide a high-level interface for interacting with databases", correct: true},
            { text: "To handle HTTP requests and responses", correct: false },
            { text: "To define the structure and content of HTML pages", correct: false },
            { text: " To manage user authentication", correct: false },
        ]
    },
    {
        question: "Which Django middleware component is used to handle authentication and authorization?",
        answers: [
            { text: "AuthenticationMiddleware", correct: true},
            { text: "SessionMiddleware", correct: false },
            { text: "CommonMiddleware", correct: false },
            { text: "MessageMiddleware", correct: false },
        ]
    },
    {
        question: "What is the purpose of Django's admin interface?",
        answers: [
            { text: "To provide a user-friendly interface for managing database content", correct: true},
            { text: "To handle HTTP requests and responses", correct: false },
            { text: "To define the structure and content of HTML pages", correct: false },
            { text: "To manage user authentication", correct: false },
        ]
    },
    {
        question: "Which Django template tag is used to include a template within another template?",
        answers: [
            { text: " {% include %}", correct: true},
            { text: "{% if %}", correct: false },
            { text: "{% for %}", correct: false },
            { text: "{% url %}", correct: false },
        ]
    },
    {
        question: "How can you create a custom Django app?",
        answers: [
            { text: "By using the django-admin command", correct: true},
            { text: "By creating a new Python module", correct: false },
            { text: "By editing the settings.py file", correct: false },
            { text: "By using the manage.py command", correct: false },
        ]
    },
    {
        question: "What is the primary difference between a Django view and a Django template?",
        answers: [
            { text: "A view handles logic and returns an HTTP response, while a template defines the structure and content of the HTML page.", correct: true},
            { text: "A view defines the structure and content of the HTML page, while a template handles logic and returns an HTTP response.", correct: false },
            { text: "Both views and templates handle logic and return HTTP responses.", correct: false },
            { text: "Both views and templates define the structure and content of the HTML page.", correct: false },
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