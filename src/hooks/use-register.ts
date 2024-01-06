import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import {useRegisterMutation} from "@/redux/features/authApiSlice";
import {number} from "prop-types";


export default function useRegister() {
    const router = useRouter();
    const [register, { isLoading }] = useRegisterMutation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        privacyPolicy: false,
        ageConfirmation: false,
    });

    const { name, email, password, confirmPassword } = formData;

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Пароль и подтверждение пароля не совпадают');
            return;
        }
        if (password.length < 8) {
            toast.error('Пароль должен содержать как минимум 8 символов');
            return;
        }
        if (!/\d/.test(password)) {
            toast.error('Пароль должен содержать хотя бы одну цифру');
            return;
        }
        if (!/^[а-яА-Яa-zA-Z]{1,30}$/.test(name)) {
            toast.error('Имя должно содержать только буквы и быть от 1 до 30 символов');
            return;
        }
        const isValidEmail = /^[a-zA-Z0-9!#\$%&'*+\-\/=?\^_`{|}~]+(?:\.[a-zA-Z0-9!#\$%&'*+\-\/=?\^_`{|}~]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(email);

        if (!isValidEmail) {
            toast.error('Некорректный формат электронной почты');
            return;
        }

        register({ name, email, password })
            .unwrap()
            .then(() => {
                toast.success('Пожалуйста, проверьте электронную почту, чтобы подтвердить учетную запись');
                router.push('/auth/login');
            })
            .catch((error) => {
                if (error.data) {
                    if (error.data.email && Array.isArray(error.data.email)) {
                        const errorMessage = error.data.email[0];
                        toast.error(errorMessage);
                    } else if (error.data.password && Array.isArray(error.data.password)) {
                        // Получаем сообщения об ошибках пароля из данных ошибки
                        // @ts-ignore
                        error.data.password.forEach((passwordError) => {
                            toast.error(passwordError);
                        });
                    } else {
                        toast.error('Не удалось зарегистрировать аккаунт');
                    }
                } else {
                    toast.error('Не удалось зарегистрировать аккаунт');
                }
            });
    };


    return {
        name,
        email,
        password,
        confirmPassword,
        isLoading,
        onChange,
        onSubmit,
    };
}
