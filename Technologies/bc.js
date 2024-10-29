const questions = [
    {
        question: "What is the primary function of a blockchain?",
        answers: [
            { text: "To store personal data", correct: false},
            { text: "To facilitate peer-to-peer transactions", correct: true },
            { text: "To create digital art", correct: false },
            { text: "To mine gold", correct: false },
        ]
    },
    {
        question: "What is the fundamental unit of information in a blockchain?",
        answers: [
            { text: "Block", correct: true},
            { text: "Transaction", correct: false },
            { text: "Chain", correct: false },
            { text: "Hash", correct: false },
        ]
    },
    {
        question: "Which of the following is a key feature of blockchain technology that ensures data security and immutability?",
        answers: [
            { text: "Decentralization", correct: true},
            { text: "Centralization", correct: false },
            { text: "Modification", correct: false },
            { text: "Deletion", correct: false },
        ]
    },
    {
        question: "What is the process of verifying and adding new blocks to a blockchain called?",
        answers: [
            { text: "Mining", correct: true},
            { text: "Forging", correct: false },
            { text: "Hashing", correct: false },
            { text: "Validating", correct: false },
        ]
    },
    {
        question: "Which consensus mechanism is commonly used in Bitcoin and other cryptocurrencies?",
        answers: [
            { text: "Proof of Work (PoW)", correct: true},
            { text: "Proof of Stake (PoS)", correct: false },
            { text: "Delegated Proof of Stake (DPoS)", correct: false },
            { text: "Practical Byzantine Fault Tolerance (PBFT)", correct: false },
        ]
    },
    {
        question: "What is the main purpose of a smart contract on a blockchain?",
        answers: [
            { text: "To facilitate transactions", correct: false},
            { text: "To store data", correct: false },
            { text: "To create new cryptocurrencies", correct: false },
            { text: "To automate agreements and enforce contracts", correct: true },
        ]
    },
    {
        question: "Which of the following is a potential application of blockchain technology?",
        answers: [
            { text: "Supply chain management", correct: false},
            { text: "Healthcare", correct: false },
            { text: "Voting systems", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "What is the term for the cryptographic function that converts data into a unique string of characters?",
        answers: [
            { text: "Encryption", correct: false},
            { text: "Decryption", correct: false },
            { text: "Hashing", correct: true },
            { text: "Mining", correct: false },
        ]
    },
    {
        question: "What is the main difference between public and private blockchains?",
        answers: [
            { text: "Public blockchains are accessible to everyone, while private blockchains are only accessible to authorized participants.", correct: true },
            { text: "Public blockchains are centralized, while private blockchains are decentralized.", correct: false },
            { text: "Public blockchains use Proof of Work, while private blockchains use Proof of Stake.", correct: false },
            { text: "Public blockchains are immutable, while private blockchains can be modified.", correct: false },
        ]
    },
    {
        question: "Which of the following is a potential challenge of blockchain technology?",
        answers: [
            { text: "Scalability", correct: false},
            { text: "Security", correct: false },
            { text: "Energy consumption", correct: false },
            { text: "All of the above", correct: true },
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