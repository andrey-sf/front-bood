
import {useState} from "react";
import {useWaterWeightAdd} from "@/hooks";
export default function WaterButtonAdd() {

    const { waterWeight, isLoading, onChange, onSubmit } = useWaterWeightAdd();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const openModal = () => {
        setIsModalVisible(true);
    };
    const closeModal = () => {
        setIsModalVisible(false);
    };
    const handleContainerClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        const target = e.target as HTMLElement;


        if (target.classList.contains("bg-black")) {
            closeModal();
        }
    };
    const handleButtonClick = (value: number) => {
        // @ts-ignore
        onChange({ target: { value: value.toString() } });
    };


    return (
        <div>
            <button
                className="bg-yellow-400 flex items-center justify-between gap-5 pl-3 pr-6 py-2 rounded-xl max-md:pr-5 hover:bg-yellow-500"
                onClick={openModal}
            >
                <div className="flex items-stretch gap-5 my-auto">
                    <img
                        loading="lazy"
                        alt = "frame2"
                        src="/Frame2.jpg"
                        className="aspect-[1.09] object-contain object-center w-[47px] overflow-hidden shrink-0 max-w-full rounded-lg"
                    />
                    <div className="text-neutral-600 text-base leading-5 self-center my-auto">
                        Добавить приём воды
                    </div>
                </div>
                <img
                    loading="lazy"
                    alt = "plus"
                    src="/plus.svg"
                    className="aspect-square object-contain object-center w-12 overflow-hidden self-stretch shrink-0 max-w-full"
                />
            </button>

            {isModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                     onClick={handleContainerClick}
                >
                    <div className="bg-white p-8 max-w-md w-full rounded-xl relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-red-500 hover:text-red-700 cursor-pointer"
                            style={{fontSize: "1.5rem"}}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-8 w-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        <h2 className="text-2xl font-bold mb-4 text-center">Добавить выпитую воду</h2>
                        <form
                            onSubmit={(event) => {
                                onSubmit(event);
                                closeModal();
                            }}
                            className="flex flex-col items-center space-y-4"
                        >
                            <label className="text-center">
                                <input
                                    type="number"
                                    value={waterWeight}
                                    onChange={onChange}
                                    className="w-32 h-10 p-2 rounded-md text-center border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ..."
                                />
                                <span className="ml-2">мл.</span>
                            </label>

                            <div className="flex space-x-4">
                                <button type="button" onClick={() => handleButtonClick(50)}
                                        className="flex flex-col items-center">
                                    <img src="/stakan1.svg" alt="50 ml" className=""/>
                                    <span className="text-center mt-2 text-sm">50 мл</span>
                                </button>
                                <button type="button" onClick={() => handleButtonClick(100)}
                                        className="flex flex-col items-center">
                                    <img src="/stakan2.svg" alt="100 ml" className=""/>
                                    <span className="text-center mt-2 text-sm">100 мл</span>
                                </button>
                                <button type="button" onClick={() => handleButtonClick(200)}
                                        className="flex flex-col items-center">
                                    <img src="/stakan3.svg" alt="200 ml" className=""/>
                                    <span className="text-center mt-2 text-sm">200 мл</span>
                                </button>
                            </div>


                            <button
                                type="submit"
                                className="mr-6 bg-yellow-400 px-4 py-2 rounded-md text-black hover:bg-yellow-500 focus:outline-none focus:ring focus:border-blue-300"
                            >
                                Добавить
                            </button>
                        </form>

                    </div>
                </div>

            )}
        </div>
    );
};