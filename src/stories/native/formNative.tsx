/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useForm } from '../../useForm/useForm';
import { FormModel } from '../../useForm/useForm.types';
import { CustomInput } from './customInput';
import { formModel } from './form';
import { useForceUpdate } from '../../useForceUpdate/UseForceUpdate';
import { log } from '../../logger';
import { maxLength, minLength } from '../../useForm/validations';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FormNative = (_formModel?: FormModel): JSX.Element => {
    const form = useForm(formModel);

    form.controls.cellphone.subscribe((e) => {
        log('cellphone: ', e);
    });
    form.controls.cellphone.subscribe((e) => {
        log('cellphone2: ', e);
    });
    form.controls.price.subscribe((e) => {
        log('price: ', e);
    });
    form.controls.materialTextField.subscribe((e) => {
        log('materialTextField: ', e);
    });
    form.controls.customInput.subscribe((e) => {
        log('customInput: ', e);
    });
    form.controls.firstName.subscribe((e) => {
        log('firstName: ', e);
    });
    form.controls.lastName.subscribe((e) => {
        log('lastName: ', e);
    });
    form.controls.contact.subscribe((e) => {
        log('contact: ', e);
    });
    form.controls.single.subscribe((e) => {
        log('single: ', e);
    });
    form.controls.image.subscribe((e) => {
        log('image: ', e);
    });
    form.controls.description.subscribe((e) => {
        log('description: ', e);
    });

    const rerender = useForceUpdate();

    const logForm = (): void => {
        console.clear();
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
            <CustomInput {...form.bind('customInput')} />
            <hr />
            <label>
                category
                <br />
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
            <button
                type="button"
                onClick={() => form.controls.category.setValue('goldfish')}
            >
                setValue(goldfish)
            </button>
            <hr />
            <label htmlFor="1">
                first name
                <br />
                <input id="1" type="text" {...form.bind('firstName')} />
            </label>
            <button
                type="button"
                onClick={() => {
                    form.controls.firstName.addValidator(minLength(7));
                }}
            >
                add minLength(7) validator
            </button>
            <button
                type="button"
                onClick={() => {
                    form.controls.firstName.reset();
                }}
            >
                reset()
            </button>
            <hr />
            <label htmlFor="2">
                last name
                <br />
                <input id="2" {...form.bind('lastName')} />
            </label>
            <button
                type="button"
                onClick={() => {
                    form.controls.lastName.setValue('kave');
                }}
            >
                setValue(kave)
            </button>
            <button
                type="button"
                onClick={() => {
                    form.controls.lastName.addValidator(maxLength(10));
                }}
            >
                add maxLength(10) validator
            </button>
            <hr />
            <label htmlFor="cellphone">
                cellphone
                <br />
                <input id="cellphone" {...form.bind('cellphone')} />
            </label>
            <button
                type="button"
                onClick={() => form.controls.cellphone.setValue('09136868075')}
            >
                setValue to 09136868075
            </button>
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
