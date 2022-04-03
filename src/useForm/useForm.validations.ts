import { Control, ControlObjectModel, ControlPrimitiveValue } from './useForm.types';

export const generateControlIsValidProp = (
    value: ControlPrimitiveValue,
    validators: ControlObjectModel['validators'] = []
): boolean => {
    return validators.every((validator) => validator.validateWith(value));
};

export const generateFormGroupIsValidProp = (controls: {
    [key: string]: Control;
}): boolean => {
    return Object.entries(controls).every((control) => control[1].isValid);
};
