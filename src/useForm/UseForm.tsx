import { map } from 'ramda';
import { ChangeEvent } from 'react';
import { Form, JSXProp, UseForm } from './UseForm.types';

const generateJSX = (form: Form): UseForm => {
    const convertor = (value: Form[keyof Form]): JSXProp => {
        const obj = {
            jsx: {
                defaultValue: value.initialValue,
                onChange(e: ChangeEvent<HTMLInputElement>) {
                    (this as unknown as typeof obj).value = e.target.value;
                },
            },
            value: value.initialValue,
        };
        obj.jsx.onChange = obj.jsx.onChange.bind(obj);
        return obj;
    };

    return map(convertor, form);
};

export const useForm = (form: Form): UseForm => generateJSX(form);
