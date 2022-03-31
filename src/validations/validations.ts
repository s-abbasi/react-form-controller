import { ControlPrimitiveModel, Validator } from '../useForm/useForm.types';

export const min = (minValue: number, message?: string): Validator => {
    return {
        name: 'min',
        validateWith: (value: ControlPrimitiveModel) => {
            if (typeof value === 'number') {
                return value >= minValue;
            }
            if (typeof value === 'string' && Number(value)) {
                return Number(value) >= minValue;
            }
            // console.error(`input value is of type ${typeof value}.`);
            return false;
        },
        message: message || `value must be equal or grater than ${minValue}`,
    };
};
