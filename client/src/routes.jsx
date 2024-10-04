import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';

const routes = [
    {
        path: '/',
        element: <LandingPage />,
        errorElement: <ErrorPage /> 
    }, 
    {
        path: '/sign-in',
        element: <SignIn />,
    },
    {
        path: '/sign-up',
        element: <SignUp />,
    },
    {
        path: '/user/:id',
        element: <Dashboard />,
    }
];

export{routes};