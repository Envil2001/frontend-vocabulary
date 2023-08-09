import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Avatar, Button, DropDown } from "../../UI";
import { CgProfile } from "react-icons/cg";
import { BiLibrary } from "react-icons/bi";
import { AiOutlineLogout, AiOutlinePlus, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { useOnClickOutside } from "../../hooks/index";
import { ModalContext } from "../../context/modalContext";
// import { toast } from "react-toastify";
import { CreateField } from "../Modal/modalComponents/CreateFields/CreateFields";
import { logout } from "../../features/auth/authSlice";

const buttonStyles = {
    width: "100%",
    boxShadow: "none",
};

const HeaderRight = ({user}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ref = useRef();
    const { handleModal } = useContext(ModalContext);
    const [isDropDown, setIsDropDown] = useState(false);
    const logoutHandler = async () => {
        dispatch(logout())
        navigate('/login')
    };

    useOnClickOutside(ref, () => setIsDropDown(false));

    return (
        <div className="header__section header__section--right">
            {user ? (
                <>
                    <Button Icon={<AiOutlinePlus />} onClick={() => handleModal(<CreateField />)}>Создать</Button>
                    <div ref={ref} onClick={() => setIsDropDown(true)}>
                        <Avatar title={user.fullName} colorAvatar={user.colorAvatar} image={user.avatarPath !== "" && `http://localhost:5000${user.avatarPath}`}/>
                        <DropDown isOpen={isDropDown}>
                            <ul className="dropdownCatalog__menu">
                                <Link to={`/user/${user.id}`}>
                                    <Button stylesElement={buttonStyles} Icon={<CgProfile />}>Мой Профиль</Button>
                                </Link>
                                <Link to={`/setting`}>
                                    <Button stylesElement={buttonStyles} Icon={<AiOutlineSetting />}>Настройки</Button>
                                </Link>
                                <Link to="/library">
                                    <Button stylesElement={buttonStyles} Icon={<BiLibrary />}>Мои Файлы</Button>
                                </Link>
                                <Button stylesElement={buttonStyles} onClick={logoutHandler} Icon={<AiOutlineLogout />}>Выйти</Button>
                            </ul>
                        </DropDown>
                    </div>
                </>
            ) : (
                <Link to="/login">
                    <div className="navigation-user">
                        <AiOutlineUser />
                        <span>Войти</span>
                    </div>
                </Link>
            )}
        </div>
    );
}

export default HeaderRight;
