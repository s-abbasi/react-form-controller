/* eslint-disable @typescript-eslint/ban-ts-comment */
import { mapObjIndexed } from 'ramda';
import { useRef } from 'react';
import { generateNativeBinding } from './bindings';
import {
    generateControlInitialState,
    generateControlErrorsProp,
    normalizeFormModel,
} from './useForm.helper';
import {
    Bind,
    FormGroup,
    FormModel,
    GenerateBinding,
    ChangeObserver,
    OnControlValueChange,
    BlurObserver,
    OnControlBlur,
} from './useForm.types';
import {
    generateControlIsValidProp,
    generateFormGroupIsValidProp,
} from './useForm.validations';

const generateBinding: GenerateBinding = (normalizedModel, controls) => {
    const onChangeObservers: ChangeObserver[] = [];
    const onBlurObservers: BlurObserver[] = [];

    const onControlValueChange: OnControlValueChange = (fn) => onChangeObservers.push(fn);
    const onControlBlurEvent: OnControlBlur = (fn) => onBlurObservers.push(fn);

    const bind: Bind = (controlName) => {
        return generateNativeBinding(
            onChangeObservers,
            onBlurObservers,
            normalizedModel[controlName],
            controlName,
            controls
        );
    };

    return { bind, onControlValueChange, onControlBlurEvent };
};

const proxyHandler = {};

export const useForm = (model: FormModel): FormGroup => {
    const normalizedModel = normalizeFormModel(model);
    const controls = mapObjIndexed(generateControlInitialState, normalizedModel);
    // console.log('before passing to bind: ', controls.materialTextField);
    const binding = generateBinding(normalizedModel, controls);

    // @ts-expect-error
    const formGroup: FormGroup = {
        bind: binding.bind,
        isValid: generateFormGroupIsValidProp(controls),
        ...controls,
    };

    binding.onControlBlurEvent(({ controlName }): void => {
        formGroup[controlName].isTouched = true;
    });

    binding.onControlValueChange(({ controlName, value }): void => {
        const controlModel = normalizedModel[controlName];
        const control = formGroup[controlName];

        // WARNING: this block mutates formGroup
        control.value = value;
        control.isValid = generateControlIsValidProp(value, controlModel.validators);
        control.errors = generateControlErrorsProp(value, controlModel.validators);
        formGroup.isValid = generateFormGroupIsValidProp(controls);
    });

    const proxy = new Proxy(formGroup, proxyHandler);
    const ref = useRef(proxy);
    return ref.current;
};
