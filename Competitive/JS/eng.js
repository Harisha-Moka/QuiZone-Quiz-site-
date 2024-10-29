const questions = [
    {
        question: "When do we use the indefinite article \"a\" before a noun?",
        answers: [
            { text: " When the noun is singular and countable", correct: true},
            { text: "When the noun is plural", correct: false },
            { text: "When the noun is uncountable", correct: false },
            { text: "When the noun is plural and countable", correct: false },
        ]
    },
    {
        question: "If someone says, \"I am hungry,\" how would you report it in indirect speech?",
        answers: [
            { text: " He said he is hungry.", correct: false},
            { text: "He said he was hungry", correct: true },
            { text: "He said he will be hungry", correct: false },
            { text: "He said he had been hungry.", correct: false },
        ]
    },
    {
        question: "What is the correct preposition to use in the phrase \"interested _ music\"?",
        answers: [
            { text: "of", correct: false},
            { text: "for", correct: false },
            { text: "in", correct: true },
            { text: "with", correct: false },
        ]
    },
    {
        question: "What is the adverb form of the adjective \"slow\"?",
        answers: [
            { text: "slower", correct: false},
            { text: "slowest", correct: false },
            { text: "slowly", correct: true },
            { text: "slowless", correct: false },
        ]
    },
    {
        question: "Which pronoun is used to refer to a singular thing?",
        answers: [
            { text: "I", correct: false},
            { text: "We", correct: false },
            { text: "You", correct: false },
            { text: "It", correct: true },
        ]
    },
    {
        question: "What is the past perfect tense of the verb \"have\"?",
        answers: [
            { text: "had", correct: true },
            { text: "have", correct: false },
            { text: "will have", correct: false },
            { text: "having", correct: false },
        ]
    },
    {
        question: "Which sentence is in the active voice?",
        answers: [
            { text: "The ball was hit by the batter.", correct: false},
            { text: " The batter hit the ball.", correct: true },
            { text: "The ball was hit.", correct: false },
            { text: "The hit was made by the batter.", correct: false },
        ]
    },
    {
        question: "Change the sentence \"The teacher gave the students a test\" to the passive voice.",
        answers: [
            { text: "The students were given a test by the teacher.", correct: false },
            { text: "A test was given to the students by the teacher.", correct: true },
            { text: "The teacher gave the test.", correct: false },
            { text: "The test was given.", correct: false },
        ]
    },
    {
        question: "What is the predicate of the sentence \"The dog barked loudly\"?",
        answers: [
            { text: "chased", correct: false},
            { text: "mouse", correct: false },
            { text: "the", correct: false },
            { text: "cat", correct: true },
        ]
    },
    {
        question: "What part of speech is the word \"and\"?",
        answers: [
            { text: "Conjuction", correct: true},
            { text: "preposition", correct: false },
            { text: "Interjection", correct: false },
            { text: "Adjective", correct: false },
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