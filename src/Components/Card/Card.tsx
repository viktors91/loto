import React, { useState, useContext, useEffect } from 'react'
import CardField from './CardField'
import DropedNumbersContext from '../../Contexts/dropedNumbersContext'
import SettingsContext from '../../Contexts/settingsContext'
import update from 'immutability-helper'

interface ModalData {
    show: boolean,
    win: boolean
}

interface CardProps {
    id: Number,
    template: any[],
    toggleModal: () => void,
    setStopInterval: (v: boolean) => void,
    setModalData: (obj: ModalData) => any
}

const Card: React.FC<CardProps> = ({
    id,
    template,
    toggleModal,
    setStopInterval,
    setModalData
}) => {

    const { droppedNumbers } = useContext(DropedNumbersContext)
    const { allowedMissedClicks } = useContext(SettingsContext)
    const [clickedFields, setClickedFields] = useState<any>([])
    let [missedClicks, setMissedClicks] = useState(0)

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

        if (rowOne === 5 || rowTwo === 5 || rowThree === 5) {
            setStopInterval(true)
            toggleModal()
        }
    }

    useEffect(() => {
        countRowFields()
    }, [clickedFields])


    const onFieldClickHandler = (val: any, rowIndex: Number, cardId: Number) => {

        if (droppedNumbers.includes(val)) {
            const isEmptyClickedFieldsArray = clickedFields.length === 0

            const clickedValues = !isEmptyClickedFieldsArray && clickedFields.map((field: any) => field.value)

            if (isEmptyClickedFieldsArray || !clickedValues.includes(val)) {
                setClickedFields(update(clickedFields, { $push: [{ value: val, row: rowIndex, card: cardId }] }))
            }
        } else {
            missedClicks++
            setMissedClicks(missedClicks)
            if (missedClicks > allowedMissedClicks) {
                setStopInterval(true)
                setModalData({ show: true, win: false })
            }
        }

    }


    // console.log('clickedFields ', clickedFields)
    return (
        <div className="mt-3 mb-3 p-0 col-5 card-border">
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

}

export default Card