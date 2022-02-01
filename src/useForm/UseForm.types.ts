import { ChangeEvent } from 'react';

export interface Field<T> {
    initialValue: T;
}

type ValueTypes = string | number;

export interface Form {
    [key: string | number]: Field<ValueTypes>;
}

export type ElRef = HTMLInputElement | null;

export interface JSXProp {
    jsx: {
        // ref: (el: ElRef) => void;
        defaultValue: ValueTypes;
        onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    };
    value: ValueTypes;
}

export interface UseForm {
    [key: keyof Form]: JSXProp;
}

export interface JSXRef {
    fieldName: keyof Form;
    ref: ElRef;
}

export type UseFormPropsFields = Form[keyof Form];
