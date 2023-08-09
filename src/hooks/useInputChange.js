import { useCallback, useState } from "react"


export const useInputChange = (initialValues) => {
    const [formData, setFormData] = useState(initialValues);

    const handleInputChange = useCallback(event => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    });
    return { formData, setFormData, handleInputChange }


}