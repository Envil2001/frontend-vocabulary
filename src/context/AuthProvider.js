// import React, { useState } from 'react';
// import { refreshToken } from '../features/auth/authSlice';
// import { useDispatch } from 'react-redux';

// Создаем контекст
// const AuthContext = React.createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//     const dispatch = useDispatch();
//   // Функция для обновления токена
//   const refreshAccessToken = async () => {
//     try {
//       const response = await dispatch(refreshToken()); // Используем вашу функцию для обновления токена
//       console.log("response: ", response)
//       localStorage.setItem('token', response.accessToken);
//     } catch (error) {
//       console.log('НЕ АВТОРИЗОВАН');
//     }
//   };

//   // Перехватываем 401 ошибку и обновляем токен перед повторной попыткой запроса
//   axios.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       if (error.response.status === 401 && !error.config._isRetry) {
//         error.config._isRetry = true;
//         await refreshAccessToken(); // Вызываем функцию для обновления токена
//         return axios(error.config); // Повторяем исходный запрос с обновленным токеном
//       }

//       throw error;
//     }
//   );

//   // Возвращаем провайдер с контекстом
//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthProvider, AuthContext };

import { useDispatch } from 'react-redux';
import axios from '../app/axios'; // Путь к вашему файлу axios.js
import { createContext, useMemo, useState } from "react";
import { refreshToken } from '../features/auth/authSlice';
import createAxiosInstance from '../app/axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const axiosInstance = useMemo(() => createAxiosInstance(dispatch), [dispatch]);
  
    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;