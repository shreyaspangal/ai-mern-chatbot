import TypeAnim from '../components/TyperAnim'
import Footer from '../components/shared/Footer'

const Home = () => {
    return (
        <>
            <div className='w-full h-full'>
                <div className="flex flex-col items-center mx-auto mt-5">
                    <div className="">
                        <TypeAnim />
                    </div>
                    <div className="flex w-full flex-col md:flex-row gap-10 my-5">
                        <img src="robot.png" alt="Robot" className='w-[200px] m-auto' />
                        <img src="openai.png" alt="Openai" className='w-[200px] m-auto invert animate-spin-slow' />
                    </div>
                    <div className="flex w-full mx-auto">
                        <img src="chat.png" alt="chatbot" className='flex m-auto w-[95%] md:w-[60%] rounded-md shadow-green-glow mt-32' />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home