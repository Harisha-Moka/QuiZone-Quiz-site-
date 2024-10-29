const questions = [
    {
        question: "Ajit has a certain average for 9 innings. In the tenth innings, he scores 100 runs thereby increasing his average by 8 runs. His new average is: ",
        answers: [
            { text: "20", correct: false},
            { text: "21", correct: false },
            { text: "28", correct: true },
            { text: "32", correct: false },
        ]
    },
    {
        question: "RS. 1200 is lent out at 5% per annum simple interest for 3 years. Find the amount after 3 years.",
        answers: [
            { text: "1380", correct: true },
            { text: "1290", correct: false },
            { text: "1470", correct: false },
            { text: "1200", correct: false },
        ]
    },
    {
        question: "The population of a town increases every year by 4%. If its present population is 50,000, then after 2 years it will be",
        answers: [
            { text: "53,900", correct: false},
            { text: "54,000", correct: false },
            { text: "54,080", correct: true },
            { text: "54,900", correct: false },
        ]
    },
    {
        question: "If a:b:c=3:4:7, then the ratio (a+b+c):c is equal to",
        answers: [
            { text: "2:1", correct: true},
            { text: "14:3", correct: false },
            { text: "7:2", correct: false },
            { text: "1:2", correct: false },
        ]
    },
    {
        question: "The speed of A and B are in the ratio 3:4. A takes 20 minutes more than B to reach a destination. Time in which A reach the destination?",
        answers: [
            { text: "2 hours", correct: false},
            { text: "1 1/3 hours", correct: true },
            { text: "2 2/3 hours", correct: false },
            { text: "1 2/3 hours", correct: false },
        ]
    },
    {
        question: "How many Permutations of the letters of the word APPLE are there?",
        answers: [
            { text: "600", correct: false},
            { text: "120", correct: false },
            { text: "240", correct: false },
            { text: "60", correct: true },
        ]
    },
    {
        question: "If 10 men can do a piece of work in 12 days, the time taken by 12 men to do the same piece of work will be:",
        answers: [
            { text: "12 days", correct: false},
            { text: "10 days", correct: false },
            { text: "9 days", correct: false },
            { text: "8 days", correct: false },
        ]
    },
    {
        question: "There is 60% increase in amount in 6 years at simple interest. What will be the compound interest of Rs.12,000 after 3 years at the same rate?",
        answers: [
            { text: "2160", correct: false},
            { text: "3120", correct: false },
            { text: "3972", correct: true },
            { text: "6240", correct: false },
        ]
    },
    {
        question: "Find the greatest number that will divide 43, 91 and 183 ao as to leave the same remainder in each case.",
        answers: [
            { text: "4", correct: true },
            { text: "7", correct: false },
            { text: "9", correct: false },
            { text: "13", correct: false },
        ]
    },
    {
        question: "In a shower, 5cm of rain falls. The volume of water that falls on 1.5 heactares of ground is:",
        answers: [
            { text: "75 cu.m", correct: false},
            { text: "750 cu.m", correct: true },
            { text: "7500 cu.m", correct: false },
            { text: "75000 cu.m", correct: false },
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