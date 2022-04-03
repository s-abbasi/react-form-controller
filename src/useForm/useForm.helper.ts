import { ChangeEvent } from 'react';
import {
    ControlConvertor,
    ControlError,
    ControlObjectModel,
    ControlPrimitiveValue,
    Validator,
} from './useForm.types';
import { generateControlIsValidProp } from './useForm.validations';

export const isTypeOfControlModel = (
    controlValueType: ControlPrimitiveValue | ControlObjectModel
): controlValueType is ControlObjectModel => {
    return typeof controlValueType === 'object';
};

export const getDefaultValue = (
    controlValueType: ControlPrimitiveValue | ControlObjectModel
): ControlPrimitiveValue => {
    if (isTypeOfControlModel(controlValueType)) {
        return controlValueType.defaultValue;
    }
    return controlValueType;
};

export const setDefaultChecked = (
    controlValueType: ControlPrimitiveValue | ControlObjectModel
): boolean | undefined => {
    const value = getDefaultValue(controlValueType);
    const valueIsBoolean = typeof value === 'boolean';
    return valueIsBoolean ? value : undefined;
};
export const generateJSXValueAttribute = (
    value: unknown,
    control: ControlPrimitiveValue | ControlObjectModel
): unknown => {
    const valueIsBoolean = typeof value === 'boolean';

    return valueIsBoolean
        ? { defaultChecked: setDefaultChecked(control) }
        : { defaultValue: value };
};

export const generateControlErrors = (
    value: ControlPrimitiveValue,
    validators: Validator[] = []
): ControlError => {
    return validators
        .filter((validator) => !validator.validateWith(value))
        .reduce((acc, curr) => ({ ...acc, [curr.name]: curr.message }), {});
};

export const generateControlInitialState: ControlConvertor = (controlModel) => {
    const defaultValue = getDefaultValue(controlModel);
    const validators = (controlModel as ControlObjectModel)?.validators;

    return {
        value: defaultValue,
        isValid: generateControlIsValidProp(defaultValue, validators),
        errors: generateControlErrors(defaultValue, validators),
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
