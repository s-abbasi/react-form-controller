export interface Field<T> {
    initialValue: T;
    disable?: boolean;
}

export type ValueTypes = string | number | boolean;

export interface Form {
    [key: string | number]: Field<ValueTypes>;
}

export interface JSXProp {
    jsx: {
        ref: (el: HTMLInputElement) => void;
    };
    value: ValueTypes;
    disable: boolean;
}

export interface Ref {
    key: keyof Form;
    ref: HTMLInputElement;
}

export type InputTypes = 'text' | 'number' | 'checkbox' | 'radio';

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

export type AttachListenerToEl = (
    obj: JSXProp
) => (el: { el: HTMLInputElement; type: InputTypes }) => HTMLInputElement;

export type SetInitialValue = (
    fieldValue: Form[keyof Form]
) => (el: HTMLInputElement) => void;

export type UseFormPropsFields = Form[keyof Form];
