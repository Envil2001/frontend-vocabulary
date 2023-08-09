import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Input } from "../../../../UI";
import { toast } from "react-toastify";
import { ModalContext } from "../../../../context/modalContext";
import { Form } from "../../../Form/Form";
import { useInputChange } from "../../../../hooks/useInputChange";
import axios from "../../../../app/axios"
import { userUpdate } from "../../../../features/auth/authSlice";
const initialValues = {
    fullName: "",
    email: "",
    aboutInfo: "",
    avatarPath: ""
};

export const EditProfile = ({ userInfo }) => {
    const dispatch = useDispatch();
    const { formData, setFormData, handleInputChange } = useInputChange(initialValues);
    const { handleModal } = useContext(ModalContext);
    const { fullName, email, aboutInfo } = formData;

    useEffect(() => {
        if (userInfo) {
            setFormData({
                fullName: userInfo.fullName || "",
                email: userInfo.email || "",
                aboutInfo: userInfo.aboutInfo || "",
            });
        } else {
            setFormData(initialValues); // Установите начальные значения по умолчанию, если userInfo равно undefined
        }
    }, [userInfo, setFormData]);

    const handleChangeFile = async (e) => {
        try {
            const formDataAvatar = new FormData();
            const file = e.target.files[0]
            formDataAvatar.append('image', file)
            const { data } = await axios.post('/users/upload', formDataAvatar);
            setFormData({ ...formData, avatarPath: data.url });
        } catch (err) {
            console.log(err)
            alert('Ошибка при загрузке файла!')
        }
    }
    const handleSubmit = async (e) => {
        try {
            await dispatch(userUpdate({
                id: userInfo.id,
                params: formData
            }));
            handleModal();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };



    return (
        <Form title="Редактируйте профиль" onSubmit={handleSubmit} styleElement={{ padding: "0px" }}>
            <Input
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={fullName}
                onChange={handleInputChange}
            />
            <Input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleInputChange}
            />
            <Input
                type="text"
                placeholder="About Info"
                name="aboutInfo"
                value={aboutInfo}
                onChange={handleInputChange}
            />
            <input type="file" onChange={handleChangeFile} />


            <Button type="submit" stylesElement={{ width: "100%", background: "#4683d9", color: "#fff", marginTop: "1rem" }}>
                Редактировать
            </Button>
        </Form>
    );
};
