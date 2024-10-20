import { IconContext } from 'react-icons';
import { FaLongArrowAltRight, FaLongArrowAltDown } from "react-icons/fa";
import { overviewSteps } from '../utils';

export default function Overview() {
    return (
        <section id='overview' className='p-9 flex flex-col gap-8'>
            <h1 className='text-center text-2xl lg:text-3xl font-roboto font-bold text-cyan-700'>Steps to Use HealthVault</h1>

            <div className='flex flex-1 flex-col items-center lg:flex-row lg:justify-center'>
            {overviewSteps.map((step, index) => (
                <div key={index} className={(index < 2) ? 'grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 gap-2' : ''}>
                    <div className='flex flex-col items-center gap-2'>
                        <IconContext.Provider value={{ size: '80px', className:'text-cyan-700'}}>
                            {step.icon}
                        </IconContext.Provider>

                        <p className='text-xl text-gray-700 text-center font-roboto'>
                            {step.content}
                        </p>
                    </div>

                    {(index < 2) 
                    ? (<div className='flex justify-center'>
                        <IconContext.Provider value={{ size: '80px', className: 'lg:hidden' }}>
                            <FaLongArrowAltDown />
                        </IconContext.Provider>

                        <IconContext.Provider value={{ size: '80px', className: 'hidden lg:block' }}>
                            <FaLongArrowAltRight />
                        </IconContext.Provider>
                    </div>)

                    : ('')
                    }
                </div>
            ))}
            </div>
        </section>
    )
}