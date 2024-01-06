import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import {
    useCalculateCurrentDataQuery,
    useCalculateCurrentQuery, useCalculateStandardDataQuery,
    useCalculateStandardQuery
} from "@/redux/features/dataApiSlice";
import {getTodayDate} from "@/components/utils/getTodayDate";

export default function Charts() {
    const today: string = getTodayDate();

    const {
        data: calculateCurrentData,
        isLoading: calculateCurrentDataLoading,
        isFetching: calculateCurrentDataFetching,
        refetch: refetchCalculateCurrentData,
    } = useCalculateCurrentDataQuery(today);

    const {
        data: calculateStandardData,
    } = useCalculateStandardDataQuery(today);

    const waterDifference = calculateStandardData && calculateCurrentData && (calculateStandardData.detail.water - calculateCurrentData.detail.water);
    const caloriesDifference = calculateStandardData && calculateCurrentData && (calculateStandardData.detail.calories - calculateCurrentData.detail.calories);
    ChartJS.register(ArcElement, Tooltip, Legend);

    const charts1 = {
        labels: ['Белки','Жиры','Углеводы'],
        datasets: [
            {
                label: 'Норма на день',
                data: [
                    calculateStandardData?.detail.proteins || 0,
                    calculateStandardData?.detail.fats || 0,
                    calculateStandardData?.detail.carbohydrates || 0,
                ],
                backgroundColor: [
                    '#60a5fa', // Цвет для белков
                    '#fda4af', // Цвет для жиров
                    '#fde68a', // Цвет для углеводов
                ],
                hoverBackgroundColor: [
                    'red',
                    'red',
                    'red',
                ],
            },
            {
                label: 'Израсходовано',
                data: [
                    calculateCurrentData?.detail.proteins || 0,
                    calculateCurrentData?.detail.fats || 0,
                    calculateCurrentData?.detail.carbohydrates || 0,
                ],
                backgroundColor: [
                    '#60a5fa', // Цвет для белков
                    '#fda4af', // Цвет для жиров
                    '#fde68a', // Цвет для углеводов
                ],
                hoverBackgroundColor: [
                    'red',
                    'red',
                    'red',
                ],
            },
        ],
    };
    const charts2 = {
        labels: ['Норма на день', 'Съедино'],
        datasets: [
            {
                label: 'Калории',
                data: [
                    calculateStandardData?.detail.calories || 0,
                    calculateCurrentData?.detail.calories || 0,
                ],
                backgroundColor: ['#60a5fa', '#bef264'],
                hoverBackgroundColor: ['red', 'red'],
            },
        ],
    };
    const charts3 = {
        labels: ['Норма на день', 'Выпито'],
        datasets: [
            {
                label: 'Воды',
                data: [
                    calculateStandardData?.detail.water || 0,
                    calculateCurrentData?.detail.water || 0,
                ],
                backgroundColor: ['#93c5fd', '#fda4af'],
                hoverBackgroundColor: ['red', 'red'],
            },
        ],
    };

    return (
        <div
            className="flex flex-col mt-11 max-md:max-w-full max-md:mt-10"
        >
            <div className="justify-evenly flex max-md:flex-col max-md:items-stretch max-md:gap-0 ">

                {/* Chart 1 */}
                <div
                    className="flex flex-col"
                >
                    <div
                        className="self-stretch bg-white flex w-full grow flex-col items-stretch mx-auto px-5 py-9 rounded-xl max-md:mt-10"
                    >
                        <div className="text-center text-neutral-800 text-lg leading-7 whitespace-nowrap">
                            Белки, жиры, углеводы на сегодня
                        </div>
                        <div
                            className="flex items-stretch justify-between gap-5 mt-11 max-md:mt-10"
                        >
                            <div style={{width: '200px', height: '200px'}}>
                                <Doughnut data={charts1}/>
                            </div>
                            <div
                                className="items-stretch self-center flex grow basis-[0%] flex-col my-auto"
                            >
                                <div className="items-stretch flex gap-2.5">
                                    <div
                                        className="bg-blue-400 flex w-[25px] shrink-0 h-[25px] flex-col"
                                    ></div>
                                    <div className="text-neutral-600 text-sm leading-7">Белки:</div>
                                    <div
                                        className="text-neutral-600 text-sm leading-7 grow whitespace-nowrap"
                                    >
                                        {calculateCurrentData?.detail.proteins}/{calculateStandardData?.detail.proteins}
                                    </div>
                                </div>
                                <div className="items-stretch flex gap-2.5 mt-4">
                                    <div
                                        className="bg-rose-300 flex w-[25px] shrink-0 h-[25px] flex-col"
                                    ></div>
                                    <div className="text-neutral-600 text-sm leading-7">Жиры:</div>
                                    <div
                                        className="text-neutral-600 text-sm leading-7 grow whitespace-nowrap"
                                    >
                                        {calculateCurrentData?.detail.fats}/{calculateStandardData?.detail.fats}
                                    </div>
                                </div>
                                <div className="items-stretch flex gap-2.5 mt-4">
                                    <div
                                        className="bg-amber-200 flex w-[25px] shrink-0 h-[25px] flex-col"
                                    ></div>
                                    <div className="text-neutral-600 text-sm leading-7">Углеводы:</div>
                                    <div
                                        className="text-neutral-600 text-sm leading-7 grow whitespace-nowrap"
                                    >
                                        {calculateCurrentData?.detail.carbohydrates}/{calculateStandardData?.detail.carbohydrates}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart 2 */}
                <div
                    className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0"
                >
                    <div
                        className="self-stretch bg-white flex w-full grow flex-col items-stretch mx-auto pl-5 pr-7 py-9 rounded-xl max-md:mt-10 max-md:px-5"
                    >
                        <div className="text-center text-neutral-800 text-lg leading-7 whitespace-nowrap">
                            Твои калории на сегодня
                        </div>
                        <div
                            className="flex items-stretch justify-between gap-5 mt-11 max-md:mt-10"
                        >
                            <div style={{width: '200px', height: '200px'}}>
                                <Doughnut data={charts2}/>
                            </div>
                            <div
                                className="items-stretch self-center flex grow basis-[0%] flex-col my-auto"
                            >
                                <div className="items-stretch flex gap-2.5">
                                    <div
                                        className="border bg-blue-400 flex w-[25px] shrink-0 h-[25px] flex-col border-solid border-gray-400"
                                    ></div>
                                    <div className="text-neutral-600 text-sm leading-7">Норма:</div>
                                    <div
                                        className="text-neutral-600 text-sm leading-7 grow whitespace-nowrap"
                                    >
                                        {calculateStandardData?.detail.calories}
                                    </div>
                                </div>
                                <div className="items-stretch flex gap-2.5 mt-4">
                                    <div
                                        className="bg-lime-300 flex w-[25px] shrink-0 h-[25px] flex-col"
                                    ></div>
                                    <div className="text-neutral-600 text-sm leading-7">Съедено:</div>
                                    <div
                                        className="text-neutral-600 text-sm leading-7 whitespace-nowrap"
                                    >
                                        {calculateCurrentData?.detail.calories}
                                    </div>
                                </div>
                                <div className="items-stretch flex gap-2.5 mt-4">
                                    <div
                                        className="flex-col"
                                    ></div>
                                    <div className="text-neutral-600 text-sm leading-7">Осталось:</div>
                                    <div
                                        className="text-neutral-600 text-sm leading-7 whitespace-nowrap"
                                    >
                                        {caloriesDifference};

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart 3 */}
                <div
                    className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0"
                >
                    <div
                        className="self-stretch bg-white flex w-full grow flex-col items-stretch mx-auto pl-5 pr-4 py-9 rounded-xl max-md:mt-10 max-md:pl-5"
                    >
                        <div className="text-center text-neutral-800 text-lg leading-7 whitespace-nowrap">
                            Количество воды на сегодня
                        </div>
                        <div
                            className="flex items-stretch justify-between gap-5 mt-12 max-md:mt-10"
                        >
                            <div style={{width: '200px', height: '200px'}}>
                                <Doughnut data={charts3}/>
                            </div>
                            <div
                                className="items-stretch self-center flex grow basis-[0%] flex-col my-auto"
                            >
                                <div className="items-stretch flex gap-2.5">
                                    <div
                                        className="border bg-blue-300 flex w-[25px] shrink-0 h-[25px] flex-col border-solid border-gray-400"
                                    ></div>
                                    <div className="text-neutral-600 text-sm leading-7">Норма:</div>
                                    <div
                                        className="text-neutral-600 text-sm leading-7 grow whitespace-nowrap"
                                    >
                                        {calculateStandardData?.detail.water} мл
                                    </div>
                                </div>
                                <div className="items-stretch flex gap-2.5 mt-4 max-md:mr-2.5">
                                    <div
                                        className="bg-rose-300 flex w-[25px] shrink-0 h-[25px] flex-col"
                                    ></div>
                                    <div className="text-neutral-600 text-sm leading-7">Выпито:</div>
                                    <div
                                        className="text-neutral-600 text-sm leading-7 grow whitespace-nowrap"
                                    >
                                        {calculateCurrentData?.detail.water} мл
                                    </div>
                                </div>
                                <div className="items-stretch flex gap-2.5 mt-4">
                                    <div
                                        className="flex-col"
                                    ></div>
                                    <div className="text-neutral-600 text-sm leading-7">Осталось</div>
                                    <div
                                        className="text-neutral-600 text-sm leading-7 grow whitespace-nowrap"
                                    >
                                        {waterDifference} мл
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end chart 3 */}

            </div>
        </div>
    );
};