
import { useState, useEffect } from "react";

const useRandomPhrase = (phrases: any) => {
    const storedPhrase = localStorage.getItem("randomPhrase");
    const storedTimestamp = localStorage.getItem("randomPhraseTimestamp");
    const currentTime = Date.now();

    const is24HoursPassed = storedTimestamp
        ? currentTime - Number(storedTimestamp) > 24 * 60 * 60 * 1000
        : true;

    const initialRandomPhrase = is24HoursPassed
        ? phrases[Math.floor(Math.random() * phrases.length)]
        : storedPhrase || phrases[Math.floor(Math.random() * phrases.length)];

    const [randomPhrase, setRandomPhrase] = useState(initialRandomPhrase);

    const generateRandomPhrase = () => {
        const newRandomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        setRandomPhrase(newRandomPhrase);
        localStorage.setItem("randomPhrase", newRandomPhrase);
        localStorage.setItem("randomPhraseTimestamp", String(currentTime));
    };

    useEffect(() => {
        // Генерируем первую фразу при монтировании хука
        if (!storedTimestamp) {
            generateRandomPhrase();
        }

        // Устанавливаем интервал на 24 часа
        const intervalId = setInterval(() => {
            generateRandomPhrase();
        }, 24 * 60 * 60 * 1000);

        // Очищаем интервал при размонтировании хука
        return () => clearInterval(intervalId);
    }, [phrases, storedTimestamp]);

    return randomPhrase;
};

export default useRandomPhrase;