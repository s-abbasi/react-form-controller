import { InputTypes, ValueTypes } from '../useForm/UseForm.types';
import { GenerateErrors, Validate, ValidateAll } from './validations.types';

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

const validateAll: ValidateAll = (value, validations) => {
    // const validations: Validations[] = fieldValue.validations || [];
    return validations.every(({ validateWith }) => validateWith(value));
};

export const validate: Validate = (obj, fieldValue) => {
    const { initialValue, validations = [] } = fieldValue;

    obj.isValid = validateAll(initialValue, validations);
    obj.errors = generateErrors(initialValue, validations);

    return ({ el, type }) => {
        el.addEventListener('input', (ev) => {
            const value = normalizeValue(ev, type);

            obj.isValid = validateAll(value, validations);
            obj.errors = generateErrors(value, validations);
        });
        return el;
    };
};
