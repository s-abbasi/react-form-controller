/* eslint-disable no-console */
import { useForm } from '../../useForm/useForm';
import { FormModel } from '../../useForm/useForm.types';

export const FormNative = (formModel: FormModel): JSX.Element => {
    const form = useForm(formModel);

    const log = (): void => {
        console.log(form.single);
    };

    return (
        <div>
            <label htmlFor="1">
                With type text assigned
                <br />
                <input id="1" type="text" {...form.bind('firstName')} />
            </label>
            <br />

            <hr />

            <label htmlFor="2">
                Without type text assigned
                <br />
                <input id="2" {...form.bind('lastName')} />
            </label>

            <hr />

            <label htmlFor="chb">
                single
                <input id="chb" type="checkbox" {...form.bind('single')} />
            </label>

            <button type="button" onClick={log}>
                log
            </button>
        </div>
    );
};
