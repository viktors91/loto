import React, { useEffect, useContext } from 'react'
import SettingsContext from '../Contexts/settingsContext'

interface DroppedNumbersProps {
    dropedNumbersState: [number[], React.Dispatch<React.SetStateAction<number[]>>],
    remainingNumbersState: [number[], React.Dispatch<React.SetStateAction<number[]>>],
    generateNumber: () => void,
    stopInterval: boolean
}

const DroppedNumbers: React.FC<DroppedNumbersProps> = ({
    dropedNumbersState: [dropedNumbers, setDroppedNumbers],
    remainingNumbersState: [remainingNumbers, setRemainingNumbers],
    generateNumber,
    stopInterval
}) => {
    const {timer } = useContext(SettingsContext)

    useEffect(() => {
        if (!stopInterval && remainingNumbers.length !== 90) {
            const interval = setInterval(() => {
                generateNumber()
            }, timer);
            return () => clearInterval(interval);
        }
    }, [generateNumber, remainingNumbers, stopInterval, timer]);

    const lastFiveNumbersArr = dropedNumbers && dropedNumbers.length ? dropedNumbers.slice(Math.max(dropedNumbers.length - 5, 0)).reverse() : []

    return (
        <div className='dropped-numbers mb-3'>
            {lastFiveNumbersArr.length > 0 && lastFiveNumbersArr.map((number, index) => (
                // <span className={`number ${index === 0 ? 'w3-animate-top' : 'w3-animate-left'}`} key={index}>{number}</span>
                <span className='number' key={index}>{number}</span>
            ))}
        </div>
    )
}

export default DroppedNumbers