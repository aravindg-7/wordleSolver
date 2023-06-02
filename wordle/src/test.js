import './App.css';
import React, { useState } from 'react';

function App() {

  return (
    <div className = 'container'>
    <header>
    <h1 className = 'text-white'>WORDLE CLONE</h1>
    </header>
    <div className='board-container'>
    <div><Grid/></div>

    </div>
    
    </div>
  );
}

const Grid = () => {
  const [gridCells, setGridCells] = useState([]);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState([]);

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

  // Update cell content when edited
  const updategrid = (value, cellKey) => {
    console.log(value.key)
    const updatedCells = gridCells.map((cell) =>
      cell.key === cellKey ? { ...cell, content: value.key } : cell
    );
    console.log(updatedCells)
    setGridCells(updatedCells);
  };

  const handle = (e) => {

    console.log('event')

    let w = guess
  
    if (e === 'Backspace' && w.length > 0) {
      w.pop()
      setGuess(w);
      updategrid('',`${score}-${w.length}`)
    }
  
    if ( e => {(/[a-zA-Z]/).test(e)} ) {
      w.push(e)
      setGuess(w)
      console.log('write',`${score}-${w.length}`)
      updategrid(e,`${score}-${w.length}`)
    }
  
  }

  // Render grid cells
  const renderGridCells = () => {
    return gridCells.map((cell) => (
      <div key={cell.key} className="grid-cell">
      </div>
    ));
  };

  return (<div><div className="grid">{renderGridCells()}</div>
  <input type='text' onKeyUp={e => handle(e)}></input>
  </div>);
};


export default App;
