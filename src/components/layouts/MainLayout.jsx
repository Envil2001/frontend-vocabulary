import React from "react"
import { Header } from "../index"
import "./MainLayout.css"

export const MainLayout = ({ children, hideHeader }) => {

    return (
        <React.Fragment>
            {!hideHeader && <Header />}
            <div className="main-content">
                {children}
            </div>
        </React.Fragment>
    )
}
