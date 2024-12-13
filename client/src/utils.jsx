import { CgNotes } from "react-icons/cg";
import { MdManageHistory, MdOutlineQrCodeScanner, MdOutlineSavings } from "react-icons/md";
import { FaRegClock, FaFileShield } from "react-icons/fa6";
import { FaRegHospital, FaTwitter, FaInstagram } from "react-icons/fa";
import { BsGlobe2 } from "react-icons/bs";
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Error from './pages/Error';

const routes = [
    {
        path: '/',
        element: <Home />,
        errorElement: <Error /> 
    }, 
    {
        path: '/sign-in',
        element: <SignIn />,
    },
    {
        path: '/sign-up',
        element: <SignUp />,
    }
];

const navLinks = [
    {
        name: 'Home',
        href: '/'
    }, 
    {
        name: 'Features',
        href: '/features'
    },
    {
        name: 'Demo',
        href: '/demo'
    },
    {
        name: 'About', 
        href: '/about'
    },
    {
        name: 'FAQs',
        href: '/faqs'
    }
];

const features = [
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

const stats = [
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

const articles = [
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


const faqs = [
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

const smLinks = [
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

const footerLinks = [
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

export{ routes, navLinks, features, stats, articles, faqs, smLinks, footerLinks };