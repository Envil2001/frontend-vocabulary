import { Container, Form, MainLayout } from "../../../components"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Button, Input } from "../../../UI";
import { toast } from 'react-toastify'
import { useInputChange } from "../../../hooks/useInputChange";
import { useEffect, useState } from "react";
import { selectIsAuth, userRegistration } from "../../../features/auth/authSlice";

const initialValues = {
    fullName: "",
    email: "",
    password: "",
}

export const Registration = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth)
    const { formData, handleInputChange } = useInputChange(initialValues);
    const { fullName, email, password } = formData
    const { error } = useSelector(state => state.auth)
    const handleSubmit = () => {
        dispatch(userRegistration(formData));
        navigate('/activation');
    }
    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate]);

    return (
        <MainLayout hideHeader>
            <Container>
                <Button Icon={<AiOutlineArrowLeft />} onClick={() => navigate("/")}>Назад</Button>
                <div className="centering">
                    <Form title="Регистрация" onSubmit={handleSubmit} styleElement={{ width: "300px" }}>
                        <Input
                            type="text"
                            placeholder="Имя"
                            name="fullName"
                            value={fullName}
                            onChange={handleInputChange}
                            error={error}
                        />
                        <Input
                            type="email"
                            placeholder="Почта"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            error={error}
                        />
                        <Input
                            type="password"
                            placeholder="Пароль"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            error={error}
                        />
                        <Button type="submit" stylesElement={{ width: "100%", background: "#4683d9", color: "#fff" }}>Регистрация</Button>
                        <div className="auth-form__hint">
                            <span className="auth-form__hint-text">Есть аккаунт? <Link to="/login">Войти</Link> </span>
                        </div>
                    </Form>
                </div>
            </Container>
        </MainLayout>
    )
}