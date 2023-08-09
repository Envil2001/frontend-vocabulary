import { Button, Input } from "../../UI";
import { Form } from "../../components";

// Вспомогательный компонент для формы добавления слова
export const WordForm = ({
    title,
    translate,
    description,
    handleInputChange,
    handleSubmit,
    handleClearForm, // Добавляем новую функцию для сброса формы
    isFilledFields,
    isEdit,
}) => {
    const buttonStyles = {
        width: "100%",
        background: "#4683d9",
        color: "#fff",
    };

    return (
        <Form onSubmit={handleSubmit} title={isEdit === 0 ? "Добавить слово" : "Edit a word"} styleElement={{position: "sticky", top: "80px"}}>
            <Input
                type="text"
                placeholder="Слово"
                name="title"
                value={title}
                onChange={handleInputChange}
            />
            <Input
                type="text"
                placeholder="Перевод"
                name="translate"
                value={translate}
                onChange={handleInputChange}
            />
            <Input
                type="text"
                placeholder="Описание"
                name="description"
                value={description}
                onChange={handleInputChange}
            />
            <Button type="submit" stylesElement={buttonStyles} isDisabled={!isFilledFields}>
                {isEdit === 0 ? "Создать слово" : "Редактировать слово"}
            </Button>
            <Button onClick={handleClearForm} stylesElement={{ ...buttonStyles, marginTop: "1rem" }} isDisabled={!isFilledFields}>
                Очистить
            </Button>
        </Form>
    );
};