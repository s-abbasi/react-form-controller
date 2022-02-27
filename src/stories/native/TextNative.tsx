import { useForm } from '../../useForm/UseForm';
import { Form } from '../../useForm/UseForm.types';

export const TextNative = (formModel: Form): JSX.Element => {
    const form = useForm(formModel);
    return (
        <>
            <p>{form.name.value}</p>
            <input type="text" {...form.name.jsx} />
        </>
    );
};
