import { BsGlobe2 } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { FaRegClock, FaFileShield } from "react-icons/fa6";
import { FaRegHospital, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdManageHistory, MdOutlineQrCodeScanner, MdOutlineSavings } from "react-icons/md";
import Home from './pages/Home';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import AllRecords from './pages/AllRecords';
import AllPackages from "./pages/AllPackages";
import Error from './pages/Error';

export const routes = [
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
];

export const navLinks = [
    {
        name: 'Home',
        href: '/#hero'
    }, 
    {
        name: 'Features',
        href: '/#features'
    },
    {
        name: 'Explainer',
        href: '/#explainer'
    },
    {
        name: 'About', 
        href: '/#about'
    },
    {
        name: 'FAQs',
        href: '/#faqs'
    }
];

export const settingsOptions = [
    {
        description: "Remove all records.",
        btnText: "Clear"
    },
    {
        description: "Remove all sent packages.",
        btnText: "Clear"
    },
    {
        description: "Delete account and related data.",
        btnText: "Delete"
    }
];

export const features = [
    {
        text: 'Secure Storage of Records',
        icon: <FaFileShield />
    }, 
    {
        text: 'NLP-based Summarization',
        icon: <CgNotes />
    },
    {
        text: 'Effective Management of Records',
        icon: <MdManageHistory />
    },
    {
        text: 'Instant Sharing using QRCode',
        icon: <MdOutlineQrCodeScanner />
    }
];

export const stats = [
    {
        icon: <FaRegClock />,
        stat: '10 mins',
        description: 'saved per patient by using digital health records for data retrieval.'
    },
    {
        icon: <FaRegHospital />,
        stat: '5 million',
        description: 'fewer medication errors annually in hospitals using electronic health records.'
    },
    {
        icon: <MdOutlineSavings />,
        stat: '22 billion',
        description: 'saved annually in administrative costs with digital health record adoption.'
    }
];

export const articles = [
    {
        date: '2024-12-01',
        title: 'The Rise of Digital Health Records: Transforming Patient Care Globally',
        description: 'Explore how digitized health records are revolutionizing healthcare, improving accessibility, and enhancing patient outcomes.',
        link: 'https://www.healthcareitnews.com/news/rise-digital-health-records'
    }, 
    {
        date: '2024-11-15',
        title: 'Why Secure Storage is Critical in Digital Health Record Management',
        description: 'This article highlights the importance of encryption and access controls in protecting sensitive medical data.',
        link: 'https://www.himss.org/resources/secure-storage-digital-health-records'
    },
    {
        date: '2024-10-20',
        title: 'The Role of AI in Digitizing and Summarizing Medical Records',
        description: 'Learn how AI technologies like NLP are streamlining the process of summarizing patient health data.',
        link: 'https://www.forbes.com/ai-digitizing-medical-records'
    }
];


export const faqs = [
    {
        qn: 'What is HealthVault?',
        ans: 'HealthVault is a secure web application that allows you to store and share your medical records with healthcare providers. It uses NLP to summarize important information, making communication between you and your doctor easier.'
    }, 
    {
        qn: 'How do I share my health records with a doctor using HealthVault?',
        ans: 'You can easily generate a secure QR code in the app to share your medical records with authorized healthcare providers.'
    }, 
    {
        qn: 'Is my health data secure in HealthVault?',
        ans: 'Absolutely! HealthVault uses encryption and role-based access control to ensure that only authorized personnel can access your sensitive data.'
    }, 
    {
        qn: 'Can I update my health records in HealthVault?',
        ans: 'Yes, you can update and manage your health records anytime through the easy-to-use dashboard.'
    }, 
    {
        qn: 'Do I need to create an account to use HealthVault?',
        ans: 'Yes, creating an account is required to upload, manage, and securely share your medical records within the app.'
    }
];

export const smLinks = [
    {
        icon: <FaTwitter />,
        href: ''
    },
    {
        icon: <BsGlobe2 />,
        href: ''
    },
    {
        icon: <FaInstagram />,
        href: ''
    }
]

export const footerLinks = [
    [
        {
            name: 'Home',
            href: '/home'
        },
        {
            name: 'Profile',
            href: '/profile/:id'
        },
        {
            name: 'Sign Up',
            href: ''
        }, 
        {
            name: 'Send Records',
            href: ''
        }
    ], 
    [
        {
            name: 'Privacy Policy',
            href: ''
        },
        {
            name: 'Terms & Conditions',
            href: ''
        },
        {
            name: 'Contact Us',
            href: ''
        }
    ]
];

export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');       
    return `${year}-${month}-${day}`;
};