

interface User {
    name: string;
    id: number;
    email: string;
}
interface CalculateStandart {
    status: string;
    detail: {
        imt_type: string;
        imt_value: number;
        calories: number;
        proteins: number;
        fats: number;
        carbohydrates: number;
        water: number;
    };
}
interface CalculateCurrent {
    status: string;
    detail: {
        imt_type: string;
        imt_value: number;
        calories: number;
        proteins: number;
        fats: number;
        carbohydrates: number;
        water: number;
    };
}
interface Product {
    id: number;
    title: string;
    proteins: number;
    fats: number;
    carbohydrates: number;
    calories: number;
    water: number;
}

interface ProductsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Product[];
}

interface Recipe {
    id: number;
    title: string;
    description: string;
    person_card: number;
    image: string;
    is_active: boolean;
    product_weight: { product: Product; weight: number }[];
}

interface   RecipesResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Recipe[];
}

interface Person {
    id: number;
    email: string;
    name: string;
}

interface   PersonCard {
    id: number;
    height: number;
    age: number;
    gender: string;
    target: string;
    activity: string;
    image: string;
    person: Person;
    femaletype: any[];
    exclude_products: any[];
    exclude_category: any[];
    measurements: any[];
}

interface   PersonCardResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PersonCard[];
}

interface Measurement {
    id: number;
    weight: number;
    chest: number;
    waist: number;
    hips: number;
    hand: number;
    datetime_add: string;
    person_card: number;
}

interface MeasurementResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Measurement[];
}

interface FemaleType {
    id: number;
    title: string;
}

interface FemaleTypeResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: FemaleType[];
}
interface Category {
    id: number;
    title: string;
    description: string;
    image: string;
}

interface CategoriesResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Category[];
}