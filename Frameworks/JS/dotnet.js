const questions = [
    {
        question: "What is the primary purpose of the .NET Common Language Runtime (CLR)?",
        answers: [
            { text: "To provide a cross-platform development environment", correct: false},
            { text: "To manage memory allocation and garbage collection", correct: true },
            { text: "To compile code into machine-specific instructions", correct: false },
            { text: "To handle user interface elements", correct: false },
        ]
    },
    {
        question: "Which of the following is NOT a .NET programming language?",
        answers: [
            { text: "C#", correct: false},
            { text: "Java", correct: true },
            { text: "Visual Basic .NET", correct: false },
            { text: " F#", correct: false },
        ]
    },
    {
        question: "What is the primary difference between ASP.NET Web Forms and ASP.NET MVC?",
        answers: [
            { text: "Web Forms uses a declarative programming model, while MVC uses a procedural model.", correct: true },
            { text: "Web Forms is better suited for large-scale applications, while MVC is better for smaller projects.", correct: false },
            { text: "Web Forms is more focused on performance, while MVC is more focused on maintainability.", correct: false },
            { text: "Web Forms is primarily used for web services, while MVC is used for web applications.", correct: false },
        ]
    },
    {
        question: "What is the purpose of the web.config file in an ASP.NET application?",
        answers: [
            { text: "To store application-specific configuration settings", correct: false},
            { text: "To define the application's database connection string", correct: false },
            { text: "To handle HTTP requests and responses", correct: false },
            { text: "To define the application's layout and appearance", correct: false },
        ]
    },
    {
        question: "Which of the following is NOT a data type in C#?",
        answers: [
            { text: " int", correct: false},
            { text: "string", correct: false },
            { text: "bool", correct: false },
            { text: "float", correct: true },
        ]
    },
    {
        question: "What is the purpose of the using keyword in C#?",
        answers: [
            { text: "To declare a variable", correct: false},
            { text: "To define a method", correct: false },
            { text: "To create an object", correct: false },
            { text: "To manage resource disposal", correct: true },
        ]
    },
    {
        question: "What does LINQ stand for?",
        answers: [
            { text: " Low-Level Integrated Query", correct: false},
            { text: " Language-Integrated Query", correct: true },
            { text: "Linked-In Query", correct: false },
            { text: "List-Integrated Query", correct: false },
        ]
    },
    {
        question: "Which of the following is NOT a LINQ extension method?",
        answers: [
            { text: "Where()", correct: false},
            { text: "Select()", correct: false },
            { text: "ForEach()", correct: true },
            { text: "Join()", correct: false },
            
        ]
    },
    {
        question: "Which keyword is used to create a generic method in C#?",
        answers: [
            { text: "generic", correct: false},
            { text: "template", correct: false },
            { text: "typeparam", correct: true },
            { text: "type", correct: false },
        ]
    },
    {
        question: "Which .NET technology is used for creating desktop applications with a graphical user interface?",
        answers: [
            { text: "Windows Forms", correct: false},
            { text: "WPF", correct: true },
            { text: "ASP.NET", correct: false },
            { text: "Entity Framework", correct: false },
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