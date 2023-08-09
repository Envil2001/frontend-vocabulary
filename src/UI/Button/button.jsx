
import "./button.css"

export const Button = ({ isDisabled = false, children, Icon, onClick, stylesElement, type = "button", classes = "", loading = false}) => {

    return (
        <button
            type={type}
            style={stylesElement}
            className={`button ${classes && classes}`}
            onClick={onClick}
            disabled={isDisabled}
        >
            {Icon && <div className="button__icon">{Icon}</div>}
            {children && <span>{loading ? 'Loading..' : children}</span>}
        </button>
    )
}