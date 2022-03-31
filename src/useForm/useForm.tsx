/* eslint-disable no-console */
import { mapObjIndexed } from 'ramda';
import {
    getDefaultValue,
    generateJSXValueAttribute,
    controlGenerator,
    getValueBasedOnType,
} from './useForm.helper';
import {
    ControlObjectModel,
    FormGroup,
    FormModel,
    GenerateBinding,
    JSXBinding,
    Observer,
} from './useForm.types';
import { validate } from './useForm.validations';

const generateBinding: GenerateBinding = (model) => {
    const observers: Observer[] = [];

    const bind: ReturnType<GenerateBinding>['bind'] = (controlName) => {
        const jsx: JSXBinding = {
            onChange: (ev) => {
                const arg = { controlName, value: getValueBasedOnType(ev) };
                observers[0](arg);
            },
        };

        const JSXValueAttribute = generateJSXValueAttribute(
            getDefaultValue(model[controlName]),
            model[controlName]
        );

        Object.assign(jsx, JSXValueAttribute);

        return jsx;
    };

    const onControlValueChange: ReturnType<GenerateBinding>['onControlValueChange'] = (
        fn
    ) => {
        observers.push(fn);
    };

    return { bind, onControlValueChange };
};

const proxyHandler = {};

export const useForm = (model: FormModel): FormGroup => {
    const { bind, onControlValueChange } = generateBinding(model);
    const controls = mapObjIndexed(controlGenerator, model);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const formGroup: FormGroup = { bind, ...controls };

    onControlValueChange(({ controlName, value }): void => {
        const validators = (model[controlName] as ControlObjectModel)?.validators;

        // WARNING: this block mutates formGroup
        formGroup[controlName].value = value;
        formGroup[controlName].isValid = validate(value, validators);
        //
    });

    return new Proxy(formGroup, proxyHandler);
};
