const questions = [
    {
        question: "What is the default file extension for Microsoft PowerPoint presentations?",
        answers: [
            { text: ".txt", correct: false},
            { text: ".doc", correct: false },
            { text: ".docx", correct: false },
            { text: ".pptx", correct: true },
        ]
    },
    {
        question: "Which feature in PowerPoint allows you to add text to a slide?",
        answers: [
            { text: "Text Box", correct: true },
            { text: "Shape", correct: false },
            { text: "SmartArt ", correct: false },
            { text: "Table", correct: false },
        ]
    },
    {
        question: "How do you change the background color of a slide?",
        answers: [
            { text: "Design tab -> Background", correct: true },
            { text: "Home tab -> Fill Color", correct: false },
            { text: "Insert tab -> Picture", correct: false },
            { text: "View tab -> Slide Master", correct: false },
        ]
    },
    {
        question: "What is the purpose of the Notes pane in PowerPoint?",
        answers: [
            { text: "To add speaker notes ", correct: true },
            { text: "To add animations", correct: false },
            { text: "To add transitions", correct: false },
            { text: "To add sound", correct: false },
        ]
    },
    {
        question: "How do you add a transition between slides?",
        answers: [
            { text: " Animations tab -> Add Animation", correct: false},
            { text: "Transitions tab -> Add Transition ", correct: true },
            { text: " Design tab -> Background", correct: false },
            { text: "View tab -> Slide Master", correct: false },
        ]
    },
    {
        question: "What is the difference between a slide layout and a slide master?",
        answers: [
            { text: " A slide layout determines the arrangement of elements on a slide, while a slide master determines the overall appearance of a presentation", correct: true },
            { text: " A slide master determines the arrangement of elements on a slide, while a slide layout determines the overall appearance of a presentation. ", correct: false },
            { text: "Both are the same thing.", correct: false },
            { text: " Neither is used in PowerPoint.", correct: false },
        ]
    },
    {
        question: "How do you add a picture to a slide?",
        answers: [
            { text: "Insert tab -> Picture ", correct: true },
            { text: " Design tab -> Background ", correct: false },
            { text: "Animations tab -> Add Animation ", correct: false },
            { text: "View tab -> Slide Master", correct: false },
        ]
    },
    {
        question: "What is a custom animation?",
        answers: [
            { text: "A predefined animation effect", correct: false},
            { text: "An animation effect that you create", correct: true },
            { text: "A way to change the background color", correct: false },
            { text: "A way to add speaker notes", correct: false },
        ]
    },
    {
        question: "How do you create a hyperlink in PowerPoint?",
        answers: [
            { text: " Insert tab -> Hyperlink", correct: true },
            { text: "Design tab -> Background ", correct: false },
            { text: "Animations tab -> Add Animation", correct: false },
            { text: " View tab -> Slide Master", correct: false },
        ]
    },
    {
        question: "What is the purpose of the Presenter View in PowerPoint?",
        answers: [
            { text: "To view the presentation in full screen mode ", correct: false},
            { text: "To view the presentation with speaker notes ", correct: true },
            { text: "To view the presentation from the audience's perspective", correct: false },
            { text: "To view the presentation with animations", correct: false },
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