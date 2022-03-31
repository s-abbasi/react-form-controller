/* eslint-disable no-console */
import { useForm } from '../../useForm/useForm';
import { FormModel } from '../../useForm/useForm.types';
import { formModel } from './form';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FormNative = (_formModel?: FormModel): JSX.Element => {
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

            <div>
                <label htmlFor="phone">
                    Phone
                    <input
                        {...form.bind('contact')}
                        type="radio"
                        name="contact"
                        id="phone"
                        defaultValue="phone"
                    />
                </label>
                <br />
                <label htmlFor="fax">
                    Fax
                    <input
                        {...form.bind('contact')}
                        type="radio"
                        name="contact"
                        id="fax"
                        defaultValue="fax"
                    />
                </label>
                <br />
                <label htmlFor="email">
                    Email
                    <input
                        {...form.bind('contact')}
                        type="radio"
                        name="contact"
                        id="email"
                        defaultValue="email"
                    />
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

            <label htmlFor="textarea">
                textarea:
                <br />
                <textarea id="textarea" {...form.bind('description')} />
            </label>

            <hr />

            <button type="button" onClick={log}>
                log
            </button>
        </div>
    );
};
