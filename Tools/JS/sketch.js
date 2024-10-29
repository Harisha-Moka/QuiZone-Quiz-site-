const questions = [
    {
        question: "What is the primary purpose of Sketch?",
        answers: [
            { text: "To create 3D models", correct: false},
            { text: "To design user interfaces", correct: true },
            { text: "To edit photos", correct: false },
            { text: "To create animations", correct: false },
        ]
    },
    {
        question: "Which of the following is a core feature of Sketch?",
        answers: [
            { text: "Vector drawing", correct: true },
            { text: "Pixel editing", correct: false },
            { text: "3D modeling", correct: false },
            { text: "Video editing", correct: false },
        ]
    },
    {
        question: "What is a symbol in Sketch used for?",
        answers: [
            { text: "Creating multiple copies of a design element", correct: true },
            { text: "Adding text to a design", correct: false },
            { text: "Exporting a design to a different file format", correct: false },
            { text: "Grouping design elements", correct: false },
        ]
    },
    {
        question: "Which Sketch tool is used to create text layers?",
        answers: [
            { text: "Text tool", correct: true },
            { text: "Shape tool", correct: false },
            { text: "Pen tool", correct: false },
            { text: "Rectangle tool", correct: false },
        ]
    },
    {
        question: "What is a layer group in Sketch used for?",
        answers: [
            { text: "Organizing and managing multiple layers", correct: true },
            { text: "Creating symbols", correct: false },
            { text: "Exporting designs", correct: false },
            { text: " Adding effects to designs", correct: false },
        ]
    },
    {
        question: "Which Sketch tool is used to create curved lines and shapes?",
        answers: [
            { text: "Pen tool", correct: true},
            { text: "Pencil tool", correct: false },
            { text: "Line tool", correct: false },
            { text: "Rectangle tool", correct: false },
        ]
    },
    {
        question: "What is the term for a design element that can be reused multiple times in a Sketch document?",
        answers: [
            { text: "Layer group", correct: false },
            { text: "Artboard", correct: false },
            { text: "Symbol", correct: true},
            { text: "Page", correct: false },
        ]
    },
    {
        question: "Which Sketch tool is used to fill shapes with color?",
        answers: [
            { text: "Stroke tool", correct: false},
            { text: "Fill tool", correct: true },
            { text: "Text tool", correct: false },
            { text: "Shape tool", correct: false },
        ]
    },
    {
        question: "What is the term for a design element that represents a specific screen or page in a user interface?",
        answers: [
            { text: "Symbol", correct: false},
            { text: "Layer group", correct: false },
            { text: "Artboard", correct: true },
            { text: "Page", correct: false },
        ]
    },
    {
        question: "Which Sketch tool is used to create straight lines?",
        answers: [
            { text: "Pencil tool", correct: false},
            { text: "Pen tool", correct: false },
            { text: "Rectangle tool", correct: false },
            { text: "Line tool", correct: true },
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