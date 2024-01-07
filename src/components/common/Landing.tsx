


export default function Landing() {
    return (
        <div
            className="flex-col overflow-hidden relative flex min-h-[730px] w-full pl-16 pr-20 py-12 items-start max-md:max-w-full max-md:px-5"
        >
            <img
                loading="lazy"
                srcSet="/background_main-screen.png"
                className="absolute h-full w-full object-cover object-center inset-0"
            />
            <div
                className="relative text-yellow-400 text-5xl font-semibold leading-[61px] w-[738px] max-w-full mt-20 max-md:text-4xl max-md:leading-[52px] max-md:mt-10"
            >
                <span className="text-black">Создай</span>
                <br/> <span className="text-yellow-400">индивидуальный рацион</span><br/>
                <span className="text-black">вместе с bOOd!</span>
            </div>
            <div
                className="relative text-neutral-800 text-xl leading-7 tracking-wide mt-11 max-md:max-w-full max-md:mt-10"
            >
                Оцениваем твой привычный рацион с учетом пищевых привычек.
            </div>
            <div
                className="relative items-center flex gap-3 mt-6 max-md:max-w-full max-md:flex-wrap"
            >
                <div className="flex w-2.5 shrink-0 h-2.5 flex-col my-auto rounded-[50%]"></div>
                <div className="text-neutral-800 text-xl leading-7 tracking-wide self-stretch grow max-md:max-w-full">
                    <div className="flex items-center">
                        <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full mr-3"></div>
                        <span>Создавай персонализированные рекомендации по улучшению питания.</span>
                    </div>
                </div>

            </div>
            <div
                className="relative items-center flex gap-3 mt-1 max-md:max-w-full max-md:flex-wrap"
            >
                <div className="flex w-2.5 shrink-0 h-2.5 flex-col my-auto rounded-[50%]"></div>
                <div className="text-neutral-800 text-xl leading-7 tracking-wide self-stretch grow max-md:max-w-full">
                    <div className="flex items-center">
                        <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full mr-3"></div>
                        <span>Считай калории, белки, жиры и углеводы в ежедневном рационе.</span>
                    </div>
                </div>

            </div>
            <div
                className="relative text-neutral-800 text-2xl font-medium leading-6 whitespace-nowrap justify-center items-stretch bg-yellow-400 hover:bg-yellow-300 mt-20 mb-20 px-8 py-4 rounded-2xl max-md:my-10 max-md:px-5">
                <a href="/auth/register"
                   className="block w-full h-full text-neutral-800 text-2xl font-medium leading-6 whitespace-nowrap justify-center items-stretch"
                   target="_blank" rel="noopener noreferrer">
                    Начать
                </a>
            </div>

        </div>

    );
};
