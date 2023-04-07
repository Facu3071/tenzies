import { useEffect } from "react";
import { useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  function allNewDice() {
    const arrayDice = [];
    for (let i = 0; i < 10; i++) {
      arrayDice.push(generateNewDie());
    }
    return arrayDice;
  }
  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6),
      id: nanoid(),
      isHeld: false,
    };
  }
  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? { ...die } : generateNewDie();
        })
      );
      setCount((oldCount) => oldCount + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  const dieElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    );
  });
  return (
    <main className="main">
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <h4>
        Roll until all dice are the same. Click each dice to freeze it at it's
        current value between rolls.
      </h4>
      <div className="dice--container">{dieElements}</div>
      <button onClick={rollDice} className="dice--btn">
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
