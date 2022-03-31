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

export const max = (maxValue: number, message?: string): Validator => {
    return {
        name: 'max',
        validateWith: (value: ControlPrimitiveModel) => {
            if (typeof value === 'number') {
                return value <= maxValue;
            }
            if (typeof value === 'string' && Number(value)) {
                return Number(value) <= maxValue;
            }
            // console.error(`input value is of type ${typeof value}.`);
            return false;
        },
        message: message || `value must be equal or less than ${maxValue}`,
    };
};

export const maxlength = (maxValue: number, message?: string): Validator => {
    return {
        name: 'maxlength',
        validateWith: (value: ControlPrimitiveModel) => {
            if (typeof value === 'string') {
                return value.length <= maxValue;
            }
            console.error(`input value is of type ${typeof value}.`);
            return false;
        },
        message: message || `value length must be equal or less than ${maxValue}`,
    };
};

export const minlength = (minValue: number, message?: string): Validator => {
    return {
        name: 'minlength',
        validateWith: (value: ControlPrimitiveModel) => {
            if (typeof value === 'string') {
                return value.length >= minValue;
            }
            // console.error(`input value is of type ${typeof value}.`);
            return false;
        },
        message: message || `value length must be equal or greater than ${minValue}`,
    };
};
