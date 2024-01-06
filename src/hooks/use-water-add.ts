
import { ChangeEvent, FormEvent, useState } from "react";
import {
    useCalculateCurrentDataQuery,
    usePostWaterWeightMutation
} from "@/redux/features/dataApiSlice";
import {toast} from "react-toastify";
import {getTodayDate} from "@/components/utils/getTodayDate";



export default function useWaterWeightAdd() {
    const [postWaterWeight, isLoading] = usePostWaterWeightMutation();
    const [waterWeight, setWaterWeight] = useState<number>(100);

    const today: string = getTodayDate();
    const {
        data: calculateCurrentData,
        isLoading: calculateCurrentDataLoading,
        isFetching: calculateCurrentDataFetching,
        refetch: refetchCalculateCurrentData,
    } = useCalculateCurrentDataQuery(today);

    //обновления данных на странице
    const refetchWaterData = () => {
        refetchCalculateCurrentData();
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        setWaterWeight(value);
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isNaN(waterWeight)) {
            toast.error('Неверный литраж воды. Пожалуйста, введите корректное число.');
            return;
        }
        if (waterWeight.toString().startsWith('0') || waterWeight.toString().length > 4) {
            toast.error('Литраж воды не может начинаться с 0 или превышать четыре цифры. Пожалуйста, введите корректное значение.');
            return;
        }
        postWaterWeight(waterWeight)
            .then(() => {
                toast.success(`Вы добавили ${waterWeight} мл. к выпитой воде`);
                refetchWaterData();
            })
            .catch((error) => {
                toast.error('Ошибка при добавлении воды:', error);
            });
    };

    return {
        waterWeight,
        isLoading,
        onChange,
        onSubmit,
    };
}