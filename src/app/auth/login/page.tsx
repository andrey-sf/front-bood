import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Link from "next/link";
import LoginForm from "@/components/forms/LoginForm";

export default function Login() {
    return (
        <div className="bg-white flex flex-col">
            <div className="flex flex-col relative shrink-0 box-border">
                <Navbar />
                <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                    <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                            Вход в аккаунт
                        </h2>
                    </div>

                    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                        <LoginForm />


                        <p className='mt-10 text-center text-sm text-gray-500'>
                            У Вас не аккаунта?{' '}
                            <Link
                                href='/auth/register'
                                className='font-semibold leading-6 text-black-light hover:text-black'
                            >
                                Регистрация
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}