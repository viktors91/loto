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
        <div className="col card-field" onClick={onClick}>
            {isDropped && (
                <svg className="svg-icon" height="50px" width="50px" viewBox="0 0 20 20">
                    <path fill="#ff0000" d="M17.659,9.597h-1.224c-0.199-3.235-2.797-5.833-6.032-6.033V2.341c0-0.222-0.182-0.403-0.403-0.403S9.597,2.119,9.597,2.341v1.223c-3.235,0.2-5.833,2.798-6.033,6.033H2.341c-0.222,0-0.403,0.182-0.403,0.403s0.182,0.403,0.403,0.403h1.223c0.2,3.235,2.798,5.833,6.033,6.032v1.224c0,0.222,0.182,0.403,0.403,0.403s0.403-0.182,0.403-0.403v-1.224c3.235-0.199,5.833-2.797,6.032-6.032h1.224c0.222,0,0.403-0.182,0.403-0.403S17.881,9.597,17.659,9.597 M14.435,10.403h1.193c-0.198,2.791-2.434,5.026-5.225,5.225v-1.193c0-0.222-0.182-0.403-0.403-0.403s-0.403,0.182-0.403,0.403v1.193c-2.792-0.198-5.027-2.434-5.224-5.225h1.193c0.222,0,0.403-0.182,0.403-0.403S5.787,9.597,5.565,9.597H4.373C4.57,6.805,6.805,4.57,9.597,4.373v1.193c0,0.222,0.182,0.403,0.403,0.403s0.403-0.182,0.403-0.403V4.373c2.791,0.197,5.026,2.433,5.225,5.224h-1.193c-0.222,0-0.403,0.182-0.403,0.403S14.213,10.403,14.435,10.403">
                        {/* <svg height="40px" width="50px" className="completedFields"> */}
                        {/* <rect width="100%" height="100%" fill="#ccc" opacity="0.8" /> */}
                    </path>
                </svg>
            )}
            <span id={value}>{value ? value : ""}</span>
        </div>
    )
}

export default CardField