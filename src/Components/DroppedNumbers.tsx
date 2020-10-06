import React, { useCallback, useEffect } from 'react'

interface DroppedNumbersProps {
    dropedNumbersState: [number[], React.Dispatch<React.SetStateAction<number[]>>],
    remainingNumbersState: [number[], React.Dispatch<React.SetStateAction<number[]>>],
    generateNumber: () => void
    // dropedNumbers: Array<number>,
    // setDroppedNumbers: () => void,
    // remainingNumbers: Array<number>
}

const DroppedNumbers: React.FC<DroppedNumbersProps> = ({
    dropedNumbersState: [dropedNumbers, setDroppedNumbers],
    remainingNumbersState: [remainingNumbers, setRemainingNumbers],
    generateNumber
}) => {

    // const generateNumber = useCallback(() => {
    //     const remainingNumberIndex = Math.floor(Math.random() * remainingNumbers.length)
    //     setDroppedNumbers(update(dropedNumbers, { $push: [remainingNumbers[remainingNumberIndex]] }))
    //     setRemainingNumbers(update(remainingNumbers, { $splice: [[remainingNumberIndex, 1]] }));
    // }, [dropedNumbers, setDroppedNumbers, remainingNumbers, setRemainingNumbers])

    useEffect(() => {
        if (remainingNumbers.length !== 90) {
            const interval = setInterval(() => {
                generateNumber()
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [generateNumber, remainingNumbers]);

    const lastFiveNumbersArr = dropedNumbers && dropedNumbers.length ? dropedNumbers.slice(Math.max(dropedNumbers.length - 5, 0)).reverse() : []

    return (
        <div className='m-3'>
            {lastFiveNumbersArr.length > 0 && lastFiveNumbersArr.map((number, index) => (
                <span className='mr-2' key={index}>{number}</span>
            ))}
        </div>
    )
}

export default DroppedNumbers