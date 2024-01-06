'use client';


import { Form } from '@/components/forms';
import useLogin from "@/hooks/use-login";

export default function LoginForm() {
    const { email, password, isLoading, onChange, onSubmit } = useLogin();

    const config = [
        {
            labelText: 'Почта',
            labelId: 'email',
            type: 'email',
            value: email,
            required: true,
        },
        {
            labelText: 'Пароль',
            labelId: 'password',
            type: 'password',
            value: password,
            link: {
                linkText: 'Забыли пароль?',
                linkUrl: '/auth/password-reset',
            },
            required: true,
        },
    ];

    return (
        <Form
            config={config}
            isLoading={isLoading}
            btnText='Вход'
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
}