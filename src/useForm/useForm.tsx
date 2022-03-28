import { mapObjIndexed } from 'ramda';
import { ChangeEvent } from 'react';
import {
    getDefaultValue,
    generateJSXValueAttribute,
    controlConvertor,
} from './useForm.helper';
import {
    ControlValue,
    FormGroup,
    FormModel,
    GenerateBinding,
    JSXBinding,
    Observer,
} from './useForm.types';

const getValueBasedOnType = ({ target }: ChangeEvent<HTMLInputElement>): ControlValue => {
    switch (target.type) {
        case 'checkbox':
            return target.checked;

        case 'radio':
            return target.value;

        case 'file':
            if (target.files) {
                return target.files[0];
            }
            // eslint-disable-next-line no-console
            console.warn('file input has returned undefined');
            return undefined;

        default:
            return target.value;
    }
};

const generateBinding: GenerateBinding = (model) => {
    const observers: Observer[] = [];

    const bind: ReturnType<GenerateBinding>['bind'] = (controlName) => {
        const value = getDefaultValue(model[controlName]);

        const obj: JSXBinding = {
            onChange: (ev) => {
                const eventValue = getValueBasedOnType(ev);
                const arg = { controlName, value: eventValue };
                observers[0](arg);
            },
        };

        const JSXValueAttribute = generateJSXValueAttribute(value, model[controlName]);
        Object.assign(obj, JSXValueAttribute);

        return obj;
    };

    const onFormChange: ReturnType<GenerateBinding>['onFormChange'] = (fn) => {
        observers.push(fn);
    };

    return { bind, onFormChange };
};

const proxyHandler = {};

export const useForm = (model: FormModel): FormGroup => {
    const { bind, onFormChange } = generateBinding(model);
    const controls = mapObjIndexed(controlConvertor, model);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const formGroup: FormGroup = { bind, ...controls };

    onFormChange(({ controlName, value }): void => {
        formGroup[controlName].value = value; // WARNING: this line mutates formGroup
    });

    return new Proxy(formGroup, proxyHandler);
};
