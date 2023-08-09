
import { Link } from "react-router-dom"

const HeaderLeft = () => {

    return (
        <div className="header__section header__section--left">
            <Link to="/"><h1 className="header__title">FLASHCARDS</h1></Link>
        </div>
    )
}

export default HeaderLeft;