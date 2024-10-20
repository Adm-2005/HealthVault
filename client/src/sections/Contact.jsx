

export default function Contact() {
    return (
        <section id='contact' className='flex flex-col justify-center items-center gap-8 p-9'>
            <h1 className='text-cyan-700 font-roboto font-bold text-center text-2xl lg:text-3xl'>Reach Us</h1>

            <form className='bg-cyan-50 p-7 w-full md:w-2/4 rounded-lg flex flex-col justify-center items-center gap-6'>
                <div className='w-full flex flex-col gap-1'>
                   <label htmlFor='email' className='font-roboto text-cyan-700'>Email Address</label>
                   <input id='email' className='rounded-lg p-2 outline-cyan-700' name='email' type='email'></input> 
                </div>

                <div className='w-full flex flex-col gap-1'>
                    <label htmlFor='message' className='font-roboto text-cyan-700'>Message</label>
                    <textarea htmlFor='message' className='rounded-lg outline-cyan-700 p-2'></textarea>
                </div>

                <div className='w-full flex justify-center'>
                    <input type='submit' value='Send' className='bg-black text-white hover:text-gray-300 hover:bg-slate-800 font-roboto py-2 px-6 rounded-lg'></input>
                </div>
            </form>
        </section>
    )
}