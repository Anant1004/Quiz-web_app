const questions = [
    {
        question : "which is the fastest animal in the world",
        answers : [
            {text : "shark", correct : false},
            {text : "cheetah", correct : true},
            {text : "dog", correct : false},
            {text : "whale", correct : false},
        ]
    },
    {
        question : "What is the capital of Australia ?",
        answers : [
            {text : " Sydney", correct : false},
            {text : "Canberra", correct : true},
            {text : "Melbourne", correct : false},
            {text : "Brisbane", correct : false},
        ]
    },
    {
        question : "In which year did the Titanic sink ?",
        answers : [
            {text : "1912", correct : true},
            {text : "1920", correct : false},
            {text : "1905", correct : false},
            {text : "1931", correct : false},
        ]
    },
    {
        question : "Who wrote the play 'Romeo and Juliet'?",
        answers : [
            {text : "Charles Dickens", correct : false},
            {text : "Jane Austen", correct : false},
            {text : "William Shakespeare", correct : true},
            {text : "Mark Twain", correct : false},
        ]
    },
    {
        question : "What is the chemical symbol for gold?",
        answers : [
            {text : "Gd", correct : false},
            {text : "Ag", correct : false},
            {text : "Au", correct : true},
            {text : "Fe", correct : false},
        ]
    },
    {
        question : "Which planet is known as the Red Planet?",
        answers : [
            {text : "Mars", correct : true},
            {text : "Venus", correct : false},
            {text : "Saturn", correct : false},
            {text : "Jupiter", correct : false},
        ]
    },
    {
        question : "Which famous scientist developed the theory of relativity?",
        answers : [
            {text : "Isaac Newton", correct : false},
            {text : "Galileo Galilei", correct : false},
            {text : "Albert Einstein", correct : true},
            {text : "Stephen Hawking", correct : false},
        ]
    },
    {
        question : "What is the largest mammal in the world?",
        answers : [
            {text : "Elephant", correct : false},
            {text : "Giraffe", correct : false},
            {text : "Hippopotamus", correct : false},
            {text : "Blue whale", correct : true},
        ]
    },
    {
        question : "What is the largest ocean on Earth ?",
        answers : [
            {text : "Atlantic Ocean", correct : false},
            {text : "Indian Ocean", correct : false},
            {text : "Arctic Ocean", correct : false},
            {text : "Pacific Ocean", correct : true},
        ]
    },
    {
        question : "In which year did the United States declare its independence ?",
        answers : [
            {text : "1765", correct : false},
            {text : "1789", correct : false},
            {text : "1776", correct : true},
            {text : "1801", correct : false},
        ]
    }
];
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
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct; 
        }
        button.addEventListener('click', selectAnswer);
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
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block"; 
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();