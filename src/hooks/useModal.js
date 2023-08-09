import { useState } from 'react'

export default () => {
    const [modal, setModal] = useState(false);
    const [modalContent, setModalContent] = useState("I'm the Modal Content");

    const handleModal = (content = false) => {
        setModal(!modal);
        // document.querySelector("#root").classList.remove("blur")
        if (content) {
            // document.querySelector("#root").classList.add("blur")
            setModalContent(content);
        }
    }

    return { modal, handleModal, modalContent }
}