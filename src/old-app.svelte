<script>
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars"
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4"
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let showScore = false;

  function handleAnswer(selectedAnswer) {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      score++;
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
    } else {
      showScore = true;
    }
  }

  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showScore = false;
  }
</script>

<main>
  <div class="quiz-container">
    {#if !showScore}
      <div class="question-card">
        <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
        <p>{questions[currentQuestionIndex].question}</p>
        <div class="options">
          {#each questions[currentQuestionIndex].options as option}
            <button on:click={() => handleAnswer(option)}>
              {option}
            </button>
          {/each}
        </div>
      </div>
    {:else}
      <div class="score-card">
        <h2>Quiz Complete!</h2>
        <p>Your score: {score} out of {questions.length}</p>
        <button on:click={restartQuiz}>Try Again</button>
      </div>
    {/if}
  </div>
</main>

<style>
  .quiz-container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
  }

  .question-card, .score-card {
    background: #f5f5f5;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }

  button {
    padding: 0.8rem 1.2rem;
    border: none;
    border-radius: 4px;
    background: #007bff;
    color: white;
    cursor: pointer;
    transition: background 0.2s;
  }

  button:hover {
    background: #0056b3;
  }

  h2 {
    margin-bottom: 1rem;
  }
</style>