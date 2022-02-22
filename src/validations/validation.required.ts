import { Validations, ValueTypes } from '../useForm/UseForm.types';

export const required = (options?: { errorMessage: string }): Validations => {
    return {
        name: 'required',
        validateWith: (value: ValueTypes) => {
            if (value) {
                return true;
            }
            return false;
        },
        errorMessage: options?.errorMessage || 'value is required',
    };
};
