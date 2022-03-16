/* eslint-disable no-console */
import { mapObjIndexed } from 'ramda';
import { setDefaultChecked, getDefaultValue } from './useForm.helper';
import {
    ControlConvertor,
    FormGroup,
    FormModel,
    GenerateBinding,
    JSXBinding,
    Observer,
} from './useForm.types';

const generateBinding: GenerateBinding = (model) => {
    const observers: Observer[] = [];

    const bind: ReturnType<GenerateBinding>['bind'] = (controlName) => {
        const value = getDefaultValue(model[controlName]);
        const valueIsBoolean = typeof value === 'boolean';

        const obj: JSXBinding = {
            onChange: ({ target }) => {
                const isCheckbox = target.type === 'checkbox';
                const targetValue = isCheckbox ? target.checked : target.value;
                const arg = { controlName, value: targetValue };
                observers[0](arg);
            },
        };

        if (valueIsBoolean) {
            Object.assign(obj, { defaultChecked: setDefaultChecked(model[controlName]) });
        } else {
            Object.assign(obj, { defaultValue: value });
        }

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
