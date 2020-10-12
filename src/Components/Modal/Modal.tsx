import React from 'react'

interface ModalProps {
    modalData: {
        show: boolean,
        win: boolean
    }
    toggleModal: () => void,
    usedNumbers: number,
    setShowBoard: (v: boolean) => any,
    userName: string
}

const Modal: React.FC<ModalProps> = ({
    toggleModal,
    usedNumbers,
    setShowBoard,
    modalData,
    userName
}) => {
    const showHideClassName = modalData.show ? "modal-block display-block" : "modal-block display-none";

    const onClickHandler = () => {
        toggleModal()
        setShowBoard(false)
    }
    
    const modalTitle = modalData.win ? 'Congratulations' : 'You lost'

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <h1>{`${modalTitle} ${userName}`}</h1>
                <p>#2. row</p>
                <p>{usedNumbers} used numbers</p>
                <button onClick={onClickHandler}>close</button>
            </section>
        </div>
    )
}

export default Modal