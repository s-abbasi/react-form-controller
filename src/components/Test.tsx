/* eslint-disable no-console */
import { StrictMode } from 'react';
import { useForm } from '../useForm/UseForm';
import { Form } from '../useForm/UseForm.types';

const formModel: Form = {
    firstName: { initialValue: 'sajad' },
    lastName: { initialValue: 'abbasi' },
    single: { initialValue: true },
};

export function Test(): JSX.Element {
    const form = useForm(formModel);
    console.log('form: ', form);

    return (
        <StrictMode>
            <code>{JSON.stringify(form)}</code>
            <input type="text" {...form.firstName.jsx} />
            <input type="checkbox" {...form.single.jsx} />
            <button type="button">log</button>
        </StrictMode>
    );
}
