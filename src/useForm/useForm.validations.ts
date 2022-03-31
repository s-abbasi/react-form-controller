import { ControlObjectModel, ControlPrimitiveModel } from './useForm.types';

export const validate = (
    value: ControlPrimitiveModel,
    validators: ControlObjectModel['validators'] = []
): boolean => {
    return validators.every((validator) => validator.validateWith(value));
};
