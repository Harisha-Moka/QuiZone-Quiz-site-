const questions = [
    {
        question: "What is the primary purpose of Adobe Photoshop?",
        answers: [
            { text: "Creating animations", correct: false},
            { text: "Editing and manipulating images", correct: true },
            { text: "Designing websites", correct: false },
            { text: "Creating 3D models", correct: false },
        ]
    },
    {
        question: "Which tool in Photoshop is used to select specific areas of an image?",
        answers: [
            { text: "Lasso Tool", correct: true},
            { text: "Brush Tool", correct: false },
            { text: "Pen Tool", correct: false },
            { text: "Clone Stamp Tool", correct: false },
        ]
    },
    {
        question: "What is the purpose of layers in Photoshop?",
        answers: [
            { text: "To organize and edit different elements of an image separately", correct: true},
            { text: "To adjust the overall color balance of an image", correct: false },
            { text: "To create 3D effects", correct: false },
            { text: "To add text to an image", correct: false },
        ]
    },
    {
        question: "Which tool is used to remove unwanted objects from an image?",
        answers: [
            { text: "Spot Healing Brush", correct: false},
            { text: "Clone Stamp Tool", correct: false },
            { text: "Healing Brush", correct: false },
            { text: "Patch Tool", correct: true },
        ]
    },
    {
        question: "What is the purpose of the Levels adjustment layer?",
        answers: [
            { text: "To adjust the brightness and contrast of an image", correct: true },
            { text: "To change the color balance of an image", correct: false },
            { text: "To add a blur effect to an image", correct: false },
            { text: "To create a new layer", correct: false },
        ]
    },
    {
        question: "Which file format is best suited for saving images with transparency?",
        answers: [
            { text: "JPEG", correct: false},
            { text: "PNG", correct: true },
            { text: "GIF", correct: false },
            { text: "TIFF", correct: false },
        ]
    },
    {
        question: "What is the purpose of the History panel?",
        answers: [
            { text: "To track changes made to an image", correct: true },
            { text: "To adjust the color balance of an image", correct: false },
            { text: "To create new layers", correct: false },
            { text: "To add text to an image", correct: false },
        ]
    },
    {
        question: "Which tool is used to create custom brushes in Photoshop?",
        answers: [
            { text: "Brush Tool", correct: false},
            { text: "Pencil Tool", correct: false },
            { text: "Custom Shape Tool", correct: false },
            { text: "Brush Presets", correct: true },
        ]
    },
    {
        question: "What is the purpose of the Smart Objects feature?",
        answers: [
            { text: "To create 3D effects", correct: false},
            { text: "To edit images non-destructively", correct: true },
            { text: "To adjust the color balance of an image", correct: false },
            { text: "To add text to an image", correct: false },
        ]
    },
    {
        question: "Which filter is used to add a blurry effect to an image?",
        answers: [
            { text: "Gaussian Blur", correct: true},
            { text: "Unsharp Mask", correct: false },
            { text: "Motion Blur", correct: false },
            { text: "All of the above", correct: false },
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