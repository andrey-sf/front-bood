import { useState } from "react";
import { useCalculateCurrentDataQuery, useGetProductsQuery, usePostProductWeightMutation } from "@/redux/features/dataApiSlice";
import { toast } from "react-toastify";
import { getTodayDate } from "@/components/utils/getTodayDate";


export default function useEatAddButton() {
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

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState("eat");
    const [productGrams, setProductGrams] = useState<number>(0);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { data: products, error, refetch } = useGetProductsQuery(searchTerm);

    const [postProductWeight, isLoading] = usePostProductWeightMutation();

    const openModal = () => {
        setIsModalVisible(true);
        switchToEatTab();
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const switchToEatTab = () => {
        setActiveTab("eat");
    };

    const switchToRecipeTab = () => {
        setActiveTab("recipe");
    };

    const handleProductGramsChange = (event: { target: { value: string; }; }) => {
        const value = parseFloat(event.target.value);
        setProductGrams(isNaN(value) ? 0 : value);
    };

    const handleProductClick = (product: Product) => {
        // @ts-ignore
        setSelectedProducts([product]);
    };


    const removeSelectedProduct = (productToRemove: any) => {
        setSelectedProducts((prevSelectedProducts) =>
            prevSelectedProducts.filter((product) => product !== productToRemove)
        );
    };

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("bg-black")) {
            closeModal();
        }
    };


    const handleFormSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const productId = selectedProducts.length > 0 ? selectedProducts[0]["id"] : null;
        if (productGrams.toString().length <= 4) {
            const productWeightData = {
                product: productId,
                weight: productGrams,
            };
            postProductWeight(productWeightData)
                .unwrap()
                .then(() => {
                    const productNames = selectedProducts.map((product) => product["title"]).join(", ");
                    refetchCalculateCurrent();
                    toast.success(`Вы добавили "${productNames}" в количестве ${productGrams} гр.`);
                    setProductGrams("" as any);
                    setSelectedProducts([]);
                    closeModal();
                })
                .catch((error) => {
                    toast.error(`Ошибка: ${error.message}`);
                });
        } else {

            toast.error("Введите не более 4 цифр для граммов продукта.");
        }
    };

    return {
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
    };
};
