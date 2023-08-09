// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// // import { fetchActivation } from "../../redux/slices/auth";
import { Container, Form, MainLayout } from "../index"
// import "./ActivateCode.css"
// import { Button, Input } from "../../UI";
// import { checkActivationCode } from "../../features/auth/authSlice";

// let currentOTPIndex = 0;
export const Activation = () => {
    // const { userInfo, activationCodeValid } = useSelector(state => state.auth);
    // const [otp, setOtp] = useState(new Array(4).fill(""));
    // const [activeOTPIndex, setActiveOTPIndex] = useState(0);
    // const dispatch = useDispatch();
    // const inputRef = useRef(null);
    // const navigate = useNavigate();
    // const handleOnChange = (e) => {
    //     const { value } = e.target;
    //     const newOTP = [...otp];
    //     newOTP[currentOTPIndex] = value.substring(value.length - 1);
    //     if (!value) setActiveOTPIndex(currentOTPIndex - 1)
    //     else setActiveOTPIndex(currentOTPIndex + 1)
    //     setOtp(newOTP);
    // }
    // const handleOnKeyDown = (e, index) => {
    //     const { key } = e;
    //     currentOTPIndex = index
    //     if (key === 'Backspace') {
    //         setActiveOTPIndex(currentOTPIndex - 1)
    //     }
    // }
    // const onSubmit = async (e) => {
    //     e.preventDefault();
    //     const activationCode = activationCodeValid.otp.join('');
        
    //     // dispatch(checkActivationCode({activationCode, userId: userInfo.id}));

    // }
    // useEffect(() => {
    //     inputRef.current?.focus();
    // }, [activeOTPIndex])


    return (
        <MainLayout hideHeader>
            <Container>
                {/* <Form title="Введите верификационный код" onSubmit={e => onSubmit(e)} className="activation__form" styleElement={{maxWidth: "300px", margin: "0 auto"}}> */}
                <Form title="Введите верификационный код" className="activation__form" styleElement={{maxWidth: "300px", margin: "0 auto"}}>
                    {/* <div className="activation__inputs">
                        {otp.map((_, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Input
                                        ref={index === activeOTPIndex ? inputRef : null}
                                        type="number"
                                        onChange={handleOnChange}
                                        value={otp[index]}
                                        onKeyDown={(e) => handleOnKeyDown(e, index)}
                                    />
                                </React.Fragment>
                            );
                        })}
                    </div>
                    {otp.join("").length === 4 && <Button type="submit" stylesElement={{ width: "100%", background: "#4683d9", color: "#fff" }}>Отправить</Button>} */}

                </Form>
            </Container>
        </MainLayout>
    )
}