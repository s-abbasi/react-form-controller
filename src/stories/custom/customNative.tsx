/* eslint-disable no-console */
import { Adapter } from '../../useForm/native-adapter';
import { useForm } from '../../useForm/useForm';
import { FormModel } from '../../useForm/useForm.types';
import { formModel } from './form';

const CustomInput = (adapter: Adapter): JSX.Element => {
    return (
        <div>
            <span>title:</span>
            <div
                style={{ background: 'lightgrey' }}
                contentEditable
                onInput={(e) => adapter.setValue(e.currentTarget.textContent)}
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
