'use client';




import {useResetPassword} from "@/hooks";
import Form from "@/components/forms/Form";

export default function PasswordResetForm() {
    const { email, isLoading, onChange, onSubmit } = useResetPassword();

    const config = [
        {
            labelText: 'Почта',
            labelId: 'email',
            type: 'email',
            onChange,
            value: email,
            required: true,
        },
    ];

    return (
        <Form
            config={config}
            isLoading={isLoading}
            btnText='Сбросить пароль'
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
}