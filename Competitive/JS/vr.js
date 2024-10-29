const questions = [
    {
        question: "Insect: Disease :: War : ?",
        answers: [
            { text: "Army", correct: false},
            { text: "Defeat", correct: false },
            { text: "Arsenal", correct: false },
            { text: "Destruction", correct: true },
        ]
    },
    {
        question: "Choose the word which is different from the rest.",
        answers: [
            { text: "eagle", correct: true },
            { text: "leopard", correct: false },
            { text: "lion", correct: false },
            { text: "tiger", correct: false },
        ]
    },
    {
        question: "120, 99, 80, 63, 48, ?",
        answers: [
            { text: "35", correct: true},
            { text: "38", correct: false },
            { text: "39", correct: false },
            { text: "40", correct: false },
        ]
    },
    {
        question: "SCD, TEF, UGH, ? , WKL",
        answers: [
            { text: "CMN", correct: false},
            { text: "UJI", correct: false },
            { text: "VIJ", correct: true },
            { text: "IJT", correct: false },
        ]
    },
    {
        question: "Introducing a woman, a man said, \"Her mother's husband's sister is my aunt.\" How man is related to the woman?  ",
        answers: [
            { text: "Nephew", correct: false},
            { text: "Brother", correct: true },
            { text: "brother-in-law", correct: false },
            { text: "Cousin", correct: false },
        ]
    },
    {
        question: "Arrange the words given below in a meaningful sequence. \n key, Door, Lock, Room, Switch on",
        answers: [
            { text: "5, 1, 2, 4, 3", correct: false},
            { text: "4, 2, 1, 5, 3", correct: false },
            { text: "1, 3, 2, 4, 5", correct: true },
            { text: "1, 2, 3, 5, 4", correct: false },
        ]
    },
    {
        question: "a_bbc_aab_cca_bbcc",
        answers: [
            { text: "bacb", correct: false},
            { text: "acba", correct: true },
            { text: "caba", correct: false },
            { text: "abba", correct: false },
        ]
    },
    {
        question: "A man walks 1km to East and then he turns to South and walks 5km. Again he turns to East and walks 2km. After this he turns to North and walks 9km. Now, how far is he from his starting point?",
        answers: [
            { text: "3km", correct: false},
            { text: "4km", correct: false },
            { text: "5km", correct: true },
            { text: "7km", correct: false },
        ]
    },
    {
        question: "In a certain code FIRE is coded as DGPC. What will be the last letter of the coded word for SHOT.",
        answers: [
            { text: "Q", correct: false},
            { text: "R", correct: true },
            { text: "S", correct: false },
            { text: "P", correct: false },
        ]
    },
    {
        question: "Find the odd one out from the following.",
        answers: [
            { text: "Swimming", correct: false},
            { text: "Sailing", correct: false },
            { text: "Diving", correct: false },
            { text: "Driving", correct: true },
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