'use client'
import React from 'react';
import { useGetPersonCardQuery } from "@/redux/features/dataApiSlice";
import Spinner from "../common/Spinner";
import { useRouter } from "next/navigation";

interface Props {
    children: React.ReactNode;
}

export default function QuestionnaireCheck({ children }: Props) {
    const router = useRouter();
    const { data: personCardData, isError, isLoading: personCardIsLoading } = useGetPersonCardQuery();

    const isPersonCardComplete = () => {
        return (
            personCardData &&
            personCardData.results &&
            personCardData.results.length > 0
        );
    };

    if (personCardIsLoading) {
        return (
            <div className='flex h-screen justify-center my-8'>
                <Spinner lg />
            </div>
        );
    }

    if (!isPersonCardComplete()) {
        router.push('/questionnaire');
    }


    return <>{children}</>;
}
