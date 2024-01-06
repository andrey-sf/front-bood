import React, {useState} from "react";

import {
    useCalculateCurrentDataQuery,
    useGetRecipesSearchQuery,
    usePostRecipesMutation
} from "@/redux/features/dataApiSlice";
import {toast} from "react-toastify";
import {useEatAddButton} from "@/hooks";
import {getTodayDate} from "@/components/utils/getTodayDate";



const EatAddButton = () => {
    const {
        isModalVisible,
        activeTab,
        productGrams,
        selectedProducts,
        searchTerm,
        setSearchTerm,
        products,
        openModal,
        closeModal,
        switchToEatTab,
        switchToRecipeTab,
        handleProductGramsChange,
        handleProductClick,
        removeSelectedProduct,
        handleContainerClick,
        handleFormSubmit,
    } = useEatAddButton();

    const today: string = getTodayDate();
    const {
        data: calculateCurrentData,
        isLoading: calculateCurrentDataLoading,
        isFetching: calculateCurrentDataFetching,
        refetch: refetchCalculateCurrentData,
    } = useCalculateCurrentDataQuery(today);

    const refetchCalculateCurrent = () => {
        refetchCalculateCurrentData();
    };

    const [searchRecipe, setSearchRecipe] = useState("");
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    const { data: recipes, isError } = useGetRecipesSearchQuery(searchRecipe);

    const [postRecipe, isLoading] = usePostRecipesMutation();

    const handleRecipeClick = (recipe: Recipe) => {
        setSelectedRecipe((prevRecipe) => (prevRecipe === recipe ? null : recipe));
    };
    const handleAddRecipe = () => {
        const RecipeId = selectedRecipe ? selectedRecipe.id : null;

        if (RecipeId) {
            postRecipe({ recipe: RecipeId })
                .unwrap()
                .then(() => {
                    toast.success(`Рецепт "${selectedRecipe!.title}" добавлен.`);
                    refetchCalculateCurrent();
                    setSelectedRecipe(null);
                    setSearchRecipe("");
                    closeModal();
                })
                .catch((error) => {
                    toast.error(`Ошибка: ${error.message}`);
                });
        } else {
            toast.error("Выберите рецепт");
        }
    };

    return (
        <>
            <button
                className="bg-yellow-400 flex items-center justify-between gap-5 pl-3 pr-6 py-2 rounded-xl max-md:pr-5 hover:bg-yellow-500"
                onClick={openModal}
            >
                <div className="flex items-stretch gap-3.5 my-auto">
                    <img
                        loading="lazy"
                        alt="frame1"
                        src="/Frame1.jpg"
                        className="aspect-[1.09] object-contain object-center w-[47px] overflow-hidden shrink-0 max-w-full rounded-lg"
                    />

                    <div className="text-neutral-600 text-base leading-5 mt-2 self-start">
                        Добавить приём пищи
                    </div>
                </div>
                <img
                    loading="lazy"
                    src="/plus.svg"
                    alt = "plus"
                    className="aspect-square object-contain object-center w-12 overflow-hidden self-stretch shrink-0 max-w-full"
                />
            </button>
            {isModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"  onClick={handleContainerClick}>
                    <div className="bg-white p-8 max-w-3xl w-full rounded-xl relative">
                        <button
                            className="absolute top-4 right-4 text-red-500 hover:text-red-700 cursor-pointer"
                            onClick={closeModal}
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


                        <div className="flex justify-around mb-4">
                            <button
                                className={`tab-button ${activeTab === "eat" ? 'bg-neutral-800 text-white rounded py-2 px-4' : ""}`}
                                onClick={switchToEatTab}
                            >
                                Добавить продукты
                            </button>
                            <button
                                className={`tab-button ${activeTab === "recipe" ? 'bg-neutral-800 text-white rounded py-2 px-4' : ""}`}
                                onClick={switchToRecipeTab}
                            >
                                Добавить рецепт
                            </button>
                        </div>

                        {activeTab === "eat" && (
                            <div className="flex justify-center items-center">
                                <div className="">
                                    <div className="">
                                        <input
                                            type="text"
                                            placeholder="Поиск продуктов"
                                            className="w-full md:w-auto p-2 border rounded  focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        {searchTerm && (
                                            <div
                                                className="absolute z-10 bg-white border rounded mt-2 w-full max-h-96 overflow-y-auto shadow-lg">
                                                {products?.results.map((product) => (
                                                    <div
                                                        key={product.id}
                                                        className={`p-4 border-b cursor-pointer ${
                                                            selectedProducts.some((selectedProduct) => selectedProduct["id"] === product.id)
                                                                ? "bg-gray-200"
                                                                : ""
                                                        }`}
                                                        onClick={() => {
                                                            handleProductClick(product);
                                                            setSearchTerm("");
                                                        }}
                                                    >
                                                        <p className="text-lg font-semibold">{product.title}</p>
                                                        <p className="text-sm text-neutral-400">
                                                            Белки: {product.proteins}г, Жиры: {product.fats}г,
                                                            Углеводы: {product.carbohydrates}г,
                                                            Калории: {product.calories}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <div className="flex items-center mt-4">
                                            {selectedProducts.map((selectedProduct) => (
                                                <div key={selectedProduct["id"]}
                                                     className="bg-white p-3 rounded-md shadow-md border mb-2 mr-2 flex items-center">
                                                    <span
                                                        className="text-lg font-semibold mr-2 flex-grow pr-4">{selectedProduct["title"]}</span>
                                                    <p className="text-sm text-gray-500 mb">
                                                        Белки: {(selectedProduct["proteins"] * productGrams).toFixed(2)}г,
                                                        Жиры: {(selectedProduct["fats"] * productGrams).toFixed(2)}г,
                                                        Углеводы: {(selectedProduct["carbohydrates"] * productGrams).toFixed(2)}г,
                                                        Калории: {(selectedProduct["calories"] * productGrams).toFixed(2)}
                                                    </p>
                                                    <button
                                                        className="text-red-500 hover:text-red-700 focus:outline-none ml-4"
                                                        onClick={() => removeSelectedProduct(selectedProduct)}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            className="h-6 w-6"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center mt-4">
                                            <input
                                                type="text"
                                                placeholder="Граммовка продукта"
                                                className="w-full md:w-auto p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                                value={productGrams}
                                                onChange={handleProductGramsChange}
                                            />
                                            <span className="ml-2 text-gray-500">гр.</span>
                                        </div>
                                        <div className="flex justify-center items-center">
                                            <button
                                                className="bg-yellow-400 hover:bg-yellow-500 text-black p-2 rounded-2xl justify-center mx-auto w-48 py-2 mt-6 "
                                                onClick={(event) => {
                                                    handleFormSubmit(event);
                                                }}
                                            >
                                                Добавить
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "recipe" && (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Поиск"
                                    value={searchRecipe}
                                    onChange={(e) => setSearchRecipe(e.target.value)}
                                />
                                {recipes && recipes.results.length > 0 ? (
                                    <div className="max-h-80 overflow-y-auto">
                                        <ul>
                                            {recipes.results.map((recipe) => (
                                                <li key={recipe.id} className={recipe === selectedRecipe ? 'text-red-500' : ''}>
                                                    <div className="flex justify-between items-start gap-5 mt-9 max-md:max-w-full max-md:flex-wrap">
                                                        <div
                                                            className="text-lg leading-5 grow shrink basis-auto cursor-pointer font-bold"
                                                            onClick={() => handleRecipeClick(recipe)}
                                                        >
                                                            {recipe.title}
                                                        </div>
                                                        <button onClick={() => handleRecipeClick(recipe)}>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                className="h-8 w-8 hover:text-red-500"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div className="mt-2">
                                                        <h3 className="text-sm">Состав:</h3>
                                                        <ul>
                                                            {recipe.product_weight.map(({ product, weight }) => (
                                                                <li key={product.id} className="flex justify-between items-center mt-2" >
                                                                    <div>
                                                                        <p className="text-sm">{product.title}</p>
                                                                        <p className="text-xs text-neutral-400">
                                                                            Белки: {product.proteins}гр., Жиры: {product.fats}гр.,
                                                                            Углеводы: {product.carbohydrates}гр.,
                                                                            Калории: {product.calories}
                                                                        </p>

                                                                    </div>
                                                                    <p className="text-xs mr-1">Вес: {weight}гр.</p>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <div>У вас нет рецептов. Можете добавить их во вкладке Мои рецепты</div>
                                )}
                                {selectedRecipe && (
                                    <button
                                        className="rounded-2xl justify-center bg-yellow-400 hover:bg-yellow-500 mx-auto block w-48 py-2 mt-6"
                                        onClick={handleAddRecipe}
                                    >
                                        Добавить
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default EatAddButton;
