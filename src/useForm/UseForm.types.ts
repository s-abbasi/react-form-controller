export interface Validations {
    name: string;
    errorMessage: string;
    validateWith: (value: ValueTypes) => boolean;
}

export interface ControlError {
    name: string;
    message: string;
}

export interface Field<T> {
    initialValue: T;
    disable?: boolean;
    validations?: Validations[];
}

export type ValueTypes = string | number | boolean | ArrayBuffer | null | undefined;

export interface Form {
    [key: string | number]: Field<ValueTypes>;
}

export type HTMLInputTypes = HTMLInputElement | HTMLSelectElement | null;

export interface JSXProp {
    jsx: {
        ref: (el: HTMLInputTypes) => void;
    };
    value: ValueTypes;
    disable: boolean;
    isValid?: boolean;
    errors: ControlError[];
}

export type Ref = NonNullable<HTMLInputTypes>;

export type InputTypes = 'text' | 'number' | 'checkbox' | 'radio' | 'select-one' | 'file';

export type GetInputType = (el: NonNullable<HTMLInputTypes>) => {
    type: InputTypes;
    el: NonNullable<HTMLInputTypes>;
};

export interface UseForm {
    [key: keyof Form]: JSXProp;
}

export type Convertor = (fieldValue: Form[keyof Form], fieldName: keyof Form) => JSXProp;

export type AttachListenerToEl = (obj: JSXProp) => (el: {
    el: NonNullable<HTMLInputTypes>;
    type: InputTypes;
}) => {
    type: InputTypes;
    el: NonNullable<HTMLInputTypes>;
};

export type SetInitialValue = (
    fieldValue: Form[keyof Form]
) => (el: NonNullable<HTMLInputTypes>) => void;

export type UseFormPropsFields = Form[keyof Form];

export type Validate = (
    obj: JSXProp,
    validations: Field<unknown>['validations']
) => (obj: {
    el: NonNullable<HTMLInputTypes>;
    type: InputTypes;
}) => NonNullable<HTMLInputTypes>;
