'use client'
import Sidebar from "@/components/common/Sidebar";
import {useRetrieveUserQuery} from "@/redux/features/authApiSlice";
import {
    useCalculateCurrentDataQuery,
    useGetPersonCardQuery,
    useGetProductsQuery
} from "@/redux/features/dataApiSlice";
import {healthPhrases} from "@/components/utils/phrases";
import useRandomPhrase from "@/hooks/use-random-phrase";
import WaterButtonAdd from "@/components/common/account/WaterButtonAdd";
import Charts from "@/components/common/account/Charts";
import EatAddButton from "@/components/common/account/EatAddButton";
import {getTodayDate} from "@/components/utils/getTodayDate";
export default function Page() {
    const today: string = getTodayDate();
    const {
        data: calculateCurrentData,
        isLoading: calculateCurrentDataLoading,
        isFetching: calculateCurrentDataFetching,
        refetch: refetchCalculateCurrentData,
    } = useCalculateCurrentDataQuery(today);
    const { data: user, isLoading: userLoading, isFetching: userFetching } = useRetrieveUserQuery();
    const randomPhrase = useRandomPhrase(healthPhrases);
    return (
        <div className="flex">
            {/* Navigation */}
            <Sidebar />
            <div className="flex-auto bg-gray-200 p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24">
                <div
                    className="bg-white flex justify-between gap-5 pl-10 pr-16 pt-12 rounded-xl items-start max-md:max-w-full max-md:flex-wrap max-md:px-5"
                >
                    <div className="flex flex-col items-stretch">
                        <div className="text-neutral-800 text-4xl font-medium leading-7 whitespace-nowrap">
                            {user && `Привет, ${user.name}!`}
                        </div>
                        <div className="text-neutral-600 text-xl leading-7 mt-4">
                            «{randomPhrase}»
                        </div>

                        {/* ИМТ */}
                        <div className="items-stretch flex justify-start gap-3 mt-20 max-md:mt-10">
                            <div
                                className="text-neutral-800 text-xl leading-7">ИМТ: {calculateCurrentData?.detail.imt_value}</div>
                            <div
                                className="text-neutral-800 text-xl leading-7">{calculateCurrentData?.detail.imt_type}</div>
                        </div>
                        {/* ИМТ */}

                    </div>
                    <img
                        loading="lazy"
                        alt="cat"
                        src="/cat1.svg"
                        className="aspect-[1.13] object-contain object-center overflow-hidden shrink-0 max-w-full mt-12 self-end max-md:mt-10"
                    />

                </div>

                {/* Buttons */}
                <div
                    className="items-stretch flex justify-evenly gap-3 mt-12 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
                    {/* Button 1 */}
                    <EatAddButton/>
                    {/* Button 1 end*/}

                    {/* Button 2 */}
                    <WaterButtonAdd/>
                    {/* Button 2 end*/}

                    {/* Button 3 */}
                    <button
                        className="bg-yellow-400 flex items-center justify-between gap-5 pl-3 pr-7 py-2 rounded-xl max-md:pr-5 hover:bg-yellow-500">
                        <div className="flex items-stretch gap-3.5 my-auto">
                            <img
                                loading="lazy"
                                alt="frame3"
                                src="/Frame3.jpg"
                                className="aspect-[1.09] object-contain object-center w-[47px] overflow-hidden shrink-0 max-w-full rounded-lg"
                            />
                            <div className="text-neutral-600 text-base leading-5 my-auto">
                                Как сделать рацион лучше
                            </div>
                        </div>
                        <img
                            loading="lazy"
                            alt="strelka"
                            src="/strelka.svg"
                            className="aspect-square object-contain object-center w-12 overflow-hidden self-stretch shrink-0 max-w-full"
                        />
                    </button>
                </div>
                {/* Button 3 end*/}

                {/* Charts */}
                <Charts/>
                {/* end chart */}

            </div>

        </div>
    );
};