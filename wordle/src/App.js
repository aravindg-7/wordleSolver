import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  return (
    <div className = 'container'>
    <header>
    <h1 className = 'text-white'>WORDLE CLONE</h1>
    </header>
    <div><Grid></Grid></div>
    
    </div>
  );
}

const Grid = () => {
  const [gridCells, setGridCells] = useState([]);
  // Generate initial grid cells
  useState(() => {
    const initialCells = [];

    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 5; col++) {
        const cellKey = `${row}-${col}`;
        const cellContent = '';

        initialCells.push({ key: cellKey, content: cellContent });
      }
    }

    setGridCells(initialCells);
  });

  // Render grid cells
  const renderGridCells = () => {
    return gridCells.map((cell) => (
      <div
        key={cell.key}
        className="grid-cell"
      >
        {cell.content}
      </div>
    ));
  };

  return (<div>
  <div className='board-container'>
  <div className="grid-container">{renderGridCells()}</div></div>
  <div id='#qwerty-container'><Qwerty setGridCells = {setGridCells} ></Qwerty></div>
  </div>);
};

const Qwerty =  ({setGridCells}) => {

  const [guess,setGuess] = useState([])
  const [score,setScore] = useState(0)
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState([])
  useEffect(() => {
    fetch('/answer')
      .then(response => response.json())
      .then(data => {
        setAnswer(data['ans']);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const sendData = () => {
    const data = {
      'value': guess.toString(),
      'answer': answer,
    };

    fetch('/game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(responseData => {
        setResult(responseData['result'])
      })
      .catch(error => {
        console.error(error);
      });
  };
  const click = (e) => {
    // console.log(e.target.value)
    if (guess.length > 0 && e.target.value === 'del'){
      guess.pop()
      setGuess(guess)
      updateGrid('',`${score}-${guess.length}`)
    }
    
    else if (guess.length === 5 && e.target.value === 'enter'){
      setScore(score+1)
      sendData()
    }

    else if(guess.length < 5 && e.target.value !== 'del' && e.target.value !== 'enter'){
      console.log(guess,guess.length)
      updateGrid(e.target.value.toUpperCase(),`${score}-${guess.length}`)
      guess.push(e.target.value)
      setGuess(guess)

    }

  }
  // Update cell content when clicked
  const updateGrid = (value,cellKey) => {
    setGridCells((prevCells) =>
      prevCells.map((cell) =>
        cell.key === cellKey ? { ...cell, content: value } : cell
      )
    );
  };
  return (<div>
    <div className="keyboard-row">
            <button value="q" onClick={ e => click(e) }>q</button>
            <button value="w" onClick={ e => click(e) }>w</button>
            <button value="e" onClick={ e => click(e) }>e</button>
            <button value="r" onClick={ e => click(e) }>r</button>
            <button value="t" onClick={ e => click(e) }>t</button>
            <button value="y" onClick={ e => click(e) }>y</button>
            <button value="u" onClick={ e => click(e) }>u</button>
            <button value="i" onClick={ e => click(e) }>i</button>
            <button value="o" onClick={ e => click(e) }>o</button>
            <button value="p" onClick={ e => click(e) }>p</button>
          </div>
          <div className="keyboard-row">
            <div className="spacer-half"></div>
            <button value="a" onClick={ e => click(e) }>a</button>
            <button value="s" onClick={ e => click(e) }>s</button>
            <button value="d" onClick={ e => click(e) }>d</button>
            <button value="f" onClick={ e => click(e) }>f</button>
            <button value="g" onClick={ e => click(e) }>g</button>
            <button value="h" onClick={ e => click(e) }>h</button>
            <button value="j" onClick={ e => click(e) }>j</button>
            <button value="k" onClick={ e => click(e) }>k</button>
            <button value="l" onClick={ e => click(e) }>l</button>
            <div className="spacer-half"></div>
          </div>
          <div className="keyboard-row">
            <button value="enter" className="wide-button" onClick={ e => click(e) }>Enter</button>
            <button value="z" onClick={ e => click(e) }>z</button>
            <button value="x" onClick={ e => click(e) }>x</button>
            <button value="c" onClick={ e => click(e) }>c</button>
            <button value="v" onClick={ e => click(e) }>v</button>
            <button value="b" onClick={ e => click(e) }>b</button>
            <button value="n" onClick={ e => click(e) }>n</button>
            <button value="m" onClick={ e => click(e) }>m</button>
            <button value="del" className="wide-button" onClick={ e => click(e) }>Del</button>
          </div>
        </div>
  );
}


export default App;
