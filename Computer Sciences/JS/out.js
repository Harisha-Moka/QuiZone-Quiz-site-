const questions = [
    {
        question: "What is the primary function of Microsoft Outlook?",
        answers: [
            { text: "Word processing", correct: false},
            { text: "Spreadsheet creation ", correct: false },
            { text: "Presentation design", correct: false },
            { text: " Email and calendar management", correct: true },
        ]
    },
    {
        question: "Which feature in Outlook allows you to create new emails?",
        answers: [
            { text: " New Message", correct: true },
            { text: "New Appointment", correct: false },
            { text: "New Task", correct: false },
            { text: "New Contact", correct: false },
        ]
    },
    {
        question: "How do you add a new contact to your Outlook address book?",
        answers: [
            { text: " Home tab -> New Contact", correct: false},
            { text: "People tab -> New Contact ", correct: true },
            { text: "Calendar tab -> New Appointment", correct: false },
            { text: "Mail tab -> New Message", correct: false },
        ]
    },
    {
        question: "How do you create a recurring appointment in Outlook?",
        answers: [
            { text: "Calendar tab -> New Appointment -> Recurrence", correct: true },
            { text: "People tab -> New Contact", correct: false },
            { text: " Mail tab -> New Message", correct: false },
            { text: "Home tab -> New Folder", correct: false },
        ]
    },
    {
        question: "What is the purpose of the Calendar feature in Outlook?",
        answers: [
            { text: "To manage appointments and meetings ", correct: true },
            { text: "To create emails", correct: false },
            { text: "To organize contacts ", correct: false },
            { text: "To manage tasks", correct: false },
        ]
    },
    {
        question: "How do you change the font size of text in an email?",
        answers: [
            { text: "Home tab -> Font Size", correct: true },
            { text: " Insert tab -> Text Box", correct: false },
            { text: "Design tab -> Page Setup", correct: false },
            { text: "View tab -> Page Navigator", correct: false },
        ]
    },
    {
        question: "What is the difference between a BCC and a CC recipient in an email?",
        answers: [
            { text: " BCC recipients are blind carbon copies, while CC recipients are carbon copies.", correct: true },
            { text: "CC recipients are blind carbon copies, while BCC recipients are carbon copies.", correct: false },
            { text: " Both are the same thing.", correct: false },
            { text: "Neither is used in Outlook.", correct: false },
        ]
    },
    {
        question: "How do you create a new folder in Outlook?",
        answers: [
            { text: " Home tab -> New Folder", correct: true },
            { text: "People tab -> New Contact", correct: false },
            { text: "Calendar tab -> New Appointment ", correct: false },
            { text: "Mail tab -> New Message", correct: false },
        ]
    },
    {
        question: "What is a rule in Outlook?",
        answers: [
            { text: "A set of conditions that trigger an action", correct: true },
            { text: " A way to organize emails", correct: false },
            { text: " A way to create contacts", correct: false },
            { text: "A way to manage appointments", correct: false },
        ]
    },
    {
        question: "What is the purpose of the Junk Email folder in Outlook?",
        answers: [
            { text: "To store emails that are considered spam", correct: true },
            { text: "To store emails that are flagged as important", correct: false },
            { text: "To store emails that are attached to other emails", correct: false },
            { text: "To store emails that are sent to multiple recipients", correct: false },
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