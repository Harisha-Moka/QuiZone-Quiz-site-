const questions = [
    {
        question: "What is the primary purpose of Microsoft Visio?",
        answers: [
            { text: "Word processing", correct: false},
            { text: "Spreadsheet creation", correct: false },
            { text: "Diagram creation", correct: true },
            { text: " Presentation design", correct: false },
        ]
    },
    {
        question: "Which feature in Visio allows you to create new shapes?",
        answers: [
            { text: "Home tab -> New Shape", correct: false},
            { text: "View tab -> New Shape ", correct: false },
            { text: "Draw tab -> New Shape", correct: false },
            { text: "Insert -> Shapes ", correct: true },
        ]
    },
    {
        question: "How do you connect two shapes in Visio?",
        answers: [
            { text: " Drag and drop a connector between the shapes", correct: false},
            { text: "Right-click one shape and select Connect To ", correct: false },
            { text: "Use the Connect tool ", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "What is a stencil in Visio?",
        answers: [
            { text: "A collection of related shapes", correct: true },
            { text: " A way to format shapes ", correct: false },
            { text: "A way to connect shapes", correct: false },
            { text: "A way to create new shapes", correct: false },
        ]
    },
    {
        question: "How do you change the color of a shape in Visio?",
        answers: [
            { text: " Home tab -> Fill Color", correct: false},
            { text: "Format tab -> Fill Color", correct: true },
            { text: "Design tab -> Fill Color", correct: false },
            { text: "View tab -> Fill Color", correct: false },
        ]
    },
    {
        question: "What is the difference between a layer and a page in Visio?",
        answers: [
            { text: "A layer is a grouping of shapes, while a page is a sheet in a drawing. ", correct: true },
            { text: "A page is a grouping of shapes, while a layer is a sheet in a drawing.", correct: false },
            { text: "Both are the same thing", correct: false },
            { text: "Neither is used in Visio.", correct: false },
        ]
    },
    {
        question: "How do you add text to a shape in Visio?",
        answers: [
            { text: "Home tab -> Text Box", correct: false},
            { text: "Design tab -> Add Text", correct: false },
            { text: "Insert tab -> Text Box", correct: true },
            { text: " Format tab -> Add Text", correct: false },
        ]
    },
    {
        question: "What is a custom stencil in Visio?",
        answers: [
            { text: "A stencil created by Microsoft", correct: false},
            { text: "A stencil that is part of a template", correct: false },
            { text: "A stencil that you create", correct: true },
            { text: "A stencil that is used for specific types of diagrams", correct: false },
        ]
    },
    {
        question: "How do you create a hyperlink in Visio?",
        answers: [
            { text: "Home tab -> Hyperlink", correct: false},
            { text: " Insert tab -> Hyperlink", correct: true },
            { text: "Format tab -> Hyperlink", correct: false },
            { text: "Design tab -> Hyperlink", correct: false },
        ]
    },
    {
        question: "What is the purpose of the Link to Source Data feature in Visio?",
        answers: [
            { text: "To connect a shape to a data source", correct: true},
            { text: "To create a hyperlink", correct: false },
            { text: " To format a shape", correct: false },
            { text: "To create a layer", correct: false },
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