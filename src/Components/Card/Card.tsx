import React, { useState, useContext, useEffect } from 'react'
import CardField from './CardField'
import dropedNumbersContext from './../../dropedNumbersContext'
import update from 'immutability-helper'

interface CardProps {
    id: Number,
    template: any[],
    toggleModal: () => void
}

const Card: React.FC<CardProps> = ({ id, template, toggleModal }) => {
    const droppedNums = useContext(dropedNumbersContext)
    const [clickedFields, setClickedFields] = useState<any>([])
    let rowOne = 0
    let rowTwo = 0
    let rowThree = 0

    const countRowFields = () => {
        clickedFields.forEach((element: any) => {
            if (element.card === id) {
                if (element.row === 0) rowOne++
                if (element.row === 1) rowTwo++
                if (element.row === 2) rowThree++
            }
        });

        if(rowOne === 5 || rowTwo === 5 || rowThree === 5) {
            toggleModal()
        }
    }

    useEffect(() => {
        countRowFields()
        console.log('rowOne ', rowOne)
        console.log('rowTwo ', rowTwo)
        console.log('rowThree ', rowThree)
    }, [clickedFields])

    const onFieldClickHandler = (val: any, rowIndex: Number, cardId: Number) => {

        if (droppedNums.includes(val)) {
            const isEmptyClickedFieldsArray = clickedFields.length === 0

            const clickedValues = !isEmptyClickedFieldsArray && clickedFields.map((field: any) => field.value)

            if (isEmptyClickedFieldsArray || !clickedValues.includes(val)) {
                setClickedFields(update(clickedFields, { $push: [{ value: val, row: rowIndex, card: cardId }] }))
            }
        }
    }


    console.log('clickedFields ', clickedFields)
    return (
        <div className="col-4 mb-3">
            {template.map((fields, rowIndex) => {
                return (
                    <div className="d-flex" key={rowIndex}>
                        {fields.map((field: any, i: number) => (
                            <CardField
                                key={i}
                                value={field}
                                clickedFields={clickedFields}
                                onClick={() => onFieldClickHandler(field, rowIndex, id)}
                            // rowIndex={index}
                            />
                        ))}
                    </div>
                )
            })}
        </div>
    )

    // return (
    //     <div className="col-4 ">
    //         <div className=" d-flex">
    //             <CardField value={2} clickedField={clickedField} onClickHandler={() => onClickHandler(2)}/>
    //             <CardField />
    //             <CardField />
    //             <CardField value={32} clickedField={clickedField} onClickHandler={() => onClickHandler(32)}/>
    //             <CardField />
    //             <CardField value={57} clickedField={clickedField} onClickHandler={() => onClickHandler(57)}/>
    //             <CardField />
    //             <CardField value={73} clickedField={clickedField} onClickHandler={() => onClickHandler(73)}/>
    //             <CardField value={88} clickedField={clickedField} onClickHandler={() => onClickHandler(88)}/>
    //         </div>
    //         <div className=" d-flex">
    //             <CardField value={4} clickedField={clickedField} onClickHandler={() => onClickHandler(4)}/>
    //             <CardField value={17} clickedField={clickedField} onClickHandler={() => onClickHandler(17)}/>
    //             <CardField value={29} clickedField={clickedField} onClickHandler={() => onClickHandler(29)}/>
    //             <CardField />
    //             <CardField />
    //             <CardField />
    //             <CardField value={61} clickedField={clickedField} onClickHandler={() => onClickHandler(61)}/>
    //             <CardField />
    //             <CardField />
    //         </div>
    //         <div className=" d-flex">
    //             <CardField />
    //             <CardField value={18} clickedField={clickedField} onClickHandler={() => onClickHandler(18)}/>
    //             <CardField value={27} clickedField={clickedField} onClickHandler={() => onClickHandler(27)}/>
    //             <CardField value={31} clickedField={clickedField} onClickHandler={() => onClickHandler(31)}/>
    //             <CardField value={49} clickedField={clickedField} onClickHandler={() => onClickHandler(49)}/>
    //             <CardField />
    //             <CardField />
    //             <CardField value={75} clickedField={clickedField} onClickHandler={() => onClickHandler(75)}/>
    //             <CardField />
    //         </div>
    //     </div>
    // )
}

export default Card