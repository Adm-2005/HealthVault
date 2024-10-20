import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';
import { FaFileUpload, FaShareAltSquare } from 'react-icons/fa';
import { IoCreateSharp } from 'react-icons/io5';

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

const navLinks = [
    {
        text: 'Home',
        href: '/'
    },
    {
        text: 'Steps',
        href: '/#steps'
    },
    {
        text: 'About',
        href: '/#about'
    },
    {
        text: 'Contact',
        href: '/#contact'
    }
];

const footerLinks = [
    {
        section: 'Sections',
        links: [
            {
                name: 'Home',
                href: '/'
            },
            {
                name: 'Steps',
                href: '/#steps'
            },
            {
                name: 'About',
                href: '/#about'
            },
            {
                name: 'Contact',
                href: '/#contact'
            }
        ]
    }, 
    {
        section: 'Pages',
        links: [
            {
                name: 'Sign In',
                href: '/sign-in'
            }, 
            {
                name: 'Sign Up',
                href: '/sign-up'
            },
            {
                name: 'Home',
                href: '/'
            }
        ]
    },
    {
        section: 'Project',
        links: [
            {
                name: 'GitHub',
                href: 'https://github.com/Adm-2005/HealthVault'
            }
        ]
    }
];

const overviewSteps = [
    {
        icon: <FaFileUpload />,
        content: 'Upload your Records'
    },
    {
        icon: <IoCreateSharp />,
        content: 'Create an Access Package'
    },
    {
        icon: <FaShareAltSquare />,
        content: 'Share QR Code'
    }
];

export{ routes, navLinks, footerLinks, overviewSteps };