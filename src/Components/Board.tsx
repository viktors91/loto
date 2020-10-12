import React, { useState, useContext } from 'react'
import { DropedNumbersContextProvider } from '../Contexts/dropedNumbersContext'
import SettingsContext from '../Contexts/settingsContext'
import Modal from '../Components/Modal/Modal'
import update from 'immutability-helper'
import DroppedNumbers from '../Components/DroppedNumbers'
import Card from '../Components/Card/Card'

interface BoardProps {
    cards: Array<{
        id: number,
        template: (number | null)[][]
    }>
}

const Board: React.FC<BoardProps> = ({ cards }) => {

    const [modalData, setModalData] = useState({ show: false, win: true })
    const [dropedNumbers, setDroppedNumbers] = useState<number[]>([])
    const [stopInterval, setStopInterval] = useState(false)
    const { userName, setShowBoard } = useContext(SettingsContext)

    const generateStartingNumbers = () => [...Array(90)].map((_, index) => index + 1);
    const [remainingNumbers, setRemainingNumbers] = useState<number[]>(generateStartingNumbers)


    const generateNumber = () => {
        const remainingNumberIndex = Math.floor(Math.random() * remainingNumbers.length)
        setDroppedNumbers(update(dropedNumbers, { $push: [remainingNumbers[remainingNumberIndex]] }))
        setRemainingNumbers(update(remainingNumbers, { $splice: [[remainingNumberIndex, 1]] }));
    }

    const startGame = () => {
        generateNumber()
    }

    const toggleModal = () => {
        setModalData({ ...modalData, show: true })
    }

    return (
        <DropedNumbersContextProvider
            value={{
                droppedNumbers: [...dropedNumbers]
            }}
        >
            <div>
                <DroppedNumbers
                    dropedNumbersState={[dropedNumbers, setDroppedNumbers]}
                    remainingNumbersState={[remainingNumbers, setRemainingNumbers]}
                    generateNumber={generateNumber}
                    stopInterval={stopInterval}
                />
                <hr />
                <div className="game-board mt-3">
                    <div className="row justify-content-between">
                        {cards.map((card, i) => (
                            <Card
                                key={i}
                                id={card.id}
                                template={card.template}
                                toggleModal={toggleModal}
                                setStopInterval={setStopInterval}
                                setModalData={setModalData}
                            />
                        ))}
                    </div>
                </div>
                <hr />
                <div className="buttons-panel mt-3 justify-content-center d-flex">
                    {dropedNumbers.length === 0 ?
                        <button className="btn btn-primary btn-ghost" onClick={startGame}>Start</button>
                        :
                        <button className="btn btn-primary btn-ghost" onClick={() => setShowBoard(false)}>Stop / Restart</button>
                    }
                </div>
            </div>
            {modalData.show && (
                <Modal
                    modalData={modalData}
                    toggleModal={toggleModal}
                    usedNumbers={dropedNumbers.length}
                    setShowBoard={setShowBoard}
                    userName={userName}
                >
                </Modal>
            )}
        </DropedNumbersContextProvider>
    )
}

export default Board