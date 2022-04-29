/* eslint-disable no-console */
import { useForm } from '../../useForm/useForm';
import { FormModel, JSXBinding } from '../../useForm/useForm.types';
import { formModel } from './form';

const CustomInput = (props: JSXBinding): JSX.Element => {
    return (
        <>
            <span>label:</span>
            <div
                style={{ background: 'lightgrey' }}
                contentEditable={!props.disabled}
                onInput={(e) => props.onChange(e.currentTarget.textContent)}
                onBlur={(e) => props.onBlur(e.currentTarget.textContent)}
            >
                {props.defaultValue}
            </div>
            is disabled: {JSON.stringify(props.disabled)}
            <hr />
        </>
    );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FormNative = (_formModel?: FormModel): JSX.Element => {
    const form = useForm(formModel);

    const log = (): void => {
        console.clear();
        console.table(form);
    };

    return (
        <div>
            <CustomInput {...form.bind('customInput')} />
            <label htmlFor="1">
                first name
                <br />
                <input id="1" type="text" {...form.bind('firstName')} />
            </label>

            <hr />

            <label htmlFor="2">
                last name
                <br />
                <input id="2" {...form.bind('lastName')} />
            </label>

            <hr />

            <label htmlFor="cellphone">
                cellphone
                <br />
                <input id="cellphone" {...form.bind('cellphone')} />
            </label>

            <hr />

            <label htmlFor="inputNumber">
                price
                <br />
                <input type="number" id="inputNumber" {...form.bind('price')} />
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
