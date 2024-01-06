'use client';

import { usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useLogoutMutation } from '@/redux/features/authApiSlice';
import { logout as setLogout } from '@/redux/features/authSlice';
import { NavLink } from '@/components/common';
import {toast} from "react-toastify";
export default function Navbar() {
    const pathname = usePathname();
    const dispatch = useAppDispatch();

    const [logout] = useLogoutMutation();

    const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);

    const handleLogout = () => {
        logout(undefined)
            .unwrap()
            .then(() => {
                dispatch(setLogout());
                toast.success('Вы вышли из аккаунта');
            });
    };

    const isSelected = (path: string) => (pathname === path);
    const authLinks = (isMobile: boolean) => (
        <>
            <NavLink
                isSelected={isSelected('/dashboard')}
                isMobile={isMobile}
                href="/account"
                className="text-neutral-800 text-2xl font-medium leading-7 whitespace-nowrap justify-center items-center bg-yellow-100 grow px-5 py-3 rounded-xl hover:bg-yellow-500"
            >
                Личный кабинет
            </NavLink>
            <NavLink
                isMobile={isMobile}
                onClick={handleLogout}
                className="text-neutral-800 text-2xl font-medium leading-7 whitespace-nowrap justify-center items-center bg-yellow-100 grow px-5 py-3 rounded-xl hover:bg-yellow-500"
            >
                Выйти
            </NavLink>
        </>
    );

    const guestLinks = (isMobile: boolean) => {
        if (!isAuthenticated && !isLoading) {
            return (
                <>
                    <NavLink
                        isSelected={isSelected('/auth/login')}
                        isMobile={isMobile}
                        href="/auth/login"
                        className="text-zinc-100 text-2xl font-semibold leading-7 whitespace-nowrap justify-center items-center bg-neutral-800 grow px-5 py-3 rounded-xl hover:text-yellow-400"
                    >
                        Вход
                    </NavLink>
                    <NavLink
                        isSelected={isSelected('/auth/register')}
                        isMobile={isMobile}
                        href="/auth/register"
                        className="text-neutral-800 text-2xl font-medium leading-7 whitespace-nowrap justify-center items-center bg-yellow-100 grow px-5 py-3 rounded-xl hover:bg-yellow-500"
                    >
                        Регистрация
                    </NavLink>
                </>
            );
        }

        return null; // Если пользователь авторизован или происходит загрузка, не рендерим guestLinks
    };
    return (
        <div className="bg-yellow-400 w-full -mr-5 pl-6 pr-16 pb-1 max-md:max-w-full max-md:px-5">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                <div className="flex flex-col items-stretch w-[27%] max-md:w-full max-md:ml-0">
                    <a href="/">
                        <img
                            loading="lazy"
                            src="/bood_logo.svg"
                            className="] object-contain object-center overflow-hidden shrink-0 "
                            alt="Bood Logo"
                        />
                    </a>
                </div>

                <div className="flex flex-col items-stretch w-[73%] ml-5 max-md:w-full max-md:ml-0">
                    <div
                        className="flex w-full items-center justify-between gap-5 my-auto max-md:max-w-full max-md:flex-wrap max-md:mt-10">
                        <div
                            className="items-stretch flex justify-between gap-5 my-auto max-md:max-w-full max-md:flex-wrap max-md:justify-center">
                            <div className="text-neutral-800 text-xl leading-7">О нас</div>
                            <div className="text-neutral-800 text-xl leading-7"> Почему мы</div>
                            <div className="text-neutral-800 text-xl leading-7"> Как это работает</div>
                            <div className="text-neutral-800 text-xl leading-7"> FAQ</div>
                        </div>
                        <div className="items-stretch self-stretch flex justify-between gap-5">
                            <div className="items-stretch self-stretch flex justify-between gap-5">
                                {isAuthenticated ? authLinks(true) : guestLinks(true)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}