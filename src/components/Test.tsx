import { useForm } from '../useForm/UseForm';
import { Form } from '../useForm/UseForm.types';

const form: Form = {
    firstName: { initialValue: 'sajad' },
    lastName: { initialValue: '' },
};

export function Test(): JSX.Element {
    const signupForm = useForm(form);

    return (
        <>
            <code>{JSON.stringify(signupForm)}</code>
            <br />
            <input {...signupForm.firstName.jsx} />
        </>
    );
}
