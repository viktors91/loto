import React, { ReactNode } from 'react'

interface ModalProps {
    toggleModal: () => void,
    show: boolean,
    children: ReactNode
}

const Modal:React.FC<ModalProps> = ({ toggleModal, show, children }) => {
    const showHideClassName = show ? "modal-block display-block" : "modal-block display-none";
    console.log('showHideClassName ', showHideClassName)
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <button onClick={toggleModal}>close</button>
            </section>
        </div>
    )
}

export default Modal