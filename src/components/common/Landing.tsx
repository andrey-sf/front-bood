


export default function Landing() {
    return (
        <div
            className="flex-col overflow-hidden self-stretch relative flex min-h-screen items-center justify-center px-5 py-12 max-md:max-w-full">
            <img
                loading="lazy"
                src="/pic1.svg"
                alt="Description of the image"
                className="absolute z-1 inset-0 mx-auto my-auto"
            />

            <div className="relative flex w-[864px] max-w-full flex-col items-stretch mt-10 mb-72 max-md:my-10">
                <div
                    className="text-neutral-800 text-center text-5xl font-semibold leading-[52px] max-md:max-w-full max-md:text-4xl max-md:leading-[51px]">

                    Создай индивидуальный рацион вместе с bOOd
                </div>
                <div
                    className="text-neutral-800 text-center leading-7 self-center whitespace-nowrap mt-6 max-md:max-w-full max-sm:text-center">
                    Оцениваем ваш рацион с учётом пищевых привычек
                </div>
                <div
                    className="items-stretch self-center flex w-[609px] max-w-full justify-between gap-5 mt-16 pr-11 max-md:flex-wrap max-md:mt-10 max-md:pr-5">
                    <input
                        type="email"
                        className="text-neutral-600 text-base leading-5 items-stretch border bg-yellow-100 grow px-3 py-3.5 rounded-xl border-solid border-neutral-800"
                        placeholder="введите email"
                        style={{zIndex: 2}}
                    />

                    <a
                        href="/auth/register"
                        className="text-white text-2xl font-semibold leading-6 whitespace-nowrap justify-center items-stretch bg-yellow-400 grow cursor-pointer pointer-events-auto px-5 py-3 rounded-xl text-center"
                        style={{zIndex: 2}}
                    >
                        Регистрация
                    </a>
                </div>
            </div>
        </div>
    );
};
