import React, { useCallback, useState, useEffect } from 'react'
import { DropedNumbersContextProvider } from '../Contexts/dropedNumbersContext'
import Modal from '../Components/Modal/Modal'
import update from 'immutability-helper'
import DroppedNumbers from '../Components/DroppedNumbers'
import Card from '../Components/Card/Card'

interface Card {
    id: number,
    template: (number | null)[][]
}

interface BoardProps {
    userName: string,
    cards: Array<Card>
}

const Board: React.FC<BoardProps> = ({ userName, cards }) => {
    const [showModal, setShowModal] = useState(false)
    const [dropedNumbers, setDroppedNumbers] = useState<number[]>([])

    useEffect(() => {
        console.log('genereteGameCards useEffect')
        
    }, [])

    const generateStartingNumbers = () => [...Array(90)].map((_, index) => index + 1);
    const [remainingNumbers, setRemainingNumbers] = useState<number[]>(generateStartingNumbers)

    // const generateNumber = useCallback(() => {
    const generateNumber = () => {
        const remainingNumberIndex = Math.floor(Math.random() * remainingNumbers.length)
        setDroppedNumbers(update(dropedNumbers, { $push: [remainingNumbers[remainingNumberIndex]] }))
        setRemainingNumbers(update(remainingNumbers, { $splice: [[remainingNumberIndex, 1]] }));
    }
    // }, [dropedNumbers, remainingNumbers])

    // useEffect(() => {
    //     if (remainingNumbers.length !== 90) {
    //         const interval = setInterval(() => {
    //             generateNumber()
    //         }, 3000);
    //         return () => clearInterval(interval);
    //     }
    // }, [generateNumber, remainingNumbers]);

    const startGame = () => {
        // setRemainingNumbers(update(remainingNumbers, { $push: generateStartingNumbers() }))
        generateNumber()
    }

    const stopGame = () => {
        // // setRemainingNumbers(update(remainingNumbers, { $push: generateStartingNumbers() }))
        // setDroppedNumbers(update(dropedNumbers, { $set: [[]] }))
        // setRemainingNumbers(update(remainingNumbers, { $set: [generateStartingNumbers] }));
    }

    console.log('dropedNumbers ', dropedNumbers)
    console.log('remainingNumbers.length ', remainingNumbers.length)

    const toggleModal = () => {
        setShowModal(opened => !opened)
    }

    return (
        <DropedNumbersContextProvider
            value={[...dropedNumbers]}
        >
            <DroppedNumbers
                dropedNumbersState={[dropedNumbers, setDroppedNumbers]}
                // dropedNumbers={dropedNumbers}
                // setDroppedNumbers={setDroppedNumbers}
                remainingNumbersState={[remainingNumbers, setRemainingNumbers]}
                generateNumber={generateNumber}
            // remainingNumbers={remainingNumbers}
            // setRemainingNumbers={setRemainingNumbers}
            />
            {cards.map((card, i) => (
                <Card key={i} id={card.id} template={card.template} toggleModal={toggleModal} />
            ))}

            <button onClick={startGame}>Start</button>
            <button onClick={stopGame}>Stop / Restart</button>
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

export default Board