import { Validations, ValueTypes } from '../useForm/UseForm.types';

export const maxLength = (n: number, options?: { errorMessage: string }): Validations => {
    return {
        name: 'maxLength',
        validateWith: (value: ValueTypes) => (value as string).length < n,
        errorMessage: options?.errorMessage || `value length should be less than ${n}`,
    };
};
