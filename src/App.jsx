
import { useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState(
    () => Math.floor(Math.random() * 100) + 1
  );
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Guess a number between 1 and 100!");
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState("Easy");
  const [gameOver, setGameOver] = useState(false);

  const maxNumber =
    level === "Easy" ? 50 : level === "Medium" ? 100 : 200;

  function checkGuess(e) {
    e.preventDefault();

    const value = Number(guess);

    if (guess === "" || value < 1 || value > maxNumber) {
      setMessage(`Enter a number between 1 and ${maxNumber}.`);
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (value === number) {
      const points = Math.max(10, 100 - (newAttempts - 1) * 10);
      setScore(previous => previous + points);
      setMessage(`🎉 Correct! You earned ${points} points!`);
      setGameOver(true);
    } else if (value < number) {
      setMessage("📉 Too low! Try a higher number.");
    } else {
      setMessage("📈 Too high! Try a lower number.");
    }

    setGuess("");
  }

  function changeLevel(e) {
    const newLevel = e.target.value;
    const limit =
      newLevel === "Easy" ? 50 :
      newLevel === "Medium" ? 100 : 200;

    setLevel(newLevel);
    setNumber(Math.floor(Math.random() * limit) + 1);
    setGuess("");
    setAttempts(0);
    setGameOver(false);
    setMessage(`Guess a number between 1 and ${limit}!`);
  }

  function restartGame() {
    setNumber(Math.floor(Math.random() * maxNumber) + 1);
    setGuess("");
    setAttempts(0);
    setGameOver(false);
    setMessage(`Guess a number between 1 and ${maxNumber}!`);
  }

  return (
    <div className="game-container">
      <div className="game-card">
        <div className="game-icon">🎯</div>

        <h1>Number Guessing Game</h1>
        <p className="subtitle">
          Can you guess the secret number?
        </p>

        <div className="score-box">
          <div>
            <span>🏆 Score</span>
            <h2>{score}</h2>
          </div>
          <div>
            <span>🎮 Attempts</span>
            <h2>{attempts}</h2>
          </div>
        </div>

        <label htmlFor="level">Select Difficulty</label>
        <select
          id="level"
          value={level}
          onChange={changeLevel}
          disabled={false}
        >
          <option value="Easy">Easy (1–50)</option>
          <option value="Medium">Medium (1–100)</option>
          <option value="Hard">Hard (1–200)</option>
        </select>

        <form onSubmit={checkGuess}>
          <label htmlFor="guess">Enter your guess</label>
          <input
            id="guess"
            type="number"
            min="1"
            max={maxNumber}
            value={guess}
            onChange={e => setGuess(e.target.value)}
            placeholder={`Enter 1 to ${maxNumber}`}
            disabled={gameOver}
          />

          <button
            type="submit"
            className="guess-button"
            disabled={gameOver}
          >
            Check Guess
          </button>
        </form>

        <div className="message" aria-live="polite">
          {message}
        </div>

        {gameOver && (
          <p className="answer">
            The secret number was {number}.
          </p>
        )}

        <button className="restart-button" onClick={restartGame}>
          🔄 Play Again
        </button>
      </div>
    </div>
  );
}

export default App;
