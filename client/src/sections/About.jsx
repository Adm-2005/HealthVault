import about1 from '../assets/images/about1.webp';
import about2 from '../assets/images/about2.webp';

export default function About() {
    return (
        <section id='about' className='bg-cyan-50 p-9 flex flex-col items-center gap-8'>
            <h1 className='text-2xl lg:text-3xl text-center font-roboto font-bold text-cyan-700'>What is HealthVault?</h1>
            <div className='flex flex-col items-center gap-4'>
                <h1 className='text-black text-center text-xl lg:text-2xl font-roboto font-bold'>
                    The Challenge: Disorganized and Inaccessible Medical Records
                </h1>
                <div className='flex flex-col-reverse lg:flex-row lg:w-1/2 justify-center items-center gap-4'>
                    <p className='text-justify text-wrap text-gray-700'>
                    Managing your health records can be a real hassle. Medical documents are often scattered across multiple locations, making it difficult to access vital information when you need it the most. This disorganization can lead to delayed treatments, miscommunication between doctors, and even lost records.
                    </p>
                    <img src={about1} className='w-full h-[300px] rounded-full'></img>
                </div>
            </div>

            <div className='flex flex-col items-center gap-4'>
                <h1 className='text-black text-center text-xl lg:text-2xl font-roboto font-bold'>
                    Our Solution: Centralized, Secure, and Easy Access
                </h1>
                
                <div className='flex flex-col lg:flex-row w-full lg:w-1/2 justify-center items-center gap-4'>
                    <img src={about2} className='w-full h-[300px] rounded-full'></img>
                    <p className='text-justify text-gray-700'>
                    HealthVault offers a seamless way to keep all your health records in one secure digital location. With an intuitive interface, you can upload, organize, and access your medical history at any time. Plus, you have complete control over who can view or share your records, making it easy to collaborate with healthcare providers without compromising your privacy.
                    </p>
                </div>
            </div>
        </section>
    )
}