import { Route, Routes } from 'react-router-dom'
import navigationData from "./data/navigation"
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './features/auth/authSlice';
import $api, { API_URL } from './app/axios';
import { logout } from './features/auth/authSlice';
import { store } from "./app/store"
import axios from "axios"


function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(setUser(user));
  }, []);


  return (
    <Routes>
      {navigationData.map((item, index) => (
        <Route key={index} path={item.link} element={item.element} />
      ))}
    </Routes>
  );
}
const { dispatch } = store;
$api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status == 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true })
      localStorage.setItem('token', response.data.accessToken);
      return $api.request(originalRequest);
    } catch (e) {
      dispatch(logout())
    }
  }
  throw error;
})


export default App;
