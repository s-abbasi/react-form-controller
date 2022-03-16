import { ChangeEvent, HTMLAttributes } from 'react';

export type NativeValueTypes = HTMLAttributes<HTMLInputElement>['defaultValue'];

type ValidatorName = 'minValue' | 'maxValue' | 'minLength' | 'maxLength' | string;

interface Validator {
    name: ValidatorName;
    validateWith: (value: NativeValueTypes) => boolean;
    message?: string;
}

export interface ControlModel {
    defaultValue: NativeValueTypes;
    validators?: Validator[];
}

export type FormModel = Record<string, NativeValueTypes | ControlModel>;

// interface ControlError {
//     name: ValidatorName;
//     message: Validator['message'];
// }

export interface JSXBinding {
    onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
    defaultValue: NativeValueTypes;
}

type Bind = (controlName: string) => JSXBinding;

export type GenerateBinding = (model: FormModel) => {
    bind: Bind;
    onFormChange: (fn: Observer) => void;
};

export type Observer = (ev: { controlName: string; value: NativeValueTypes }) => unknown;

// interface CtrlAddRemoveResult {
//     success: boolean;
//     message: string;
// }

export type ControlConvertor = (
    value: NativeValueTypes | ControlModel,
    key: string
) => { value: NativeValueTypes };

export interface Controls {
    [key: string]: Control;
}

export interface Control {
    value: NativeValueTypes;
    // setValue: (value: ValueType) => void;
    // isValid: boolean;
    // isEnabled: boolean;
    // errors: ControlError;
    // reset: () => void;
    // addValidator: (validator: Validator) => void;
    // removeValidator: (name: Validator['name']) => void;
    // subscribe: (value: ValueType) => void;
    // enable: () => boolean;
    // disable: () => boolean;
    // isDirty: boolean; // gets change event
    // isTouched: boolean; // gets blur event
}

export type FormGroup = {
    [key: string]: Control;
} & {
    bind: Bind;
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
