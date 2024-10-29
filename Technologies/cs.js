const questions = [
    {
        question: "What is the primary purpose of a firewall?",
        answers: [
            { text: "To prevent unauthorized access to a network", correct: true},
            { text: "To encrypt data transmitted over a network", correct: false },
            { text: "To detect and remove malware", correct: false },
            { text: "To monitor network traffic for suspicious activity", correct: false },
        ]
    },
    {
        question: "Which of the following is a type of social engineering attack?",
        answers: [
            { text: "Phishing", correct: true},
            { text: "Malware", correct: false },
            { text: "Denial of Service (DoS)", correct: false },
            { text: "Brute Force", correct: false },
        ]
    },
    {
        question: "What is a common vulnerability in web applications that allows attackers to inject malicious code?",
        answers: [
            { text: "SQL Injection", correct: false},
            { text: "Cross-Site Scripting (XSS)", correct: true },
            { text: "Buffer Overflow", correct: false },
            { text: "Man-in-the-Middle (MitM) attack", correct: false },
        ]
    },
    {
        question: "Which encryption algorithm is widely used for secure communication on the internet?",
        answers: [
            { text: "MD5", correct: false},
            { text: "SHA-256", correct: false },
            { text: "RSA", correct: false },
            { text: "DES", correct: false },
        ]
    },
    {
        question: "What is a patch or update used to address vulnerabilities in software?",
        answers: [
            { text: "Exploit", correct: false},
            { text: "Malware", correct: false },
            { text: "Exploit", correct: true },
            { text: "Firewall", correct: false },
        ]
    },
    {
        question: "Which security principle states that access to data should be limited to those who need it?",
        answers: [
            { text: "Least Privilege", correct: true},
            { text: "Confidentiality", correct: false },
            { text: "Integrity", correct: false },
            { text: "Availability", correct: false },
        ]
    },
    {
        question: "What is the term for a malicious software program designed to harm a computer system?",
        answers: [
            { text: "Antivirus", correct: false},
            { text: "Firewall", correct: false },
            { text: "Malware", correct: true },
            { text: "Patch", correct: false },
        ]
    },
    {
        question: "Which type of malware replicates itself and spreads to other computers?",
        answers: [
            { text: "Worm", correct: true },
            { text: "Virus", correct: false },
            { text: "Trojan Horse", correct: false },
            { text: "Spyware", correct: false },
        ]
    },
    {
        question: "What is the process of verifying the identity of a user or device?",
        answers: [
            { text: "Authentication", correct: true },
            { text: "Authorization", correct: false },
            { text: "Access Control", correct: false },
            { text: "Encryption", correct: false },
        ]
    },
    {
        question: "Which security best practice involves regularly backing up important data?",
        answers: [
            { text: "Data Loss Prevention (DLP)", correct: false},
            { text: "Incident Response", correct: false },
            { text: "Data Backup and Recovery", correct: true },
            { text: "Risk Assessment", correct: false },
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