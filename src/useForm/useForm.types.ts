import { ChangeEvent, HTMLAttributes } from 'react';

export type DefaultValue = HTMLAttributes<HTMLInputElement>['defaultValue'];
export type DefaultChecked = HTMLAttributes<HTMLInputElement>['defaultChecked'];
export type ControlPrimitiveValue = DefaultValue | boolean | File;

type ValidatorName = 'min' | 'max' | 'minlength' | 'maxlength' | 'required' | string;

export type Validator = {
    name: ValidatorName;
    validateWith: (value: ControlPrimitiveValue) => boolean;
    message?: string;
};

export type ControlObjectModel = {
    initialValue: ControlPrimitiveValue;
    validators?: Validator[];
    disabled?: boolean;
};

export type FormModel = Record<string, ControlObjectModel | ControlPrimitiveValue>;

export type ControlError = {
    [key: ValidatorName]: Validator['message'];
};

export type JSXBinding = {
    defaultValue?: DefaultValue;
    defaultChecked?: DefaultChecked;
    onChange: (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

type Bind = (controlName: string) => JSXBinding;

export type GenerateBinding = (model: FormModel) => {
    bind: Bind;
    onControlValueChange: (fn: Observer) => void;
};

export type Observer = (ev: {
    controlName: string;
    value: ControlPrimitiveValue;
}) => unknown;

// type CtrlAddRemoveResult = {
//     success: boolean;
//     message: string;
// }

export type ControlConvertor = (
    control: ControlObjectModel | ControlPrimitiveValue
) => Control;

export type Controls = {
    [key: string]: Control;
};

export type Control = {
    value: ControlPrimitiveValue;
    isValid: boolean;
    errors: ControlError;
    // rawValue: ControlPrimitiveValue;
    // setValue: (value: ValueType) => void;
    // isEnabled: boolean;
    // reset: () => void;
    // addValidator: (validator: Validator) => void;
    // removeValidator: (name: Validator['name']) => void;
    // subscribe: (value: ValueType) => void;
    // enable: () => boolean;
    // disable: () => boolean;
    // isDirty: boolean; // gets change event
    // isTouched: boolean; // gets blur event
};

export type FormGroup = {
    [key: string]: Control;
} & {
    bind: Bind;
    isValid: boolean;
};

// export type FormGroup<T> = {
//     [Property in keyof T]: Control;
// } & {
//     [key: string]: Control;
// } & {
//     bind: Bind;
//     addControl: (validator: Validator) => CtrlAddRemoveResult;
//     removeControl: (validatorName: ValidatorName) => CtrlAddRemoveResult;
//     validate: () => void;
//     isTouchedAndValid: boolean;
// };