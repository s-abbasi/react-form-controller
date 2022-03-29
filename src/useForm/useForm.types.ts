import { ChangeEvent, HTMLAttributes } from 'react';

export type DefaultValue = HTMLAttributes<HTMLInputElement>['defaultValue'];
export type DefaultChecked = HTMLAttributes<HTMLInputElement>['defaultChecked'];
export type ControlValue = DefaultValue | boolean | File;

type ValidatorName = 'minValue' | 'maxValue' | 'minLength' | 'maxLength' | string;

interface Validator {
    name: ValidatorName;
    validateWith: (value: DefaultValue) => boolean;
    message?: string;
}

export interface ControlModel {
    defaultValue: DefaultValue;
    validators?: Validator[];
}

export type FormModel = Record<string, DefaultValue | ControlModel>;

// interface ControlError {
//     name: ValidatorName;
//     message: Validator['message'];
// }

export interface JSXBinding {
    defaultValue?: Exclude<DefaultValue, boolean>;
    defaultChecked?: DefaultChecked;
    onChange: (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

type Bind = (controlName: string) => JSXBinding;

export type GenerateBinding = (model: FormModel) => {
    bind: Bind;
    onFormChange: (fn: Observer) => void;
};

export type Observer = (ev: { controlName: string; value: ControlValue }) => unknown;

// interface CtrlAddRemoveResult {
//     success: boolean;
//     message: string;
// }

export type ControlConvertor = (
    value: DefaultValue | ControlModel,
    key: string
) => { value: DefaultValue };

export interface Controls {
    [key: string]: Control;
}

export interface Control {
    value: ControlValue;
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
