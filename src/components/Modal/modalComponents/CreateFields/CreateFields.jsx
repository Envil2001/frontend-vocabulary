import React, { useContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
import { ModalContext } from "../../../../context/modalContext";
import { Form } from "../../../Form/Form";
import { Button, Input } from "../../../../UI";

import { useInputChange } from "../../../../hooks/useInputChange";
import { useDispatch } from "react-redux";
import { createField, updateField } from "../../../../features/fields/fieldsApiSlice";
const initialValues = {
    title: "",
};

export const CreateField = ({ folderId = 0, data }) => {
    const isEditing = !!folderId;
    const initialValues = data || { title: "" }; // Use the provided data as initialValues or set an empty object as the default
    const { formData, setFormData, handleInputChange } = useInputChange(initialValues);
    const { handleModal } = useContext(ModalContext);
    const dispatch = useDispatch();

    useEffect(() => {
        // If folderId is provided, it means we are editing an existing field.
        // So, populate the form with the existing data.
        if (isEditing && data) {
            setFormData({
                title: data
            });
        }
    }, [data, isEditing]);

    const handleSubmit = async () => {
        try {
            if (isEditing) {
                // If folderId is provided, update the field
                dispatch(updateField({ folderId, formData }));
            } else {
                // Otherwise, create a new field
                dispatch(createField(formData));
            }
            handleModal();
        } catch (err) {
            console.log(err);
        }
    };

    const isDisabled = !formData.title;

    return (
        <Form title="Придумайте название файла..." onSubmit={handleSubmit} styleElement={{ padding: "0px" }}>
            <Input
                type="text"
                placeholder="Название"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
            />
            <Button
                type="submit"
                stylesElement={{
                    width: "100%",
                    background: "#4683d9",
                    color: "#fff",
                    marginTop: "1rem",
                }}
                isDisabled={isDisabled}
            >
                {isEditing ? "Edit" : "Create"}
            </Button>
        </Form>
    );
};