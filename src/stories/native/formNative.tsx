/* eslint-disable no-console */
import { useForm } from '../../useForm/useForm';
import { FormModel } from '../../useForm/useForm.types';

export const FormNative = (formModel: FormModel): JSX.Element => {
    const form = useForm(formModel);

    const log = (): void => {
        console.clear();
        console.table(form);
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

            <div {...form.bind('contact')}>
                <label htmlFor="phone">
                    Phone
                    <input type="radio" name="contact" id="phone" value="phone" />
                </label>
                <br />
                <label htmlFor="fax">
                    Fax
                    <input type="radio" name="contact" id="fax" value="fax" />
                </label>
                <br />
                <label htmlFor="email">
                    Email
                    <input type="radio" name="contact" id="email" value="email" />
                </label>
            </div>

            <hr />

            <label htmlFor="chb">
                single
                <input id="chb" type="checkbox" {...form.bind('single')} />
            </label>

            <hr />
            <label htmlFor="file">
                file:
                <br />
                <input type="file" id="file" {...form.bind('image')} />
            </label>

            <hr />

            <button type="button" onClick={log}>
                log
            </button>
        </div>
    );
};
