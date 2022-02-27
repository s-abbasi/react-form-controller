import TextField from '@mui/material/TextField';
import { useForm } from '../..';
import { Form } from '../../useForm/UseForm.types';

export const TextMUI = (formModel: Form): JSX.Element => {
    const form = useForm(formModel);
    return (
        <>
            <p>{form.name.value}</p>
            <TextField label="Outlined" variant="outlined" />
        </>
    );
};
