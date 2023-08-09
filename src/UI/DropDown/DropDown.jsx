import { useRef } from "react"
import "./DropDown.css"

export const DropDown = ({children, isOpen, classes = ''}) => {
    const nodeRef = useRef(null);
    return (
        <div ref={nodeRef} className={`dropdown__wrapper ${classes} ${isOpen ? "active" : ''}`}>
            {children}
        </div>
    )
}