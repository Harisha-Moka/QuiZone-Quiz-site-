const questions = [
    {
        question: "What is Figma primarily used for?",
        answers: [
            { text: " Web development", correct: false},
            { text: "Database management", correct: false },
            { text: "UI/UX design", correct: true },
            { text: "Project management", correct: false },
        ]
    },
    {
        question: "Which of the following is a core feature of Figma?",
        answers: [
            { text: "Vector graphics", correct: true},
            { text: "3D modeling", correct: false },
            { text: "Data analysis", correct: false },
            { text: "Code generation", correct: false },
        ]
    },
    {
        question: "What is a component in Figma?",
        answers: [
            { text: "A reusable design element", correct: true},
            { text: "A layer group", correct: false },
            { text: " A text frame", correct: false },
            { text: "A color palette", correct: false },
        ]
    },
    {
        question: "How can you collaborate with others in a Figma file?",
        answers: [
            { text: "By sharing the file link", correct: false},
            { text: "By using version control", correct: false },
            { text: "By creating a team project", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "What is a constraint in Figma?",
        answers: [
            { text: "A limitation on file size", correct: false},
            { text: "A rule that governs how elements are positioned", correct: true },
            { text: "A design guideline", correct: false },
            { text: "A color palette", correct: false },
        ]
    },
    {
        question: "Which tool in Figma is used to create prototypes?",
        answers: [
            { text: "Pen tool", correct: false},
            { text: " Text tool", correct: false },
            { text: "Prototype tool", correct: true },
            { text: "Shape tool", correct: false },
        ]
    },
    {
        question: "What is the purpose of a design system in Figma?",
        answers: [
            { text: "To create consistent and scalable designs", correct: true},
            { text: "To manage project timelines", correct: false },
            { text: "To generate code automatically", correct: false },
            { text: "To collaborate with developers", correct: false },
        ]
    },
    {
        question: "How can you create a responsive design in Figma?",
        answers: [
            { text: "By using breakpoints", correct: true},
            { text: "By adjusting font sizes", correct: false },
            { text: "By changing colors", correct: false },
            { text: "By using a grid system", correct: false },
        ]
    },
    {
        question: "What is the difference between a frame and a page in Figma?",
        answers: [
            { text: "A frame is a container for elements, while a page is a top-level container.", correct: true },
            { text: "A frame is a layer group, while a page is a document.", correct: false },
            { text: "A frame is a text element, while a page is a shape.", correct: false },
            { text: "There is no difference between a frame and a page.", correct: false },
        ]
    },
    {
        question: "Which Figma feature allows you to share your designs with others for feedback?",
        answers: [
            { text: "Prototypes", correct: false },
            { text: "Versions", correct: false },
            { text: "Comments", correct: true},
            { text: "Versions", correct: false },
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