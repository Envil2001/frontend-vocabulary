import { Container } from "../Container/container";
import { useSelector } from "react-redux";
import HeaderCenter from "./headerCenter";
import HeaderRight from "./headerRight";
import HeaderLeft from "./headerLeft";
import "./header.css"


export const Header = () => {
    const { userInfo } = useSelector(state => state.auth);
    return (
        <header className="header">
            <Container classes="header__content">
                <HeaderLeft />
                <HeaderCenter />
                <HeaderRight user={userInfo}/>
            </Container>
        </header>
    )
}

