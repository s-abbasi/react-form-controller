/* eslint-disable no-console */
import { useForm } from '../../useForm/useForm';
import { FormModel } from '../../useForm/useForm.types';

export const TextNative = (formModel: FormModel): JSX.Element => {
    const form = useForm(formModel);

    return (
        <div>
            <label htmlFor="1">
                With type text assigned
                <input id="1" type="text" {...form.bind('firstName')} />
            </label>
            <br />

            <label htmlFor="2">
                Without type text assigned
                <input id="2" {...form.bind('lastName')} />
            </label>
        </div>
    );
};
