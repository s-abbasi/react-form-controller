/* eslint-disable react/button-has-type */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useForm } from '../../useForm/useForm';
import { FormModel } from '../../useForm/useForm.types';
// import { CustomInput } from './customInput';
import { formModel } from './form';
import { useForceUpdate } from '../../useForceUpdate/UseForceUpdate';
import { log } from '../../logger';
import { ControlDetail } from './controlDetail/controlDetail';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FormNative = (_formModel?: FormModel): JSX.Element => {
    const form = useForm(formModel);

    const rerender = useForceUpdate();

    const logForm = (): void => {
        console.table(form.controls, [
            'value',
            'isValid',
            'isTouched',
            'isDirty',
            'isDisabled',
        ]);
        console.table(form, ['isValid', 'isDirty', 'isTouched']);
        log(form);
    };

    useEffect(() => {
        logForm();
    }, []);

    const disableMUI = (): void => {
        form.controls.materialTextField.disable();
    };

    const enableMUI = (): void => {
        form.controls.materialTextField.enable();
    };

    const [jsx, setJsx] = useState();
    const [radioJsx, setRadioJsx] = useState();

    const addControl = (): void => {
        const controls = {
            newControl: {
                initialValue: 'newControl initialValue',
                disabled: false,
            },
        };
        form.add(controls);

        const x = (
            <>
                <label htmlFor="9">
                    <br />
                    <input id="9" {...form.bind('newControl')} />
                </label>
                <hr />
            </>
        );
        setJsx(x);

        form.controls.newControl.subscribe(() => {
            log('newControl');
        });
    };
    const addRadioControl = (): void => {
        const controls = {
            newRadioControl: {
                initialValue: 'cow',
            },
        };
        form.add(controls);

        const jsxValue = (
            <div>
                <br />
                <label htmlFor="cat">
                    Cat
                    <input
                        {...form.bind('newRadioControl')}
                        type="radio"
                        name="radio2"
                        id="cat"
                        defaultValue="cat"
                    />
                </label>
                <br />
                <label htmlFor="cow">
                    Cow
                    <input
                        {...form.bind('newRadioControl')}
                        type="radio"
                        name="radio2"
                        id="cow"
                        defaultValue="cow"
                    />
                </label>
            </div>
        );
        setRadioJsx(jsxValue);

        form.controls.newRadioControl.subscribe((e) => {
            log('newRadioControl', e);
        });
    };

    return (
        <div>
            {jsx}
            <TextField
                {...form.bind('materialTextField')}
                id="filled-basic"
                label="material text field"
                variant="filled"
            />
            <hr />
            {/* <CustomInput {...form.bind('customInput')} /> */}
            <hr />
            <label>
                category
                <select name="pets" {...form.bind('category')}>
                    <option value="">--Please choose an option--</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="hamster">Hamster</option>
                    <option value="parrot">Parrot</option>
                    <option value="spider">Spider</option>
                    <option value="goldfish">Goldfish</option>
                    <option value="sale">Sale</option>
                </select>
            </label>
            <ControlDetail control={form.controls.category} setValueInput="hamster" />
            <hr />
            <label>
                first name
                <input type="text" {...form.bind('firstName')} />
            </label>
            <ControlDetail control={form.controls.firstName} setValueInput="sara" />
            <hr />
            <label>
                lastName
                <br />
                <input type="text" {...form.bind('lastName')} />
            </label>
            <ControlDetail control={form.controls.lastName} setValueInput="abbasi" />
            <hr />
            <label htmlFor="cellphone">
                cellphone
                <input id="cellphone" {...form.bind('cellphone2')} />
            </label>
            <ControlDetail control={form.controls.cellphone2} setValueInput="868075" />
            <hr />
            <label htmlFor="inputNumber">
                price
                <input type="number" id="inputNumber" {...form.bind('price')} />
            </label>
            <ControlDetail control={form.controls.price} setValueInput="56000" />
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
            {radioJsx}
            <ControlDetail control={form.controls.contact} setValueInput="email" />
            <hr />
            <label htmlFor="chb">
                single
                <input id="chb" type="checkbox" {...form.bind('single')} />
            </label>
            <ControlDetail control={form.controls.single} setValueInput={false} />
            <hr />
            <label htmlFor="textarea">
                textarea:
                <br />
                <textarea id="textarea" {...form.bind('description')} />
            </label>
            <ControlDetail control={form.controls.description} setValueInput="a desc" />
            <hr />
            <label htmlFor="file">
                file:
                <br />
                <input type="file" id="file" {...form.bind('image')} />
            </label>
            <ControlDetail control={form.controls.image} setValueInput="" />
            <button type="button" onClick={logForm}>
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
            <button type="button" onClick={addControl}>
                add control
            </button>
            <button type="button" onClick={() => form.reset()}>
                form.reset()
            </button>
        </div>
    );
};

// form.controls.category.subscribe((e) => {
//     log('category: ', e);
// });
// form.controls.cellphone2.subscribe((e) => {
//     log('cellphone: ', e);
// });
// form.controls.cellphone2.subscribe((e) => {
//     log('cellphone2: ', e);
// });
// form.controls.price.subscribe((e) => {
//     log('price: ', e);
// });
// form.controls.materialTextField.subscribe((e) => {
//     log('materialTextField: ', e);
// });
// form.controls.customInput.subscribe((e) => {
//     log('customInput: ', e);
// });
// form.controls.firstName.subscribe((e) => {
//     log('firstName: ', e);
// });
// form.controls.lastName.subscribe((e) => {
//     log('lastName: ', e);
// });
// form.controls.contact.subscribe((e) => {
//     log('contact: ', e);
// });
// form.controls.single.subscribe((e) => {
//     log('single: ', e);
// });
// form.controls.image.subscribe((e) => {
//     log('image: ', e);
// });
// form.controls.description.subscribe((e) => {
//     log('description: ', e);
// });
