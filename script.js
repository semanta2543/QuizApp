// Define an array of quiz questions, each containing a question string 
// and an array of answer objects with text and correctness properties
const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true },
            { text: "Bhutan", correct: false },
            { text: "Nepal", correct: false },
            { text: "Monacco", correct: false },
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: true },
            { text: "Antarctica", correct: false },
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false },
        ]
    }
];

// Get reference to HTML elements
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// Initialize current question index and score variables
let currentQuestionIndex = 0;
let score = 0;

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
}

// Function to display the current question
function showQuestion() {
    // Reset the answer buttons area
    resetState();
    // Get the current question from the questions array
    const currentQuestion = questions[currentQuestionIndex];
    // Display the question text
    questionElement.innerText = currentQuestion.question;
    // Iterate through each answer and create buttons for them
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerButtonsElement.appendChild(button);
        // If the answer is correct, mark it as correct using dataset
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        // Add event listener to each button for answer selection
        button.addEventListener("click", selectAnswer);
    });
}

// Function to reset the state of answer buttons area
function resetState() {
    nextButton.style.display = "none";
    // Remove all child elements (answer buttons)
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Function to handle user's answer selection
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    // Add appropriate class based on correctness for styling
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    // Disable all answer buttons after selection
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    // Display the next button
    nextButton.style.display = "block";
}

// Function to display the final score
function showScore() {
    resetState();
    // Display the score and total number of questions
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    // Change the next button text to "Play Again"
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

// Function to handle the next button click
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        // Show the next question
        showQuestion();
    } else {
        // If all questions are answered, show the final score
        showScore();
    }
}

// Event listener for the next button click
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        // If the quiz is completed, start again
        startQuiz();
    }
});

// Start the quiz when the page loads
startQuiz();
