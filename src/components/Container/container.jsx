import React from "react"
// import { Header } from "../components/Header"
import "./container.css"


export const Container = ({ children, classes  }) => {

    return (
        <div className={`container${classes ? ` ${classes}` : ''}`}>
            {children}
        </div>
    )
}
