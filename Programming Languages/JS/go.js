const questions = [
    {
        question: "What is the primary purpose of the defer keyword in Go?",
        answers: [
            { text: "To delay the execution of a function until the program terminates.", correct: false},
            { text: " To ensure that a function is executed regardless of whether an error occurs.", correct: true },
            { text: " To create a goroutine that runs concurrently with the main program.", correct: false },
            { text: "To define a custom data type in Go.", correct: false },
        ]
    },
    {
        question: "Which of the following is NOT a built-in data type in Go?",
        answers: [
            { text: "int", correct: false},
            { text: "float32", correct: false },
            { text: "bool", correct: false },
            { text: "string", correct: true },
        ]
    },
    {
        question: "What is the correct way to declare a constant in Go?",
        answers: [
            { text: "const x = 10", correct: true },
            { text: "var x = 10", correct: false },
            { text: "x := 10", correct: false },
            { text: "define x = 10", correct: false },
        ]
    },
    {
        question: "How do you create a new slice in Go?",
        answers: [
            { text: "slice := []int{1, 2, 3}", correct: false},
            { text: "slice := new([]int)", correct: false },
            { text: "slice := make([]int, 3)", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "What is the purpose of the go keyword in Go?",
        answers: [
            { text: "To define a function", correct: false},
            { text: "To create a new variable", correct: false },
            { text: "To start a new goroutine", correct: true },
            { text: "To import a package", correct: false },
        ]
    },
    {
        question: "Which of the following is a valid way to declare a function in Go?",
        answers: [
            { text: "func myFunction()", correct: true },
            { text: "function myFunction()", correct: false },
            { text: "procedure myFunction()", correct: false },
            { text: "define myFunction()", correct: false },
        ]
    },
    {
        question: "What is the output of the following Go code? \n x:=10 \ny:=&x\n *y=20\n fmt.Println(x) ",
        answers: [
            { text: "10", correct: false},
            { text: "20", correct: true },
            { text: "0", correct: false },
            { text: "An error occurs", correct: false },
        ]
    },
    {
        question: "How can you check if an error occurred in Go?",
        answers: [
            { text: "By using the if err != nil statement", correct: true },
            { text: "By using the try-catch block", correct: false },
            { text: "By using the throw statement", correct: false },
            { text: "By using the except keyword", correct: false },
        ]
    },
    {
        question: "What is the purpose of the interface{} type in Go?",
        answers: [
            { text: "To define a custom data type", correct: false},
            { text: "To represent a generic type that can hold any value", correct: true },
            { text: "To create a new goroutine", correct: false },
            { text: " To import a package", correct: false },
        ]
    },
    {
        question: "What is the correct way to define a struct in Go?",
        answers: [
            { text: "struct Person { name string, age int }", correct: false},
            { text: "type Person struct { name string, age int }", correct: true },
            { text: "class Person { name string, age int }", correct: false },
            { text: "define Person { name string, age int }", correct: false },
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