const questions = [
    {
        question: "What is cloud computing?",
        answers: [
            { text: "A type of computer hardware", correct: false},
            { text: "A software development methodology", correct: false },
            { text: "A model for delivering IT services over the internet", correct: true },
            { text: "A network protocol", correct: false },
        ]
    },
    {
        question: "Which of the following is NOT a type of cloud deployment model?",
        answers: [
            { text: "Public cloud", correct: false},
            { text: "Private cloud", correct: false },
            { text: "Hybrid cloud", correct: false },
            { text: "On-premises cloud", correct: true },
        ]
    },
    {
        question: "What is the pay-as-you-go pricing model in cloud computing?",
        answers: [
            { text: "Customers pay a fixed monthly fee for cloud services", correct: false},
            { text: "Customers pay only for the resources they use", correct: true },
            { text: "Customers pay a premium for dedicated resources", correct: false },
            { text: " Customers pay a one-time fee for cloud services", correct: false },
        ]
    },
    {
        question: "Which cloud service model provides access to software applications over the internet?",
        answers: [
            { text: "Infrastructure as a Service (IaaS)", correct: false},
            { text: "Platform as a Service (PaaS)", correct: false },
            { text: "Software as a Service (SaaS)", correct: true },
            { text: "Database as a Service (DaaS)", correct: false },
        ]
    },
    {
        question: "What is the main benefit of using a public cloud?",
        answers: [
            { text: "Increased control over IT infrastructure", correct: false},
            { text: "Lower upfront costs", correct: true },
            { text: "Higher security", correct: false },
            { text: "Better scalability", correct: false },
        ]
    },
    {
        question: "Which cloud service model provides users with control over the underlying infrastructure?",
        answers: [
            { text: "Infrastructure as a Service (IaaS)", correct: true },
            { text: "Platform as a Service (PaaS)", correct: false },
            { text: "Software as a Service (SaaS)", correct: false },
            { text: "Database as a Service (DaaS)", correct: false },
        ]
    },
    {
        question: "What is the term for the process of moving data or applications from an on-premises environment to the cloud?",
        answers: [
            { text: "Cloud migration", correct: true},
            { text: "Cloud bursting", correct: false },
            { text: "Cloud optimization", correct: false },
            { text: "Cloud bursting", correct: false },
        ]
    },
    {
        question: "Which cloud computing concept refers to the ability to quickly scale resources up or down to meet changing demands?",
        answers: [
            { text: "Elasticity", correct: true },
            { text: "Portability", correct: false },
            { text: "Reliability", correct: false },
            { text: "Security", correct: false },
        ]
    },
    {
        question: "What is a potential drawback of using a public cloud?",
        answers: [
            { text: "Lower upfront costs", correct: false},
            { text: "Limited control over IT infrastructure", correct: true },
            { text: "Increased scalability", correct: false },
            { text: "Better security", correct: false },
        ]
    },
    {
        question: "Which cloud computing model combines elements of public and private clouds?",
        answers: [
            { text: "Hybrid cloud", correct: true },
            { text: "Community cloud", correct: false },
            { text: "Multi-cloud", correct: false },
            { text: "On-premises cloud", correct: false },
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