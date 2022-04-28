/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
import { mapObjIndexed } from 'ramda';
import {
    getDefaultValue,
    generateControlInitialState,
    generateControlErrors,
    generateJSXValueAttribute,
    getValueBasedOnType,
} from './useForm.helper';
import {
    Bind,
    ControlObjectModel,
    FormGroup,
    FormModel,
    GenerateBinding,
    JSXBinding,
    Observer,
    OnControlValueChange,
} from './useForm.types';
import {
    generateControlIsValidProp,
    generateFormGroupIsValidProp,
} from './useForm.validations';

const generateBinding: GenerateBinding = (model) => {
    const onChangeObservers: Observer[] = [];
    const onBlurObservers: Observer[] = [];

    const bind: ReturnType<GenerateBinding>['bind'] = (controlName) => {
        const jsx: JSXBinding = {
            onChange: (e) => {
                // why? native inputs send "object" as e, custom inputs send "primitives"
                const value = typeof e === 'object' ? getValueBasedOnType(e) : e;
                const arg = { controlName, value };
                onChangeObservers[0](arg);
            },
            onBlur: (e) => {
                const arg = { controlName, value: e };
                onBlurObservers[0](arg);
            },
            disabled: model[controlName]?.disabled,
        };
        const JSXValueAttribute = generateJSXValueAttribute(
            getDefaultValue(model[controlName]),
            model[controlName]
        );
        Object.assign(jsx, JSXValueAttribute);
        return jsx;
    };

    const onControlValueChange: OnControlValueChange = (fn) => onChangeObservers.push(fn);
    const onControlBlurEvent: OnControlValueChange = (fn) => onBlurObservers.push(fn);

    return { bind, onControlValueChange, onControlBlurEvent };
};

const proxyHandler = {};

export const useForm = (model: FormModel): FormGroup => {
    const { bind, onControlValueChange, onControlBlurEvent } = generateBinding(model);
    const controls = mapObjIndexed(generateControlInitialState, model);

    onControlBlurEvent(({ controlName, value }): void => {
        formGroup[controlName].isTouched = true;
    });

    onControlValueChange(({ controlName, value }): void => {
        const validators = (model[controlName] as ControlObjectModel)?.validators;
        // WARNING: this block mutates formGroup
        formGroup[controlName].value = value;
        formGroup[controlName].isValid = generateControlIsValidProp(value, validators);
        formGroup[controlName].errors = generateControlErrors(value, validators);
        formGroup.isValid = generateFormGroupIsValidProp(controls);
    });

    // @ts-expect-error
    const formGroup: FormGroup = {
        bind,
        isValid: generateFormGroupIsValidProp(controls),
        ...controls,
    };

    return new Proxy(formGroup, proxyHandler);
};
