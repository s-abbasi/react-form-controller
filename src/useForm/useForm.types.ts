import { ChangeEvent, HTMLAttributes } from 'react';

export type DefaultValue = HTMLAttributes<HTMLInputElement>['defaultValue'];
export type DefaultChecked = HTMLAttributes<HTMLInputElement>['defaultChecked'];
export type ControlPrimitiveValue = DefaultValue | boolean | File;

type ValidatorName = 'min' | 'max' | 'minlength' | 'maxlength' | 'required';

export type Validator = {
    name: ValidatorName;
    validateWith: (value: ControlPrimitiveValue) => boolean;
    message?: string;
};

export type ModelNormalizerReducerCallback = (
    prev: Required<ControlObjectModel>,
    curr: [string, ControlObjectModel | ControlPrimitiveValue]
) => Required<ControlObjectModel>;

export type ControlObjectModel = {
    initialValue: ControlPrimitiveValue;
    validators?: Validator[];
    disabled?: boolean | string | string[];
    adapter?: unknown;
};

export type FormModel = Record<string, ControlObjectModel | ControlPrimitiveValue>;
export type NormalizedModel = Record<string, Required<ControlObjectModel>>;

export type ControlError = {
    [key in ValidatorName]: Validator['message'];
};

export type Adapter = {
    setValue: (e: unknown) => void;
    setAsTouched: () => void;
    disabled: boolean;
    isValid: boolean;
    errors: ControlError;
    initialValue: ControlPrimitiveValue;
};

export type FormChangeEvent =
    | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | string>
    | null
    | string;

export type JSXBinding = {
    defaultValue?: DefaultValue;
    defaultChecked?: DefaultChecked;
    onChange: (ev: FormChangeEvent) => void;
    onBlur: (ev: FormChangeEvent) => void;
    disabled: boolean;
    // use infer in ref
    // ref: ReturnType<addToRef>;
};

export type OnControlValueChange = ReturnType<GenerateBinding>['onControlValueChange'];
export type OnControlBlur = ReturnType<GenerateBinding>['onControlBlurEvent'];

export type Bind = (controlName: string) => JSXBinding;

export type GenerateBinding = (
    model: NormalizedModel,
    controls: Controls
) => {
    bind: Bind;
    onControlValueChange: (fn: ChangeObserver) => void;
    onControlBlurEvent: (fn: BlurObserver) => void;
};

export type ChangeObserver = (ev: {
    controlName: string;
    value: ControlPrimitiveValue;
}) => unknown;

export type BlurObserver = (ev: { controlName: string }) => unknown;

export type GenerateNativeBinding = (
    onChangeObservers: ChangeObserver[],
    onBlurObservers: BlurObserver[],
    control: Required<ControlObjectModel>,
    controlName: string,
    controls: Controls
) => JSXBinding;

// type CtrlAddRemoveResult = {
//     success: boolean;
//     message: string;
// }

export type ControlConvertor = (control: Required<ControlObjectModel>) => Control;

export type Controls = {
    [key: string]: Control;
};

export type Control = {
    value: ControlPrimitiveValue;
    isValid: boolean;
    errors: ControlError;
    isTouched: boolean; // gets blur event
    isDirty: boolean; // gets change event
    disable: () => void;
    enable: () => void;
    isDisabled: ControlObjectModel['disabled'];
    // rawValue: ControlPrimitiveValue;
    // setValue: (value: ValueType) => void;
    // reset: () => void;
    // addValidator: (validator: Validator) => void;
    // removeValidator: (name: Validator['name']) => void;
    // subscribe: (value: ValueType) => void;
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
