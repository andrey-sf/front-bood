import {apiSlice} from "@/redux/services/apiSlice";



// @ts-ignore
const dataApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        calculateStandard: builder.query<CalculateStandart, void>({
            query: () => '/calculate/standard/',
        }),
        calculateCurrent: builder.query<CalculateCurrent, void>({
            query: () => '/calculate/current/',
        }),
        calculateStandardData: builder.query({
            query: (date: string) => `/calculate/standard/?date=${date}`,
        }),
        calculateCurrentData: builder.query({
            query: (date: string) => `/calculate/current/?date=${date}`,
        }),
        postWaterWeight: builder.mutation<number, number>({
            query: (weight) => ({
                url: '/eating/',
                method: 'POST',
                body: { water: { weight } }
            }),
        }),
        postProductWeight: builder.mutation({
            query: ({ product, weight }) => ({
                url: '/eating/',
                method: 'POST',
                body: { product_weight: { product, weight } },
            }),
        }),
        getProducts: builder.query<ProductsResponse, string>({
            query: (search) => `/products/?search=${encodeURIComponent(search)}`,
        }),
        getCategories: builder.query<CategoriesResponse, void>({
            query: () => `/products/category/`,
        }),

        getRecipesSearch: builder.query<RecipesResponse, string>({
            query: (search) => `/recipes/?search=${encodeURIComponent(search)}`,
        }),
        postRecipes: builder.mutation({
            query: ({ recipe }) => ({
                url: '/eating/',
                method: 'POST',
                body: { recipe: recipe },
            }),
        }),
        getRecipes: builder.query<RecipesResponse, void>({
            query: () => '/recipes/',
        }),
        getPersonCard: builder.query<PersonCardResponse, void>({
            query: () => 'personcard/',
        }),
        postPersonCard: builder.mutation({
            query: ({ height, age, gender,target, activity,image,femaletype, exclude_products, exclude_category }) => ({
                url: '/personcard/',
                method: 'POST',
                body: { height, age, gender,target, activity,image,femaletype, exclude_products, exclude_category },
            }),
        }),
        getMeasurements: builder.query<MeasurementResponse, void>({
            query: () => '/measurements/',
        }),
        postMeasurements: builder.mutation({
            query: ({ weight, chest, waist, hips, hand }) => ({
                url: '/measurements/',
                method: 'POST',
                body: { weight, chest, waist, hips, hand },
            }),
        }),
        getFemaleTypes: builder.query<FemaleTypeResponse, void>({
            query: () => '/femaletypes/',
        }),
    }),
});

export const {
    useCalculateCurrentQuery,
    useCalculateStandardQuery,
    usePostWaterWeightMutation,
    usePostProductWeightMutation,
    usePostRecipesMutation,
    useGetProductsQuery,
    useGetRecipesSearchQuery,
    useGetRecipesQuery,
    useCalculateCurrentDataQuery,
    useCalculateStandardDataQuery,
    useGetPersonCardQuery,
    usePostPersonCardMutation,
    useGetMeasurementsQuery,
    usePostMeasurementsMutation,
    useGetFemaleTypesQuery,
    useGetCategoriesQuery,
} = dataApiSlice;