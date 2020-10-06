import React, { useState } from 'react';
// import Card from './Components/Card/Card'
// import DroppedNumbers from './Components/DroppedNumbers'
// import update from 'immutability-helper'
// import { TemplatesContextProvider } from './Contexts/templatesContext'
// import Modal from './Components/Modal/Modal'
import Board from './Components/Board'
import { templates } from './templates.json'


const App = () => {
  const [gameData, setGameData] = useState({ userName: '', cards: 1 })
  const [showBoard, setShowBoard] = useState(false)

  const renderGameInfoForm = () => {
    return (
      <div className="form-wrapper">
        <form className="login-form" onSubmit={e => e.preventDefault()}>
          <h1>Game Info</h1>
          <div className="form-input-material">
            <label className="d-block">Username</label>
            <input type="text" name="username" onChange={event => setGameData({ ...gameData, userName: event.target.value })} placeholder=" " className="form-control-material" required />
          </div>
          <div className="form-input-material">
            <label className="d-block">Card count</label>
            <select className="col-6" value={gameData.cards} onChange={event => setGameData({ ...gameData, cards: parseInt(event.target.value) })}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-ghost" onClick={() => setShowBoard(true)}>Start</button>
        </form>
      </div>
    )
  }

  const genereteGameCards = () => {
    let templatesRef = [...templates]
    let gameCards = []

    for (let index = gameData.cards; index > 0; index--) {
        const template = templatesRef[Math.floor(Math.random() * templatesRef.length)];
        gameCards.push(template)
        templatesRef = templatesRef.filter(item => item !== template)
    }
    
    return gameCards
}

  return (
    <React.Fragment>
      {!showBoard && renderGameInfoForm()}
      {showBoard && (
        // <TemplatesContextProvider
        //   value={[...templates]}
        // >
          <Board
            userName={gameData.userName}
            cards={genereteGameCards()}
          ></Board>
        // </TemplatesContextProvider>
      )}
    </React.Fragment>
  )
}

export default App;
