/* eslint-disable no-console */
import { useForm } from '../../useForm/useForm';
import { FormModel, JSXBinding } from '../../useForm/useForm.types';
import { formModel } from './form';

const CustomInput = (adapter: JSXBinding): JSX.Element => {
    return (
        <div>
            <span>title:</span>
            <div
                style={{ background: 'lightgrey' }}
                contentEditable
                onInput={(e) => adapter.onChange(e.currentTarget.textContent)}
            >
                {adapter.initialValue}
            </div>
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FormCustom = (_formModel?: FormModel): JSX.Element => {
    const form = useForm(formModel);

    const log = (): void => {
        console.clear();
        console.table(form);
    };

    return (
        <div>
            <CustomInput {...form.bind('customInput')} />

            <button type="button" onClick={log}>
                log
            </button>
        </div>
    );
};
