/* eslint-disable no-console */
import { mapObjIndexed } from 'ramda';
import { setDefaultValue } from './useForm.helper';
import {
    ControlConvertor,
    FormGroup,
    FormModel,
    GenerateBinding,
    Observer,
} from './useForm.types';

const generateBinding: GenerateBinding = (model) => {
    const observers: Observer[] = [];

    const bind: ReturnType<GenerateBinding>['bind'] = (controlName) => ({
        defaultValue: setDefaultValue(model[controlName]),
        onChange: (ev) => {
            const arg = { controlName, value: ev.target.value };
            observers[0](arg);
        },
    });

    const onFormChange: ReturnType<GenerateBinding>['onFormChange'] = (fn) => {
        observers.push(fn);
    };

    return { bind, onFormChange };
};

const proxyHandler = {};

const controlConvertor: ControlConvertor = (value) => {
    return {
        value: setDefaultValue(value),
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
