import React from 'react'


interface CardFieldProps {
    value?: Number | any,
    clickedFields: [
        {
            value: Number;
            isDropped: boolean
        }
    ],
    onClick?: () => any,
    // rowIndex: Number
    // onClickHandler?: (React.MouseEvent<HTMLButtonElement>) => any
}

const CardField: React.FC<CardFieldProps> = ({
    value,
    clickedFields,
    onClick
}) => {
    
    const isDropped = clickedFields.find(field => field.value === value)

    return (
        <div className="col cardField" onClick={onClick}>
            {isDropped && (
                <svg height="40px" width="50px" className="completedFields">
                    <rect width="100%" height="100%" fill="#ccc" opacity="0.8" />
                </svg>
            )}
            <span id={value}>{value}</span>
        </div>
    )
}

export default CardField