import { ChangeEvent, HTMLAttributes } from 'react';

export type DefaultValue = HTMLAttributes<HTMLInputElement>['defaultValue'];
export type DefaultChecked = HTMLAttributes<HTMLInputElement>['defaultChecked'];
export type ControlPrimitiveModel = DefaultValue | boolean | File;

type ValidatorName = 'min' | 'max' | 'minlength' | 'maxlength' | string;

export type Validator = {
    name: ValidatorName;
    validateWith: (value: ControlPrimitiveModel) => boolean;
    message?: string;
};

export type ControlObjectModel = {
    defaultValue: ControlPrimitiveModel;
    validators?: Validator[];
};

export type FormModel = Record<string, ControlObjectModel | ControlPrimitiveModel>;

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
    value: ControlPrimitiveModel;
}) => unknown;

// type CtrlAddRemoveResult = {
//     success: boolean;
//     message: string;
// }

export type ControlConvertor = (
    control: ControlObjectModel | ControlPrimitiveModel
) => Control;

export type Controls = {
    [key: string]: Control;
};

export type Control = {
    value: ControlPrimitiveModel;
    isValid: boolean;
    errors: ControlError;
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
