const questions = [
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Earth", correct: false},
            { text: "Jupiter", correct: true },
            { text: "Saturn", correct: false },
            { text: "Mars", correct: false },
        ]
    },
    {
        question: "Who is considered the father of modern physics?",
        answers: [
            { text: "Albert Einstein", correct: true },
            { text: " Isaac Newton ", correct: false },
            { text: "Galileo Galilei", correct: false },
            { text: "Stephen Hawking", correct: false },
        ]
    },
    {
        question: "What is the largest country in the world by land area?",
        answers: [
            { text: "US", correct: false},
            { text: "Canada", correct: false },
            { text: "China", correct: false },
            { text: "Russia", correct: true },
        ]
    },
    {
        question: "Which continent is home to the Amazon rainforest?",
        answers: [
            { text: "Africa", correct: false},
            { text: "South Aerica", correct: true },
            { text: "North America", correct: false },
            { text: "Asia", correct: false },
        ]
    },
    {
        question: "What is the capital city of Australia?",
        answers: [
            { text: "Sydney", correct: false},
            { text: "Melbourne", correct: false },
            { text: "Canberra", correct: true },
            { text: "Brisbane", correct: false },
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Au", correct: true},
            { text: "Ag", correct: false },
            { text: "Fe", correct: false },
            { text: "Cu", correct: false },
        ]
    },
    {
        question: "Who wrote the famous play \"Romeo and Juliet\"?",
        answers: [
            { text: "William Shakespeare", correct: true },
            { text: "Jane Austen ", correct: false },
            { text: "Charles Dickens", correct: false },
            { text: "Mark Twain", correct: false },
        ]
    },
    {
        question: "Who was the 16th president of the United States?",
        answers: [
            { text: "George Washington", correct: false},
            { text: "Thomas Jefferson", correct: false },
            { text: "Abraham Lincoln", correct: true },
            { text: "John F. Kennedy", correct: false },
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Leonardo da Vinci ", correct: true },
            { text: "Michelangelo ", correct: false },
            { text: " Raphael", correct: false },
            { text: "Pablo Picasso", correct: false },
        ]
    },
    {
        question: "When did World War II end?",
        answers: [
            { text: "1939", correct: false},
            { text: "1945", correct: true },
            { text: "1950", correct: false },
            { text: "1960", correct: false },
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