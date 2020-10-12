import React, { useState } from 'react';
// import Card from './Components/Card/Card'
// import DroppedNumbers from './Components/DroppedNumbers'
// import update from 'immutability-helper'
import { SettingsContextProvider } from './Contexts/settingsContext'
// import Modal from './Components/Modal/Modal'
import Board from './Components/Board'
import { templates } from './templates.json'
// import { Levels } from './Enums/levels'

const getTimer = (gameLevel: number) => {
  switch (gameLevel) {
    case 0: return 5000
    case 1: return 3000
    case 2: return 1500
    default: return 3000
  }
}

const getAllowedMissedClicks = (gameLevel: number) => {
  switch (gameLevel) {
    case 0: return 7
    case 1: return 5
    case 2: return 3
    default: return 5
  }
}

const App = () => {
  const [gameData, setGameData] = useState({ userName: '', cards: 1, level: 1 })
  const [showBoard, setShowBoard] = useState(false)

  const renderGameInfoForm = () => {
    return (
      <div className="form-wrapper">
        <form className="login-form" onSubmit={e => e.preventDefault()}>
          <h1>Game Info</h1>
          <div className="form-input-material">
            <label className="d-block">Username</label>
            <input type="text" name="username" onChange={event => setGameData({ ...gameData, userName: event.target.value })} placeholder=" " className="col form-control-material" />
          </div>
          <div className="col p-0 d-flex justify-content-between">
            <div className="form-input-material p-0 col-5">
              <label className="d-block">Card count</label>
              <select className="col" value={gameData.cards} onChange={event => setGameData({ ...gameData, cards: parseInt(event.target.value) })}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
            <div className="form-input-material p-0 col-5">
              <label className="d-block">Level</label>
              <select className="col" value={1} onChange={event => setGameData({ ...gameData, level: parseInt(event.target.value) })}>
                <option value={0}>Easy</option>
                <option value={1}>Medium</option>
                <option value={2}>Hard</option>
              </select>
            </div>
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
        <SettingsContextProvider
          value={{
            userName: gameData.userName,
            timer: getTimer(gameData.level),
            allowedMissedClicks: getAllowedMissedClicks(gameData.level),
            setShowBoard: setShowBoard
          }}
        >
          <Board
            // userName={gameData.userName}
            // gameLevel={gameData.level}
            cards={genereteGameCards()}
          // setShowBoard={setShowBoard}
          ></Board>
        </SettingsContextProvider>
      )}
    </React.Fragment>
  )
}

export default App;
