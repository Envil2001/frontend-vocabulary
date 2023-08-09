import { Button, Input } from "../../../UI";
import { Container, Form, MainLayout } from "../../../components"
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
import { useInputChange } from "../../../hooks/useInputChange";
import { useEffect } from "react";
import { selectIsAuth, userLogin } from "../../../features/auth/authSlice";
import "../auth.css"

const initialValues = {
    email: "",
    password: "",
}

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth)
    const { formData, handleInputChange } = useInputChange(initialValues);
    const { email, password } = formData
    const { error } = useSelector(state => state.auth)
    const handleSubmit = () => {
        dispatch(userLogin(formData))
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
                    <Form title="Авторизоваться" onSubmit={handleSubmit} styleElement={{ width: "300px" }}>
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

                        <Button type="submit" stylesElement={{ width: "100%", background: "#4683d9", color: "#fff" }}>Войти</Button>
                        <div className="auth-form__hint">
                            <Link to="/registration"><span className="auth-form__hint-text">Регистрация</span></Link>
                        </div>
                    </Form>
                </div>
            </Container>
        </MainLayout>
    )
}