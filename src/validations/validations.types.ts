import {
    ControlError,
    Form,
    HTMLInputTypes,
    InputTypes,
    JSXProp,
    Validations,
    ValueTypes,
} from '../useForm/UseForm.types';

export type Validate = (
    obj: JSXProp,
    fieldValue: Form[keyof Form]
) => (obj: {
    el: NonNullable<HTMLInputTypes>;
    type: InputTypes;
}) => NonNullable<HTMLInputTypes>;

export type GenerateErrors = (
    value: ValueTypes,
    validations: Validations[]
) => ControlError[];

export type ValidateAll = (value: ValueTypes, validations: Validations[]) => boolean;
