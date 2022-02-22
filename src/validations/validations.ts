import {
    ControlError,
    Field,
    InputTypes,
    Validate,
    ValueTypes,
} from '../useForm/UseForm.types';

export type GenerateErrors = (
    value: ValueTypes,
    validations: NonNullable<Field<unknown>['validations']>
) => ControlError[];

const generateErrors: GenerateErrors = (value, validations) =>
    validations
        .filter((validation) => !validation.validateWith(value))
        .map((validation) => ({
            name: validation.name,
            message: validation.errorMessage,
        }));

const normalizeValue = (ev: Event, type: InputTypes): ValueTypes => {
    if (type === 'checkbox') {
        return (ev.target as HTMLInputElement).checked;
    }
    return (ev.target as HTMLInputElement).value;
};

export const validate: Validate = (obj, validations = []) => {
    return ({ el, type }) => {
        el.addEventListener('input', (ev) => {
            const value = normalizeValue(ev, type);

            obj.isValid = validations.every(({ validateWith }) => validateWith(value));
            obj.errors = generateErrors(value, validations);
        });
        return el;
    };
};
