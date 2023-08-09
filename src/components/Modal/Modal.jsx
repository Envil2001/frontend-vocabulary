import { useContext } from "react"
import ReactDOM from 'react-dom';
import { AiOutlineClose } from "react-icons/ai";
import { ModalContext } from "../../context/modalContext"
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Button } from "../../UI";
import "./Modal.css"

export const Modal = () => {
  const { modalContent, handleModal, modal } = useContext(ModalContext);

  return ReactDOM.createPortal(
    <TransitionGroup>
      {modal && (
        <CSSTransition
          key="modal"
          timeout={200}
          classNames="modal__animation"
        >
          <div className="modal__background">
            <div className="modal__wrapper">
              <Button onClick={() => handleModal()} classes="close" Icon={<AiOutlineClose />} />
              {modalContent}
            </div>
          </div>
        </CSSTransition>
      )}
    </TransitionGroup>,
    document.querySelector("#modal-root")
  );
};
