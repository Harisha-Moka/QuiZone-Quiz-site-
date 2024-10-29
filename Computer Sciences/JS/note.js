const questions = [
    {
        question: "What is the primary purpose of Microsoft OneNote?",
        answers: [
            { text: "Word processing", correct: false},
            { text: " Spreadsheet creation", correct: false },
            { text: "Presentation design", correct: false },
            { text: "Digital note-taking", correct: true },
        ]
    },
    {
        question: "Which feature in OneNote allows you to create new pages?",
        answers: [
            { text: " Insert -> New Page", correct: true },
            { text: "Home tab -> New Notebook", correct: false },
            { text: "View tab -> New Section", correct: false },
            { text: " Draw tab -> New Drawing", correct: false },
        ]
    },
    {
        question: "How do you add text to a OneNote page?",
        answers: [
            { text: "Insert -> Text Box", correct: true },
            { text: "Home tab -> New Notebook", correct: false },
            { text: "View tab -> New Section", correct: false },
            { text: "Draw tab -> New Drawing", correct: false },
        ]
    },
    {
        question: "What is the purpose of a section in OneNote?",
        answers: [
            { text: "To organize pages within a notebook ", correct: true },
            { text: "To add text to a page ", correct: false },
            { text: "To create new notebooks ", correct: false },
            { text: "To add images to a page", correct: false },
        ]
    },
    {
        question: "How do you change the font size of text in a OneNote page?",
        answers: [
            { text: "Home tab -> Font Size", correct: true },
            { text: " Insert tab -> Text Box", correct: false },
            { text: "Draw tab -> New Drawing", correct: false },
            { text: "View tab -> New Section", correct: false },
        ]
    },
    {
        question: "What is the difference between a notebook and a section group in OneNote?",
        answers: [
            { text: "A notebook is a collection of sections, while a section group is a collection of pages within a section.", correct: true },
            { text: "A section group is a collection of sections, while a notebook is a collection of pages within a section.", correct: false },
            { text: " Both are the same thing.", correct: false },
            { text: "Neither is used in OneNote.", correct: false },
        ]
    },
    {
        question: "How do you add an image to a OneNote page?",
        answers: [
            { text: "Insert -> Picture", correct: true },
            { text: "Home tab -> New Notebook ", correct: false },
            { text: "View tab -> New Section", correct: false },
            { text: "Draw tab -> New Drawing", correct: false },
        ]
    },
    {
        question: "What is a tag in OneNote?",
        answers: [
            { text: "A keyword or label associated with a page or section ", correct: true },
            { text: "A way to organize pages within a notebook", correct: false },
            { text: " A way to add text to a page", correct: false },
            { text: "A way to add images to a page", correct: false },
        ]
    },
    {
        question: "How do you create a linked notebook in OneNote?",
        answers: [
            { text: "File tab -> New Notebook -> Linked Notebook ", correct: true },
            { text: "Home tab -> New Notebook", correct: false },
            { text: "View tab -> New Section ", correct: false },
            { text: "Draw tab -> New Drawing", correct: false },
        ]
    },
    {
        question: "What is the purpose of the Ink to Text feature in OneNote?",
        answers: [
            { text: "To convert handwritten text to typed text ", correct: true },
            { text: "To draw shapes ", correct: false },
            { text: "To add images", correct: false },
            { text: "To organize pages", correct: false },
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