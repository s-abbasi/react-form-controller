export interface Field<T> {
    initialValue: T;
}

export type ValueTypes = string | number | boolean;

export interface Form {
    [key: string | number]: Field<ValueTypes>;
}

export interface JSXProp {
    jsx: {
        ref: (el: HTMLInputElement) => void;
    };
}

export interface Ref {
    key: keyof Form;
    ref: HTMLInputElement;
}

export type InputTypes = 'text' | 'number' | 'checkbox';

export type GetInputType = (el: HTMLInputElement) => {
    type: InputTypes;
    el: HTMLInputElement;
};

export interface UseForm {
    [key: keyof Form]: JSXProp;
}

export type Convertor = (fieldValue: Form[keyof Form], fieldName: keyof Form) => JSXProp;
export interface JSXRef {
    fieldName: keyof Form;
    ref: HTMLInputElement;
}

export type SetInitialValue = (
    initialValue: ValueTypes
) => (el: HTMLInputElement) => void;

export type UseFormPropsFields = Form[keyof Form];
