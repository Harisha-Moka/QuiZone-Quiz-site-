const questions = [
    {
        question: "What is the main purpose of PyQt5?",
        answers: [
            { text: "To create web applications", correct: false},
            { text: "To develop cross-platform desktop applications", correct: true },
            { text: "To build mobile apps", correct: false },
            { text: "To design databases", correct: false },
        ]
    },
    {
        question: "Which of the following is the base class for all widgets in PyQt5?",
        answers: [
            { text: "QApplication", correct: false},
            { text: "QWidget", correct: true },
            { text: "QMainWindow", correct: false },
            { text: "QDialog", correct: false },
        ]
    },
    {
        question: " What is the correct way to create a simple window using PyQt5?",
        answers: [
            { text: "app = QApplication()", correct: false},
            { text: "window = QWidget()", correct: false },
            { text: "window.show()", correct: false },
            { text: "All the above", correct: true },
        ]
    },
    {
        question: "How do you set the title of a window in PyQt5?",
        answers: [
            { text: "window.title = \"My Window\"", correct: false},
            { text: "window.setWindowTitle(\"My Window\")", correct: false },
            { text: "window.setTitle(\"My Window\")", correct: false },
            { text: "window.setCaption(\"My Window\")", correct: false },
        ]
    },
    {
        question: "What is the purpose of the QApplication class in PyQt5?",
        answers: [
            { text: " It provides the main application loop", correct: true },
            { text: "It creates the main window", correct: false },
            { text: "It handles events", correct: false },
            { text: "All of the above", correct: false },
        ]
    },
    {
        question: "Which widget is commonly used to display text in PyQt5?",
        answers: [
            { text: "QLabel", correct: true },
            { text: " QLineEdit", correct: false },
            { text: "QPushButton", correct: false },
            { text: "QComboBox", correct: false },
        ]
    },
    {
        question: "How do you create a button with the text \"Click me\" in PyQt5?",
        answers: [
            { text: "button = QPushButton(\"Click me\")", correct: true },
            { text: "button.setText(\"Click me\")", correct: false },
            { text: "button = Button(\"Click me\")", correct: false },
            { text: "button = QButton(\"Click me\")", correct: false },
        ]
    },
    {
        question: " How do you connect a button's click event to a function in PyQt5?",
        answers: [
            { text: "button.clicked.connect(my_function)", correct: true},
            { text: "button.onClick(my_function)", correct: false },
            { text: "button.addEventListener(my_function)", correct: false },
            { text: "button.addEventListener(my_function)", correct: false },
        ]
    },
    {
        question: "What is the layout manager used to arrange widgets in a grid-like fashion in PyQt5?",
        answers: [
            { text: "QGridLayout", correct: true },
            { text: "QVBoxLayout", correct: false },
            { text: " QHBoxLayout", correct: false },
            { text: " QFormLayout", correct: false },
        ]
    },
    {
        question: "How do you exit the application in PyQt5?",
        answers: [
            { text: "app.quit()", correct: false},
            { text: "sys.exit()", correct: false },
            { text: "app.close()", correct: false },
            { text: "Both A and B", correct: true },
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