import { ChangeEvent } from 'react';
import {
    ControlConvertor,
    ControlObjectModel,
    ControlPrimitiveModel,
} from './useForm.types';
import { validate } from './useForm.validations';

export const isTypeOfControlModel = (
    controlValueType: ControlPrimitiveModel | ControlObjectModel
): controlValueType is ControlObjectModel => {
    return typeof controlValueType === 'object';
};

export const getDefaultValue = (
    controlValueType: ControlPrimitiveModel | ControlObjectModel
): ControlPrimitiveModel => {
    if (isTypeOfControlModel(controlValueType)) {
        return controlValueType.defaultValue;
    }
    return controlValueType;
};

export const setDefaultChecked = (
    controlValueType: ControlPrimitiveModel | ControlObjectModel
): boolean | undefined => {
    const value = getDefaultValue(controlValueType);
    const valueIsBoolean = typeof value === 'boolean';
    return valueIsBoolean ? value : undefined;
};
export const generateJSXValueAttribute = (
    value: unknown,
    control: ControlPrimitiveModel | ControlObjectModel
): unknown => {
    const valueIsBoolean = typeof value === 'boolean';

    return valueIsBoolean
        ? { defaultChecked: setDefaultChecked(control) }
        : { defaultValue: value };
};

export const controlGenerator: ControlConvertor = (controlModel) => {
    const defaultValue = getDefaultValue(controlModel);
    const validators = (controlModel as ControlObjectModel)?.validators;

    return {
        value: defaultValue,
        isValid: validate(defaultValue, validators),
    };
};

export const getValueBasedOnType = ({
    target,
}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): ControlPrimitiveModel => {
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
