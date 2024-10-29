const questions = [
    {
        question: "What is the primary purpose of Microsoft Publisher?",
        answers: [
            { text: " Word processing", correct: false},
            { text: "Spreadsheet creation", correct: false },
            { text: " Presentation design", correct: false },
            { text: "Desktop publishing", correct: true },
        ]
    },
    {
        question: "Which feature in Publisher allows you to create custom page layouts?",
        answers: [
            { text: "Page Setup", correct: false},
            { text: "Master Pages", correct: false },
            { text: " Design Templates", correct: true },
            { text: "Text Boxes", correct: false },
        ]
    },
    {
        question: "How do you add text to a publication in Publisher?",
        answers: [
            { text: "Insert -> Text Box", correct: true },
            { text: "Insert -> Picture", correct: false },
            { text: " Insert -> Table", correct: false },
            { text: "Insert -> Shape", correct: false },
        ]
    },
    {
        question: "What is the purpose of the Page Navigator in Publisher?",
        answers: [
            { text: "To view different pages of the publication", correct: true },
            { text: "To add text to the publication", correct: false },
            { text: "To change the page layout ", correct: false },
            { text: "To add images to the publication", correct: false },
        ]
    },
    {
        question: "How do you change the font size of text in a publication?",
        answers: [
            { text: " Home tab -> Font Size", correct: true },
            { text: "Insert tab -> Text Box", correct: false },
            { text: "Design tab -> Page Setup", correct: false },
            { text: "View tab -> Page Navigator", correct: false },
        ]
    },
    {
        question: "What is the difference between a master page and a normal page in Publisher?",
        answers: [
            { text: "A master page determines the overall appearance of a publication, while a normal page is a specific page within the publication.", correct: true },
            { text: "A normal page determines the overall appearance of a publication, while a master page is a specific page within the publication.", correct: false },
            { text: "Both are the same thing.", correct: false },
            { text: "Neither is used in Publisher.", correct: false },
        ]
    },
    {
        question: "How do you add a picture to a publication?",
        answers: [
            { text: "Insert tab -> Picture", correct: true },
            { text: "Design tab -> Page Setup", correct: false },
            { text: "View tab -> Page Navigator", correct: false },
            { text: " Home tab -> Font Size", correct: false },
        ]
    },
    {
        question: "What is a merge field in Publisher?",
        answers: [
            { text: "A field that can be replaced with data from a data source", correct: true },
            { text: "A field that determines the overall appearance of a publication", correct: false },
            { text: " A field that is used to create text boxes", correct: false },
            { text: "A field that is used to add pictures", correct: false },
        ]
    },
    {
        question: "How do you create a mailing list in Publisher?",
        answers: [
            { text: "Tools -> Mail Merge", correct: true },
            { text: " Insert tab -> Text Box ", correct: false },
            { text: " Design tab -> Page Setup", correct: false },
            { text: "View tab -> Page Navigator", correct: false },
        ]
    },
    {
        question: "What is the purpose of the Crop tool in Publisher?",
        answers: [
            { text: "To remove unwanted portions of an image", correct: true },
            { text: "To change the font size of text", correct: false },
            { text: "To change the page layout", correct: false },
            { text: " To add text to the publication", correct: false },
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