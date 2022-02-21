import {
    ControlError,
    Field,
    HTMLInputTypes,
    JSXProp,
    Validations,
    ValueTypes,
} from '../useForm/UseForm.types';

export const validate = (
    obj: JSXProp,
    validations: Field<unknown>['validations'] = []
) => {
    return (el: NonNullable<HTMLInputTypes>): NonNullable<HTMLInputTypes> => {
        el.addEventListener('input', (e) => {
            const { value } = e.target as HTMLInputElement;

            const isValid = validations.some((validation) =>
                validation.validateWith(value)
            );

            const errors: ControlError[] = validations
                .filter((validation) => !validation.validateWith(value))
                .map((validation) => ({
                    name: validation.name,
                    message: validation.errorMessage,
                }));

            obj.errors = errors;
            obj.isValid = isValid;
        });
        return el;
    };
};

export const minLength = (n: number, options?: { errorMessage: string }): Validations => {
    return {
        name: 'minLength',
        validateWith: (value: ValueTypes) => (value as string).length > n,
        errorMessage: options?.errorMessage || `value length should be more than ${n}`,
    };
};

export const maxLength = (n: number, options?: { errorMessage: string }): Validations => {
    return {
        name: 'maxLength',
        validateWith: (value: ValueTypes) => (value as string).length < n,
        errorMessage: options?.errorMessage || `value length should be less than ${n}`,
    };
};
