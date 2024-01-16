import CustomizedInput from '../components/shared/CustomizedInput'
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth?.user) {
            return navigate("/chat");
        }
    }, [auth])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email || !password) {
           return toast.error("All fields are required!");
        }

        try {
            toast.loading("Logging In", { id: "login" })
            await auth?.login(email, password);
            toast.success("Logged In Successfully", { id: "login" })
        } catch (error: any) {
            toast.error("Login Failed", { id: "login" });
            console.log(error);
        }
    }

    return (
        <div className="flex w-full h-full flex-1 items-center">
            <div className="hidden lg:flex shrink-0 p-[16px] mt-[64px]">
                <img src="airobot.png" alt="Robot" className='w-[400px]' />
            </div>
            <div className="flex flex-1 md:flex-[0.5] p-[16px] mx-auto lg:ml-auto mt-[128px] lg:mt-[50px]">
                <form
                    onSubmit={handleSubmit}
                    className='m-auto p-[30px] shadow-2xl shadow-gray-700 rounded-[15px] border-none'>
                    <div className="flex flex-col justify-center gap-7">
                        <h4 className="text-center p-2 font-semibold text-3xl">Login</h4>
                        <CustomizedInput name="email" type='email' label='Email' placeholder='Email' />
                        <CustomizedInput name="password" type='password' label='Password' placeholder='Password' />
                    </div>
                    <button className="button mt-5 px-2 py-3 w-[400px] rounded-md bg-blue-600 hover:bg-white active:bg-white/50 hover:text-gray-900 font-semibold" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login