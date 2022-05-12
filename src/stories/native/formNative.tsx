/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
import { TextField } from '@mui/material';
import { useForm } from '../../useForm/useForm';
import { FormModel } from '../../useForm/useForm.types';
import { CustomInput } from './customInput';
import { formModel } from './form';
import { useForceUpdate } from '../../useForceUpdate/UseForceUpdate';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FormNative = (_formModel?: FormModel): JSX.Element => {
    const form = useForm(formModel);

    const rerender = useForceUpdate();

    const log = (): void => {
        console.clear();
        const formWithoutIsValid = { ...form };
        const excludedCols = ['disable', 'enable', 'errors'];
        // @ts-ignore
        delete formWithoutIsValid.isValid;
        const cols = Object.keys(form.firstName).filter(
            (col) => !excludedCols.includes(col)
        );
        console.table(formWithoutIsValid, cols);
        console.log('form: ', JSON.parse(JSON.stringify(form)));
    };

    const disableMUI = (): void => {
        form.materialTextField.disable();
    };

    const enableMUI = (): void => {
        form.materialTextField.enable();
    };

    return (
        <div>
            <TextField
                {...form.bind('materialTextField')}
                id="filled-basic"
                label="material text field"
                variant="filled"
            />
            <hr />
            <CustomInput {...form.bind('customInput')} />
            <hr />
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
            <button type="button" onClick={rerender}>
                re-render
            </button>
            <button type="button" onClick={disableMUI}>
                disable mui
            </button>
            <button type="button" onClick={enableMUI}>
                enable mui
            </button>
        </div>
    );
};
