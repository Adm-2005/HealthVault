import { createBrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Profile from '../pages/Profile';
import AllRecords from '../pages/AllRecords';
import AllPackages from '../pages/AllPackages';
import Error from '../pages/Error';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <Error /> 
    }, 
    {
        path: '/auth',
        element: <Auth />,
    },
    {
        path: '/profile/:id',
        element: <Profile />
    },
    {
        path: '/records/:id',
        element: <AllRecords />
    },
    {
        path: '/packages/:id',
        element: <AllPackages />
    }
]);

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-CSRF-TOKEN'
});