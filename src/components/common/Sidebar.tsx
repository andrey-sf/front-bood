
"use client"
import Link from "next/link";
import {useLogoutMutation, useRetrieveUserQuery} from "@/redux/features/authApiSlice";
import {logout as setLogout} from "@/redux/features/authSlice";
import {useAppDispatch} from "@/redux/hooks";
import {usePathname, useRouter} from "next/navigation";
import {toast} from "react-toastify";
export default function Sidebar() {
    const router = useRouter();
    // const { data: user, isLoading, isFetching } = useRetrieveUserQuery();
    const dispatch = useAppDispatch();
    const [logout] = useLogoutMutation();
    const pathname = usePathname();
    const links = [
        { href: "/account", iconSrc: "/home.svg", text: "Главная", key: "home" },
        { href: "/account/food_diary", iconSrc: "/eat.svg", text: "Дневник питания", key: "food_diary" },
        { href: "/account/progress", iconSrc: "/progress.svg", text: "График прогресса", key: "progress" },
        { href: "/account/measurements", iconSrc: "/men.svg", text: "Замеры", key: "measurements" },
        { href: "/account/recipes", iconSrc: "/book.svg", text: "Мои рецепты", key: "recipes" },
        { href: "/account/settings", iconSrc: "/Exclude.svg", text: "Настройки", key: "settings" },
    ];
    const handleLogout = () => {
        logout(undefined)
            .unwrap()
            .then(() => {
                dispatch(setLogout());
                toast.success('Вы вышли из аккаунта');
            });
    };
    return (
        <nav
            className="flex-col items bg-black text-white w-1/4 sm:w-1/5 md:w-1/6 lg:w-1/6 xl:w-1/6 text-center text-base md:text-lg lg:text-xl"
        >
            <Link href="/account">
                <div className="p-4 mb-4">
                    <img
                        src="/bood_logo2.svg"
                        alt="Logo"
                    />
                </div>
            </Link>

            {/*{user && (*/}
            {/*    <div className="text-center mb-4">*/}
            {/*        {isLoading ? (*/}
            {/*            <p className="text-sm text-gray-500">Loading...</p>*/}
            {/*        ) : (*/}
            {/*            <div className="mx-auto">*/}
            {/*                <p className="text-lg font-bold text-white">{user.name}</p>*/}
            {/*                <img*/}
            {/*                    src="/user.svg"*/}
            {/*                    alt="Avatar"*/}
            {/*                    className="mx-auto"*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*)}*/}

            <div>
                {links.map(link => {
                    const isActive = pathname === link.href;
                    return (
                        <Link key={link.key} href={link.href}>
                            <div
                                className={`p-4 flex items-center hover:bg-gray-600 ${isActive && 'bg-gray-600'}`}>
                                <img
                                    src={link.iconSrc}
                                    className="mr-2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-12 xl:h-12"
                                    alt={`${link.text} Icon`}
                                />
                                {link.text}
                            </div>
                        </Link>
                    );
                })}
            </div>
            <button
                onClick={handleLogout}
                className="text-neutral-800 text-2xl sm:text-xl font-semibold leading-6 whitespace-nowrap justify-center items-stretch bg-yellow-400 mx-auto mt-10 px-6 py-3.5 rounded-xl self-start md:max-md:ml-2.5 md:max-md:mt-5 md:max-md:px-5 hover:bg-yellow-500"
            >
                Выход
            </button>
        </nav>
    );
}