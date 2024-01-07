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
                isSelected={isSelected('/account')}
                isMobile={isMobile}
                href="/account"
                className="text-neutral-800 text-xl leading-6 whitespace-nowrap justify-center items-stretch self-center my-auto px-6 py-3 rounded-2xl border-2 border-solid border-black max-md:px-5 hover:bg-yellow-100"
            >
                Личный кабинет
            </NavLink>
            <NavLink
                isMobile={isMobile}
                onClick={handleLogout}
                className="text-neutral-800 text-xl leading-6 whitespace-nowrap justify-center items-stretch self-center my-auto px-6 py-3 rounded-2xl border-2 border-solid border-black max-md:px-5 hover:bg-yellow-100"
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
                        className="text-neutral-800 text-xl leading-6 whitespace-nowrap justify-center items-stretch self-center my-auto px-6 py-3 rounded-2xl border-2 border-solid border-black max-md:px-5 hover:bg-yellow-100"
                    >
                        Вход
                    </NavLink>
                    <NavLink
                        isSelected={isSelected('/auth/register')}
                        isMobile={isMobile}
                        href="/auth/register"
                        className="text-neutral-800 text-xl leading-6 whitespace-nowrap justify-center items-stretch self-center my-auto px-6 py-3 rounded-2xl border-2 border-solid border-black max-md:px-5 hover:bg-yellow-100"
                    >
                        Регистрация
                    </NavLink>
                </>
            );
        }

        return null; // Если пользователь авторизован или происходит загрузка, не рендерим guestLinks
    };
    return (
        <div className="justify-center items-stretch bg-yellow-400 flex w-full flex-col px-16 max-md:max-w-full max-md:px-5">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                <div className="flex flex-col items-stretch w-[27%] max-md:w-full max-md:ml-0">
                    <NavLink href="/">
                        <img
                            loading="lazy"
                            src="/logo_landing.svg"
                            className="aspect-[1.51] object-contain object-center w-[136px] overflow-hidden shrink-0 max-w-full"
                            alt="Bood Logo"
                        />
                    </NavLink>
                </div>

                <div className="flex flex-col items-stretch w-[73%] ml-5 max-md:w-full max-md:ml-0">
                    <div
                        className="flex w-full items-center justify-between gap-5 my-auto max-md:max-w-full max-md:flex-wrap max-md:mt-10">
                        <div
                            className="items-stretch flex justify-between gap-5 my-auto max-md:max-w-full max-md:flex-wrap max-md:justify-center">
                            <div className="text-neutral-800 text-2xl font-medium leading-6"> Почему мы</div>
                            <div className="text-neutral-800 text-2xl font-medium leading-6"> Как это работает</div>
                            <div className="text-neutral-800 text-2xl font-medium leading-6"> FAQ</div>
                        </div>
                        <div className="items-stretch self-stretch flex justify-between gap-5">
                            <div className="items-stretch self-stretch flex justify-between gap-5 p-2">
                                {isAuthenticated ? authLinks(true) : guestLinks(true)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}