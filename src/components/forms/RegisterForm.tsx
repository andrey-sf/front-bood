'use client';



import useRegister from "@/hooks/use-register";
import Form from "@/components/forms/Form";

export default function RegisterForm() {
    const {
        name,
        email,
        password,
        confirmPassword,
        isLoading,
        onChange,
        onSubmit,
    } = useRegister();

    const config = [
        {
            labelText: 'Имя',
            labelId: 'name',
            type: 'text',
            value: name,
            required: true,
        },
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
            required: true,
        },
        {
            labelText: 'Подтвердить пароль',
            labelId: 'confirmPassword',
            type: 'password',
            value: confirmPassword,
            required: true,
        },
    ];

    return (
        <Form
            config={config}
            isLoading={isLoading}
            btnText='Регистрация'
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
}