/* eslint-disable no-console */
import { mapObjIndexed } from 'ramda';
import { ChangeEvent } from 'react';
import { setDefaultChecked, getDefaultValue } from './useForm.helper';
import {
    ControlConvertor,
    ControlModel,
    DefaultValue,
    FormGroup,
    FormModel,
    GenerateBinding,
    JSXBinding,
    Observer,
} from './useForm.types';

const getValueBasedOnType = ({ target }: ChangeEvent<HTMLInputElement>): DefaultValue => {
    const isCheckbox = target.type === 'checkbox';
    // const isRadio = target.type === 'radio';

    const targetValue = isCheckbox ? target.checked : target.value;

    return targetValue;
};

const generateJSXValueAttribute = (
    value: unknown,
    control: DefaultValue | ControlModel
): unknown => {
    const valueIsBoolean = typeof value === 'boolean';

    if (valueIsBoolean) {
        return { defaultChecked: setDefaultChecked(control) };
    }
    return { defaultValue: value };
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

const controlConvertor: ControlConvertor = (value) => {
    return {
        value: getDefaultValue(value),
    };
};

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
