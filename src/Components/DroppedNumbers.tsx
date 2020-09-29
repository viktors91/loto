import React from 'react'

interface DroppedNumbersProps {
    numbers: Array<Number>
}

const DroppedNumbers:React.FC<DroppedNumbersProps> = ({
    numbers
}) => {
    
    const lastFiveNumbersArr = numbers && numbers.length ? numbers.slice(Math.max(numbers.length - 5, 0)).reverse() : []

    return (
        <div className='m-3'>
            {lastFiveNumbersArr.length > 0 && lastFiveNumbersArr.map((number, index) => (
                <span className='mr-2' key={index}>{number}</span>
            ))}
        </div>
    ) 
}

export default DroppedNumbers