export interface Field<T> {
    initialValue: T;
}

export interface Form {
    [key: string | number]: Field<string | number | boolean>;
}

export type ElRef = HTMLInputElement | null;

export interface JSXProp {
    jsx: {
        ref: (el: ElRef) => void;
    };
}

export interface UseForm {
    [key: keyof Form]: JSXProp;
}

export interface JSXRef {
    fieldName: keyof Form;
    ref: ElRef;
}

export type UseFormPropsFields = Form[keyof Form];
