import { Validations, ValueTypes } from '../useForm/UseForm.types';

export const minLength = (n: number, options?: { errorMessage: string }): Validations => {
    return {
        name: 'minLength',
        validateWith: (value: ValueTypes) => (value as string).length > n,
        errorMessage: options?.errorMessage || `value length should be more than ${n}`,
    };
};
