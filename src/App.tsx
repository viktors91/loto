import React, { useState, useEffect } from 'react';
import Card from './Components/Card/Card'
import DroppedNumbers from './Components/DroppedNumbers'
import update from 'immutability-helper'
import { DropedNumbersContextProvider } from './dropedNumbersContext'
import Modal from './Components/Modal/Modal'

const templateOne: any[] = [
  [2, null, null, 32, null, 57, null, 73, 88],
  [4, 17, 29, null, null, null, 61, null, null],
  [null, 18, 27, 31, 49, null, null, 75, null]
]

const templateTwo: any[] = [
  [null, 15, 21, null, 46, 53, null, null, 80],
  [9, null, null, 32, null, 58, 61, null, 83],
  [2, 11, null, null, 41, 50, null, 74, null]
]

const App = () => {
  
  const [showModal, setShowModal] = useState(false)
  const [dropedNumbers, setDroppedNumbers] = useState<Number[]>([])
  const [remainingNumbers, setRemainingNumbers] = useState<Number[]>([])

  const generateStartingNumbers = () => [...Array(90)].map((_, index) => index + 1);

  useEffect(() => {
    setRemainingNumbers(update(remainingNumbers, { $push: generateStartingNumbers() }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const generateNumber = () => {
    let remainingNumberIndex = Math.floor(Math.random() * remainingNumbers.length)

    setDroppedNumbers(update(dropedNumbers, { $push: [remainingNumbers[remainingNumberIndex]] }))
    setRemainingNumbers(update(remainingNumbers, { $splice: [[remainingNumberIndex, 1]] }));

  }

  const toggleModal = () => {
    setShowModal(opened => !opened)
  }

  return (
    <DropedNumbersContextProvider
      value={[...dropedNumbers]  }
    >
      <DroppedNumbers numbers={dropedNumbers} />
      
      <Card id={0} template={templateOne} toggleModal={toggleModal}/>
      <Card id={1} template={templateTwo} toggleModal={toggleModal}/>

      <button onClick={generateNumber}>Generate</button>
      {showModal && (
        <Modal
          show={showModal}
          toggleModal={toggleModal}
        >
          <p>Modal</p>
          <p>Data</p>
        </Modal>
      )}
    </DropedNumbersContextProvider>
  )
}

export default App;
