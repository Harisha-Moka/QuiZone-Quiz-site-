const questions = [
    {
        question: "What is the primary purpose of Selenium?",
        answers: [
            { text: "To create web applications", correct: false},
            { text: "To test web applications", correct: true },
            { text: "To develop mobile apps", correct: false },
            { text: "To analyze web traffic", correct: false },
        ]
    },
    {
        question: "Which component of Selenium is used to automate browser interactions?",
        answers: [
            { text: "Selenium IDE", correct: false},
            { text: "Selenium WebDriver", correct: true },
            { text: "Selenium Grid", correct: false },
            { text: "Selenium Server", correct: false },
        ]
    },
    {
        question: "Which programming languages are supported by Selenium WebDriver?",
        answers: [
            { text: "Java, Python, C++", correct: false},
            { text: "Java, Python, C#", correct: false },
            { text: "Java, JavaScript, C#", correct: false },
            { text: "Java, Python, Ruby", correct: true },
        ]
    },
    {
        question: "What is the term for a web element that can be interacted with by Selenium WebDriver?",
        answers: [
            { text: "Locator", correct: false},
            { text: "Selector", correct: false },
            { text: "WebElement", correct: true },
            { text: "WebDriver", correct: false },
        ]
    },
    {
        question: "Which locator strategy is commonly used to identify web elements by their unique ID attribute?",
        answers: [
            { text: "ID", correct: true},
            { text: "Name", correct: false },
            { text: "XPath", correct: false },
            { text: "CSS Selector", correct: false },
        ]
    },
    {
        question: "What is the purpose of Selenium Grid?",
        answers: [
            { text: "To distribute test execution across multiple machines", correct: false},
            { text: "To create web applications", correct: false },
            { text: "To test mobile apps", correct: false },
            { text: "To analyze web traffic", correct: false },
        ]
    },
    {
        question: "Which Selenium component is a browser plugin that can be used for recording and playback of test scripts?",
        answers: [
            { text: "Selenium IDE", correct: true},
            { text: "Selenium WebDriver", correct: false },
            { text: "Selenium Grid", correct: false },
            { text: "Selenium Server", correct: false },
        ]
    },
    {
        question: "What is the term for a script that contains a sequence of instructions for testing a web application?",
        answers: [
            { text: "Test case", correct: false},
            { text: "Test suite", correct: false },
            { text: "Test script", correct: true },
            { text: "Test plan", correct: false },
        ]
    },
    {
        question: "Which method in Selenium WebDriver is used to find a web element by its ID?",
        answers: [
            { text: "findElementById()", correct: true },
            { text: "findElementByName()", correct: false },
            { text: "findElementByXPath()", correct: false },
            { text: "findElementByCssSelector()", correct: false },
        ]
    },
    {
        question: "What is the purpose of the sendKeys() method in Selenium WebDriver?",
        answers: [
            { text: "To simulate user input", correct: true },
            { text: "To find web elements", correct: false },
            { text: "To perform browser actions", correct: false },
            { text: "To wait for elements to load", correct: false },
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