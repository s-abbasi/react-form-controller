/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChangeEvent } from 'react';
import {
    ControlConvertor,
    ControlError,
    ControlObjectModel,
    ControlPrimitiveValue,
    FormModel,
    ModelNormalizerReducerCallback,
    NormalizedModel,
    Validator,
} from './useForm.types';
import { generateControlIsValidProp } from './useForm.validations';

export const normalizeFormModel = (model: FormModel): NormalizedModel => {
    const requiredPairs = {
        disabled: false,
        adapter: undefined,
        validators: [],
    };

    const reducerCallback: ModelNormalizerReducerCallback = (prev, [key, value]) => {
        if (typeof value !== 'object') {
            return {
                ...prev,
                [key]: { ...requiredPairs, initialValue: value },
            };
        }
        return {
            ...prev,
            [key]: { ...requiredPairs, ...value },
        };
    };

    // @ts-ignore
    return Object.entries(model).reduce(reducerCallback, {});
};

export const isTypeOfControlModel = (
    controlValueType: ControlPrimitiveValue | ControlObjectModel
): controlValueType is ControlObjectModel => {
    return typeof controlValueType === 'object';
};

export const setDefaultChecked = (
    controlValueType: ControlObjectModel
): boolean | undefined => {
    const valueIsBoolean = typeof controlValueType.initialValue === 'boolean';
    return valueIsBoolean ? (controlValueType.initialValue as boolean) : undefined;
};

export const generateJSXValueAttribute = (
    value: unknown,
    control: Required<ControlObjectModel>
): unknown => {
    const valueIsBoolean = typeof value === 'boolean';

    return valueIsBoolean
        ? { defaultChecked: setDefaultChecked(control) }
        : { defaultValue: value };
};

export const generateControlErrorsProp = (
    value: ControlPrimitiveValue,
    validators: Validator[] = []
): ControlError => {
    // @ts-ignore
    return validators
        .filter((validator) => !validator.validateWith(value))
        .reduce((acc, curr) => ({ ...acc, [curr.name]: curr.message }), {});
};

export const generateControlInitialState: ControlConvertor = (control) => {
    const { initialValue, validators, disabled } = control;

    return {
        value: initialValue,
        isValid: generateControlIsValidProp(initialValue, validators),
        errors: generateControlErrorsProp(initialValue, validators),
        isTouched: false,
        isDirty: false,
        isDisabled: disabled,
        disable() {
            this.isDisabled = true;
        },
        enable() {
            this.isDisabled = false;
        },
    };
};

export const getValueBasedOnType = ({
    target,
}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): ControlPrimitiveValue => {
    switch (target.type) {
        case 'checkbox':
            return (target as HTMLInputElement).checked;

        case 'radio':
            return (target as HTMLInputElement).value;

        case 'file':
            // eslint-disable-next-line no-case-declarations
            const { files } = target as HTMLInputElement;
            if (files) {
                return files[0];
            }
            console.warn('file input has returned undefined');
            return undefined;

        default:
            return target.value;
    }
};
