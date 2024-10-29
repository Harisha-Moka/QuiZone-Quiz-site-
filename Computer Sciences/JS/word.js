const questions = [
    {
        question: "What is the default file extension for Microsoft Word documents?",
        answers: [
            { text: ".txt", correct: false},
            { text: ".doc", correct: false },
            { text: ".docx", correct: true },
            { text: ".pdf", correct: false },
        ]
    },
    {
        question: "Which feature in Word allows you to create numbered or bulleted lists?",
        answers: [
            { text: "Tables", correct: false},
            { text: "SmartArt", correct: false },
            { text: "Numbering and Bullets", correct: true },
            { text: "Mail Merge", correct: false },
        ]
    },
    {
        question: "How do you change the font size of a selected text?",
        answers: [
            { text: "Use the Font Size dropdown in the Home tab.", correct: true },
            { text: "Use the Bold button.", correct: false },
            { text: " Use the Italic button.", correct: false },
            { text: "Use the Underline button.", correct: false },
        ]
    },
    {
        question: "What is the purpose of the Thesaurus tool in Word?",
        answers: [
            { text: "To create tables", correct: false},
            { text: "To find synonyms and antonyms for words", correct: true },
            { text: "To insert images", correct: false },
            { text: "To change the font color", correct: false },
        ]
    },
    {
        question: "How do you create a table in Word?",
        answers: [
            { text: "Insert -> Table", correct: true },
            { text: "Insert -> Picture", correct: false },
            { text: "Insert -> Text Box", correct: false },
            { text: "Insert -> Shape", correct: false },
        ]
    },
    {
        question: "What is the difference between left-aligned, right-aligned, and centered text?",
        answers: [
            { text: "Left-aligned text is aligned to the left margin, right-aligned text is aligned to the right margin, and centered text is aligned in the middle of the page.", correct: true },
            { text: "Left-aligned text is aligned to the right margin, right-aligned text is aligned to the left margin, and centered text is aligned in the middle of the page. ", correct: false },
            { text: "Left-aligned text is aligned to the right margin, right-aligned text is aligned to the left margin, and centered text is aligned to the left margin.", correct: false },
            { text: "Left-aligned text is aligned to the left margin, right-aligned text is aligned to the right margin, and centered text is aligned to the left margin.", correct: false },
        ]
    },
    {
        question: "How do you change the line spacing between paragraphs?",
        answers: [
            { text: " Use the Font Size dropdown. ", correct: false},
            { text: "Use the Bold button.", correct: false },
            { text: "Use the Line Spacing dropdown in the Home tab.", correct: true },
            { text: "Use the Underline button.", correct: false },
        ]
    },
    {
        question: "What is a style in Word?",
        answers: [
            { text: "A set of formatting options that can be applied to text or paragraphs", correct: true },
            { text: "A type of font ", correct: false },
            { text: "A way to insert images", correct: false },
            { text: "A type of table", correct: false },
        ]
    },
    {
        question: "How do you insert a page break?",
        answers: [
            { text: " Insert -> Page Break", correct: true },
            { text: "Insert -> Section Break", correct: false },
            { text: "Insert -> Table", correct: false },
            { text: "Insert -> Picture", correct: false },
        ]
    },
    {
        question: "What is the purpose of the Mail Merge feature?",
        answers: [
            { text: "To create personalized documents based on a data source", correct: true},
            { text: "To insert images", correct: false },
            { text: "To change the font color", correct: false },
            { text: "To create tables", correct: false },
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