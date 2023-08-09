import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, MainLayout, Slider, Title, WordsList } from "../../components";
import { checkOwnership } from "../../helpers/checkOwnership/checkOwnership";
import { useInputChange } from "../../hooks/useInputChange";
import { createWord, fetchFieldbyId, updateWord } from "../../features/fields/fieldsApiSlice";
import { WordForm } from "./WordForm";
import { UserProfileLink } from "./UserProfileLink";
import "./FolderPage.css";

const initialValues = {
    title: "",
    translate: "",
    description: "",
};

export const FolderPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { formData, setFormData, handleInputChange } = useInputChange(initialValues);
    const [isEdit, setIsEdit] = useState(0);
    const { title, translate, description } = formData;
    const isFilledFields = title && translate;

    const user = useSelector((state) => state.auth.userInfo);
    const { field, loading } = useSelector((state) => state.fields);
    useEffect(() => {
        dispatch(fetchFieldbyId(id));
    }, [dispatch, id]);

    const isOwner = checkOwnership(user?.id, field?.user?._id);

    const [currentEditingWord, setCurrentEditingWord] = useState(null); // Добавляем состояние для текущего редактируемого слова

    const handleEdit = (_id) => {
        const editingWord = field.words.find((word) => word._id === _id);
        setFormData(editingWord);
        setIsEdit(1);
        setCurrentEditingWord(editingWord); // Устанавливаем текущее редактируемое слово
    };

    const handleSubmit = () => {
        if (isEdit === 0) {
            dispatch(createWord({ id, formData }));
        } else {
            dispatch(updateWord({ fieldId: id, wordId: currentEditingWord._id, formData }));
        }
        setFormData(initialValues);
        setCurrentEditingWord(null); // Сбрасываем текущее редактируемое слово
        setIsEdit(0)
    };
    const handleClearForm = () => {
        setFormData(initialValues); // Устанавливаем состояние формы в исходные значения
        setIsEdit(0)
    };

    return (
        <MainLayout>
            <Container>
                <div className="folder-page">
                    <div className="folder-page__left">
                        <Title loading={loading} title={field?.title} />
                        {field?.words?.length > 0 && <Slider words={field?.words} />}
                        <div className="folder-page__words-list">
                            <WordsList loading={loading} data={field} account={user} handleEdit={handleEdit} />
                        </div>
                    </div>
                    <div className="folder-page__right">
                        {isOwner && !loading ? (
                            <WordForm
                                title={title}
                                translate={translate}
                                description={description}
                                handleInputChange={handleInputChange}
                                handleSubmit={handleSubmit}
                                handleClearForm={handleClearForm} // Передаем функцию для сброса формы
                                isFilledFields={isFilledFields}
                                isEdit={isEdit}
                            />
                        ) : (
                            <UserProfileLink user={field?.user} />
                        )}
                    </div>
                </div>
            </Container>
        </MainLayout>
    );
};
