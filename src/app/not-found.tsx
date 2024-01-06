import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'No Found',
}
export default function NotFound() {
    return (

        <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
        <div className='text-center'>
        <p className='text-base font-semibold text-neutral-800'>404</p>
            <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
        Страница не найдена
    </h1>
    <p className='mt-6 text-base leading-7 text-gray-600'>
        К сожалению, мы не смогли найти страницу, которую вы ищете
    </p>
    <div className='mt-10 flex items-center justify-center gap-x-6'>
    <a
        href='/'
    className='rounded-md bg-yellow-300 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
        Вернуться на домашнюю страницу
    </a>
    <a href='/' className='text-sm font-semibold text-gray-900'>
        Связаться со службой поддержки <span aria-hidden='true'>&rarr;</span>
    </a>
    </div>
    </div>
    </main>
);
}