import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Link from "next/link";
import {RegisterForm} from "@/components/forms";

export default function Register() {
  return (
      <div className="bg-white flex flex-col">
        <div className="flex flex-col relative shrink-0 box-border">
          <Navbar />
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                        Регистрация
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <RegisterForm/>
                    {/*<SocialButtons />*/}
                    <p className='mt-4 text-center text-sm text-gray-500'>
                        Нажимая на кнопку Регистрация, Вы подтверждаете, что вам 18+ лет и Вы соглашаетесь с нашим пользовательским соглашением.
                    </p>

                    <p className='mt-10 text-center text-sm text-gray-500'>
                        У вас уже есть аккаунт?{' '}
                        <Link
                            href='/auth/login'
                            className='font-semibold leading-6 text-gray-500 hover:text-black'
                        >
                            Войти
                        </Link>
                    </p>
                </div>

            </div>
        </div>
          <Footer/>
      </div>
  );
}