import { ControlObjectModel, ControlPrimitiveValue } from './useForm.types';

export const validate = (
    value: ControlPrimitiveValue,
    validators: ControlObjectModel['validators'] = []
): boolean => {
    return validators.every((validator) => validator.validateWith(value));
};
