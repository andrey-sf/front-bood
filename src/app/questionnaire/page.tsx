'use client'
import {useEffect, useRef, useState} from "react";
import {
    useGetCategoriesQuery,
    useGetFemaleTypesQuery, useGetPersonCardQuery,
    useGetProductsQuery, usePostMeasurementsMutation,
    usePostPersonCardMutation
} from "@/redux/features/dataApiSlice";
import {toast} from "react-toastify";
import {redirect, useRouter} from 'next/navigation';

export default function Questionnaire() {
    const router = useRouter();
    const ACTIVITY_TYPE = [
        ["1.2", "Сидячий или лежачий"],
        ["1.375", "Умственный труд"],
        ["1.55", "Лёгкий физический труд (активная работа «на ногах» или тренировки 2-3 в неделю)"],
        ["1.7", "Физический труд средней тяжести (ежедневные тренировки)"],
        ["1.9", "Тяжелый физический труд (профессиональные спортсмены)"],
    ];

    const [gender, setGender] = useState<string>('');
    const [weight, setWeight] = useState<number | null>(null);
    const [selectedFemaleTypes, setSelectedFemaleTypes] = useState<FemaleType[]>([]);
    const [height, setHeight] = useState<number | null>(null);
    const [age, setAge] = useState<number | null>(null);
    const [chestSize, setChestSize] = useState<number | null>(null);
    const [waistSize, setWaistSize] = useState<number | null>(null);
    const [hipSize, setHipSize] = useState<number | null>(null);
    const [handSize, setHandSize] = useState<number | null>(null);
    const { data: femaleTypes } = useGetFemaleTypesQuery();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const [selectedAllergens, setSelectedAllergens] = useState<number[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<string>("1.2");


    const [postPersonCard] = usePostPersonCardMutation();
    const [postMeasurements] = usePostMeasurementsMutation();
    const { data: productsData } = useGetProductsQuery(searchTerm);
    const { data: categoriesData, error } = useGetCategoriesQuery();

    // Ref для доступа к корневому элементу компонента
    const componentRef = useRef<HTMLDivElement>(null);

    const handleCheckboxChange = (type: FemaleType) => {
        // Проверяем, есть ли тип уже в списке выбранных
        const isTypeSelected = selectedFemaleTypes.some((selectedType) => selectedType.id === type.id);

        // Если тип уже выбран, убираем его, иначе добавляем
        if (isTypeSelected) {
            const updatedSelectedTypes = selectedFemaleTypes.filter((selectedType) => selectedType.id !== type.id);
            setSelectedFemaleTypes(updatedSelectedTypes);
        } else {
            setSelectedFemaleTypes([...selectedFemaleTypes, type]);
        }
    };
    const handleGenderChange = (selectedGender: string) => {
        setGender(selectedGender);
    };

    const handleProductClick = (product: Product) => {
        // Добавление или удаление продукта в список выбранных
        const isSelected = selectedProducts.some((selectedProduct) => selectedProduct.id === product.id);
        if (isSelected) {
            const updatedProducts = selectedProducts.filter((selectedProduct) => selectedProduct.id !== product.id);
            setSelectedProducts(updatedProducts);
        } else {
            setSelectedProducts([...selectedProducts, product]);
        }
        // Закрытие окна поиска после выбора продукта
        setIsSearchOpen(false);
    };
    const removeSelectedProduct = (selectedProduct: Product) => {
        // Удаление выбранного продукта из списка
        const updatedProducts = selectedProducts.filter((product) => product.id !== selectedProduct.id);
        setSelectedProducts(updatedProducts);
    };
    // Обработчик события клика для закрытия окна поиска при клике вне его области
    const handleClickOutside = (event: MouseEvent) => {
        if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
            setIsSearchOpen(false);
        }
    };
    // Добавление обработчика события клика при монтировании компонента
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        // Убрать обработчик события клика при размонтировании компонента
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleAllergenToggle = (categoryId: number) => {
        // Добавление или удаление аллергена из списка выбранных
        if (selectedAllergens.includes(categoryId)) {
            setSelectedAllergens(selectedAllergens.filter((id) => id !== categoryId));
        } else {
            setSelectedAllergens([...selectedAllergens, categoryId]);
        }
    };
    const handleActivityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedActivity(event.target.value);
    };
    const handleSave = () => {
        const isHeightValid = validateNumericInput(height, 100, 250);
        const isWeightValid = validateNumericInput(weight, 15, 350);
        const isAgeValid = validateNumericInput(age, 18, 100);
        const isChestSizeValid = validateNumericInput(chestSize, 30, 300);
        const isWaistSizeValid = validateNumericInput(waistSize, 30, 300);
        const isHipSizeValid = validateNumericInput(hipSize, 30, 300);
        const isHandSizeValid = validateNumericInput(handSize, 10, 30);

        // Проверка всех условий перед выполнением handleSave
        if (
            !isHeightValid ||
            !isWeightValid ||
            !isAgeValid ||
            !isChestSizeValid ||
            !isWaistSizeValid ||
            !isHipSizeValid ||
            !isHandSizeValid
        ) {
            toast.error("Пожалуйста, введите корректные данные во все обязательные поля.");
            return;
        }

        if (!height || !age || !weight || !gender || !chestSize || !waistSize || !hipSize || !handSize) {
            toast.error("Пожалуйста, заполните все обязательные поля.");
            return;
        }

        // Собираем данные для PersonCard
        const personCardData = {
            height,
            age,
            gender,
            target: "", // Замените на актуальные данные
            activity: Number(selectedActivity),
            image: "", // Замените на актуальные данные
            femaletype: selectedFemaleTypes.map((femaleType) => femaleType.id),
            exclude_products: selectedProducts.map((product) => product.id),
            exclude_category: selectedAllergens,
        };

        postPersonCard(personCardData)
            .then(() => {
                toast.success(`Вы успешно заполнили анкету`);
                const measurementsData = {
                    weight,
                    chest: chestSize,
                    waist: waistSize,
                    hips: hipSize,
                    hand: handSize,
                };
                return postMeasurements(measurementsData);
            })
            .catch((error) => {
                // Обработка ошибок при отправке данных для PersonCard
                toast.error(`Ошибка при сохранении данных: ${error.message}`);
            })
            .then(() => {
                window.location.href = '/account';
            })
            .catch((error) => {
                // Обработка ошибок при отправке данных для Measurements
                toast.error(`Ошибка при сохранении замеров: ${error.message}`);
            });
    };

// Функция для проверки числового ввода в указанном диапазоне
    const validateNumericInput = (value: number | null, min: number, max: number): boolean => {
        return value !== null && !isNaN(value) && value >= min && value <= max;
    };


    return (
        <div className="bg-zinc-100 flex flex-col justify-center items-center px-5 py-5 max-md:px-5">
            <div
                className="bg-white rounded-2xl flex w-full max-w-[734px] flex-col mt-12 mb-3.5 max-md:max-w-full max-md:mt-10">
                <div
                    className="p-4 text-center text-neutral-800 text-3xl font-semibold leading-10 self-stretch max-md:max-w-full">
                    Добро пожаловать!
                </div>
                <div className="text-center text-neutral-800 text-base leading-5 self-stretch mt-2.5 max-md:max-w-full">
                    Для завершения регистрации заполните анкету:
                </div>
                <div className="bg-white flex flex-col mt-5 px-5 py-5 rounded-xl self-center max-md:mt-5 max-md:px-5">
                    <div className="text-neutral-800 text-2xl font-medium leading-7 self-stretch">
                        Данные:
                    </div>
                </div>

                <div className="bg-white flex flex-col mt-5 px-5 py-5 rounded-xl self-start max-md:mt-5 max-md:px-5">
                    <div className="text-neutral-800 text-lg font-medium leading-7 self-stretch">
                        Пол:
                    </div>
                    <div className="mt-3">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={gender === 'male'}
                                onChange={() => handleGenderChange('male')}
                            />
                            <span className="ml-2">Мужской</span>
                        </label>

                        <label className="inline-flex items-center ml-6">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={gender === 'female'}
                                onChange={() => handleGenderChange('female')}
                            />
                            <span className="ml-2">Женский</span>
                        </label>
                    </div>
                </div>

                {gender === 'female' && femaleTypes && (
                    <div
                        className="bg-white flex flex-col mt-5 px-5 py-5 rounded-xl self-end max-md:mt-10 max-md:px-5">
                        <div className="text-neutral-800 text-lg font-medium leading-7 self-stretch">
                        </div>
                        <div className="mt-3 flex items-center space-x-6">
                            {femaleTypes.results.map((femaleType) => (
                                <label key={femaleType.id} className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                        checked={selectedFemaleTypes.some((type) => type.id === femaleType.id)}
                                        onChange={() => handleCheckboxChange(femaleType)}
                                    />
                                    <span className="ml-2">{femaleType.title}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}


                <div className="bg-white flex flex-col mt-5 px-5 py-5 rounded-xl self-start max-md:mt-10 max-md:px-5">
                    <div className="text-neutral-800 text-2xl font-medium leading-7 self-stretch">
                        Рост:
                    </div>
                    <div className="mt-3">
                        <input
                            type="number"
                            className="form-input"
                            placeholder="Введите ваш рост в сантиметрах"
                            value={height === null ? '' : height}
                            onChange={(e) => setHeight(e.target.value !== '' ? Number(e.target.value) : null)}
                        />
                        {height !== null && height < 100 && (
                            <div className="text-red-500 text-sm mt-1">
                                Допустимый минимальный рост: 100 см
                            </div>
                        )}
                        {height !== null && height > 250 && (
                            <div className="text-red-500 text-sm mt-1">
                                Допустимый максимальный рост: 250 см
                            </div>
                        )}
                    </div>
                </div>
                <div className="bg-white flex flex-col mt-5 px-5 py-5 rounded-xl self-start max-md:mt-10 max-md:px-5">
                    <div className="text-neutral-800 text-2xl font-medium leading-7 self-stretch">
                        Вес:
                    </div>
                    <div className="mt-3">
                        <input
                            type="number"
                            className="form-input"
                            placeholder="Введите ваш вес в килограммах"
                            value={weight === null ? '' : weight}
                            onChange={(e) => setWeight(e.target.value !== '' ? Number(e.target.value) : null)}
                        />
                        {weight !== null && weight < 15 && (
                            <div className="text-red-500 text-sm mt-1">
                                Допустимый минимальный вес: 15 кг
                            </div>
                        )}
                        {weight !== null && weight > 350 && (
                            <div className="text-red-500 text-sm mt-1">
                                Допустимый максимальный вес: 350 кг
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white flex flex-col mt-5 px-5 py-5 rounded-xl self-start max-md:mt-10 max-md:px-5">
                    <div className="text-neutral-800 text-2xl font-medium leading-7 self-stretch">
                        Возраст:
                    </div>
                    <div className="mt-3">
                        <input
                            type="number"
                            className="form-input"
                            placeholder="Введите ваш возраст"
                            value={age === null ? '' : age}
                            onChange={(e) => setAge(e.target.value !== '' ? Number(e.target.value) : null)}
                        />
                        {age !== null && age < 18 && (
                            <div className="text-red-500 text-sm mt-1">
                                Допустимый минимальный возраст: 18 лет
                            </div>
                        )}
                        {age !== null && age > 100 && (
                            <div className="text-red-500 text-sm mt-1">
                                Допустимый максимальный возраст: 100 лет
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white flex flex-col mt-5 px-5 py-5 rounded-xl self-center max-md:mt-10 max-md:px-5">
                    <div className="text-neutral-800 text-2xl font-medium leading-7 self-stretch">
                        Замеры:
                    </div>
                </div>

                <div className="bg-white flex flex-col mt-5 px-5 py-5 rounded-xl self-start max-md:mt-10 max-md:px-5">
                    <div className="text-neutral-800 text-2xl font-medium leading-7 self-stretch">
                        Грудь:
                    </div>
                    <div className="mt-3">
                        <input
                            type="number"
                            className="form-input"
                            placeholder="Введите размер груди"
                            value={chestSize === null ? '' : chestSize}
                            onChange={(e) => setChestSize(e.target.value !== '' ? Number(e.target.value) : null)}
                        />
                        {chestSize !== null && chestSize < 30 && (
                            <div className="text-red-500 text-sm mt-1">
                                Допустимый минимальный размер груди: 30 см
                            </div>
                        )}
                        {chestSize !== null && chestSize > 300 && (
                            <div className="text-red-500 text-sm mt-1">
                                Допустимый максимальный размер груди: 300 см
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white flex flex-col mt-5 px-5 py-5 rounded-xl self-start max-md:mt-10 max-md:px-5">
                    <div className="text-neutral-800 text-2xl font-medium leading-7 self-stretch">
                        Талия:
                    </div>
                    <div className="mt-3">
                        <input
                            type="number"
                            className="form-input"
                            placeholder="Введите размер талии"
                            value={waistSize === null ? '' : waistSize}
                            onChange={(e) => setWaistSize(e.target.value !== '' ? Number(e.target.value) : null)}
                        />
                        {waistSize !== null && waistSize < 30 && (
                            <div className="text-red-500 text-sm mt-1">
                                Допустимый минимальный размер талии: 30 см
                            </div>
                        )}
                        {waistSize !== null && waistSize > 300 && (
                            <div className="text-red-500 text-sm mt-1">
                                Допустимый максимальный размер талии: 300 см
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white flex flex-col mt-5 px-5 py-5 rounded-xl self-start max-md:mt-10 max-md:px-5">
                    <div className="text-neutral-800 text-2xl font-medium leading-7 self-stretch">
                        Бедра:
                    </div>
                    <div className="mt-3">
                        <input
                            type="number"
                            className="form-input"
                            placeholder="Введите размер бедер"
                            value={hipSize === null ? '' : hipSize}
                            onChange={(e) => setHipSize(e.target.value !== '' ? Number(e.target.value) : null)}
                        />
                        {hipSize !== null && hipSize < 30 && (
                            <div className="text-red-500 text-sm mt-1">
                                Допустимый минимальный размер бедер: 30 см
                            </div>
                        )}
                        {hipSize !== null && hipSize > 300 && (
                            <div className="text-red-500 text-sm mt-1">
                                Допустимый максимальный размер бедер: 300 см
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white flex flex-col mt-5 px-5 py-5 rounded-xl self-start max-md:mt-10 max-md:px-5">
                    <div className="text-neutral-800 text-2xl font-medium leading-7 self-stretch">
                        Кисть:
                    </div>
                    <div className="mt-3">
                        <input
                            type="number"
                            className="form-input"
                            placeholder="Введите размер кисти"
                            value={handSize === null ? '' : handSize}
                            onChange={(e) => setHandSize(e.target.value !== '' ? Number(e.target.value) : null)}
                        />
                        {handSize !== null && handSize < 10 && (
                            <div className="text-red-500 text-sm mt-1">
                                Допустимый минимальный размер кисти: 10 см
                            </div>
                        )}
                        {handSize !== null && handSize > 30 && (
                            <div className="text-red-500 text-sm mt-1">
                                Допустимый максимальный размер кисти: 30 см
                            </div>
                        )}
                    </div>
                </div>


                <div className="bg-white flex flex-col mt-5 px-5 py-5 rounded-xl self-start max-md:mt-10 max-md:px-5">
                    <div className="text-neutral-800 text-2xl font-medium leading-7 self-stretch">
                        Аллергены:
                    </div>
                    <div ref={componentRef}
                         className="text-neutral-800 text-2xl font-medium leading-7 self-stretch mt-2">

                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Поиск продуктов"
                                className="w-full p-2 border round focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => setIsSearchOpen(true)}
                            />
                            {isSearchOpen && searchTerm && productsData && (
                                <div
                                    className="absolute z-10 bg-white border rounded mt-2 w-full max-h-96 overflow-y-auto shadow-lg">
                                    {productsData.results.map((product) => (
                                        <div
                                            key={product.id}
                                            className={`p-4 border-b cursor-pointer ${
                                                selectedProducts.some((selectedProduct) => selectedProduct.id === product.id)
                                                    ? "bg-gray-200"
                                                    : ""
                                            }`}
                                            onClick={() => handleProductClick(product)}
                                        >
                                            <p className="text-lg font-semibold">{product.title}</p>
                                            <p className="text-sm text-neutral-400">
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Отображение выбранных продуктов */}
                        <div className="flex flex-wrap -mb-2">
                            {selectedProducts.map((selectedProduct) => (
                                <div key={selectedProduct.id}
                                     className="bg-white p-3 rounded-md shadow-md border mb-2 mr-2 flex items-center">
                                <span
                                    className="text-lg font-semibold mr-2 flex-grow pr-4">{selectedProduct.title}</span>

                                    <button
                                        className="text-red-500 hover:text-red-700 focus:outline-none ml-4"
                                        onClick={() => removeSelectedProduct(selectedProduct)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" className="h-6 w-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
                <div className="bg-white flex flex-col mt-5 px-5 py-5 rounded-xl self-center max-md:mt-10 max-md:px-5">
                    <div className="text-neutral-800 text-2xl font-medium leading-7 self-stretch">Исключить из
                        рекомендаций:
                    </div>
                    {categoriesData?.results.map((category) => (
                        <div
                            key={category.id}
                            className={`flex items-center justify-between p-2 border-b cursor-pointer mt-2 ${
                                selectedAllergens.includes(category.id) ? 'bg-gray-200' : ''
                            }`}
                            onClick={() => handleAllergenToggle(category.id)}
                        >
                            <span>{category.title}</span>
                            <input
                                type="checkbox"
                                checked={selectedAllergens.includes(category.id)}
                                readOnly
                                className="ml-2 cursor-pointer"
                            />
                        </div>
                    ))}
                </div>

                <div className="bg-white flex flex-col mt-5 px-5 py-5 rounded-xl self-center max-md:mt-10 max-md:px-5">
                    <div className="text-neutral-800 text-2xl font-medium leading-7 self-stretch">
                        Физическая активность:
                    </div>
                    <select
                        value={selectedActivity}
                        onChange={handleActivityChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    >
                        {ACTIVITY_TYPE.map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center justify-center gap-5 mt-20  max-md:mt-10 p-4">
                    <div
                        className="text-neutral-800 hover:bg-yellow-500 text-2xl font-semibold  justify-center bg-yellow-400 px-6 py-3 rounded-xl max-md:px-5 cursor-pointer"
                        onClick={handleSave}
                    >
                        Сохранить
                    </div>
                </div>
            </div>
        </div>
    );
}
