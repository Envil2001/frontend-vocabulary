
import "./Title.css"
import { TitleSkeleton } from "./TitleSkeleton"

export const Title = ({ title, styleElement, className, loading = false }) => {
    return (
        <>
            {
                loading ?
                    <TitleSkeleton />
                    :
                    <h1 className={`title${className ? ` ${className}` : ''}`} style={styleElement}>{title}</h1>
            }
        </>
    )
}
