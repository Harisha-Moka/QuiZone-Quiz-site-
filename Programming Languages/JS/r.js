const questions = [
    {
        question: "What is the primary data structure in R for storing a collection of elements of the same data type?",
        answers: [
            { text: "List", correct: false},
            { text: "Data frame", correct: false },
            { text: "Vector", correct: true },
            { text: "Matrix", correct: false },
        ]
    },
    {
        question: "How do you create a sequence of numbers from 1 to 10 in R?",
        answers: [
            { text: "seq(1, 10)", correct: false},
            { text: "1:10", correct: false },
            { text: "range(1, 10)", correct: false },
            { text: "Both a and b", correct: true },
        ]
    },
    {
        question: "Which function is used to extract elements from a vector in R?",
        answers: [
            { text: "subset()", correct: false},
            { text: "extract()", correct: false },
            { text: "slice()", correct: false },
            { text: " []", correct: true },
        ]
    },
    {
        question: "What is the difference between a list and a data frame in R?",
        answers: [
            { text: "Lists can store elements of different data types, while data frames can only store elements of the same data type.", correct: true },
            { text: "Lists are ordered, while data frames are unordered.", correct: false },
            { text: "Lists can have named elements, while data frames cannot.", correct: false },
            { text: "There is no difference between lists and data frames.", correct: false },
        ]
    },
    {
        question: "Which function is used to create a data frame in R?",
        answers: [
            { text: "data.frame()", correct: true },
            { text: "create.df()", correct: false },
            { text: "new.df()", correct: false },
            { text: "dataframe()", correct: false },
        ]
    },
    {
        question: "How do you access the second column of a data frame named \"my_data\"?",
        answers: [
            { text: "my_data[2]", correct: false},
            { text: "my_data[, 2]", correct: true },
            { text: "my_data[2, ]", correct: false },
            { text: "my_data$column2", correct: false },
        ]
    },
    {
        question: "What is the purpose of the ggplot2 package in R?",
        answers: [
            { text: "Statistical modeling", correct: false},
            { text: "Data manipulation", correct: false },
            { text: "Data visualization", correct: true },
            { text: "Machine learning", correct: false },
        ]
    },
    {
        question: "Which function is used to create a scatter plot using ggplot2?",
        answers: [
            { text: "geom_bar()", correct: false},
            { text: "geom_line()", correct: false },
            { text: "geom_point()", correct: true },
            { text: "geom_histogram()", correct: false },
        ]
    },
    {
        question: "What is the primary function of the dplyr package in R?",
        answers: [
            { text: "Data visualization", correct: false},
            { text: "Statistical modeling", correct: false },
            { text: "Data manipulation", correct: true},
            { text: "Machine learning", correct: false },
        ]
    },
    {
        question: "How do you create a new variable in a data frame named \"my_data\" by adding the values of two existing variables \"x\" and \"y\"?",
        answers: [
            { text: "my_data$new_variable <- my_data$x + my_data$y", correct: true},
            { text: "my_data$new_variable = my_data$x + my_data$y", correct: false },
            { text: "new_variable <- my_data$x + my_data$y", correct: false },
            { text: "my_data[\"new_variable\"] <- my_data[\"x\"] + my_data[\"y\"]", correct: false },
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