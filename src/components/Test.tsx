import { StrictMode } from 'react';
import { useForm } from '../useForm/UseForm';
import { Form } from '../useForm/UseForm.types';

const form: Form = {
    firstName: { initialValue: 'sajad' },
    lastName: { initialValue: 'abbasi' },
};

export function Test(): JSX.Element {
    const signupForm = useForm(form);

    return (
        <StrictMode>
            <code>{JSON.stringify(signupForm)}</code>
            <br />
            <input {...signupForm.lastName.jsx} />
        </StrictMode>
    );
}
