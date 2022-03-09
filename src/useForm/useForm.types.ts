export type ValueType = string | number | boolean;

type ValidatorName = 'minValue' | 'maxValue' | 'minLength' | 'maxLength' | string;

interface Validator {
    name: ValidatorName;
    validateWith: (value: ValueType) => boolean;
    message?: string;
}

export interface ControlModel {
    defaultValue: ValueType;
    validators?: Validator[];
}

export interface FormModel {
    [key: string | number]: ValueType | ControlModel;
}

interface ControlError {
    name: ValidatorName;
    message: Validator['message'];
}

interface Control {
    value: ValueType;
    setValue: (value: ValueType) => void;
    isValid: boolean;
    isEnabled: boolean;
    errors: ControlError;
    reset: () => void;
    addValidator: (validator: Validator) => void;
    removeValidator: (name: Validator['name']) => void;
    subscribe: (value: ValueType) => void;
    enable: () => boolean;
    disable: () => boolean;
    dirty: boolean; // gets change event
    touched: boolean; // gets blur event
}

interface CtrlAddRemoveResult {
    success: boolean;
    message: string;
}

export type FormGroup<T> = {
    [Property in keyof T]: Control;
} & {
    [key: string]: Control;
} & {
    addControl: (validator: Validator) => CtrlAddRemoveResult;
    removeControl: (validatorName: ValidatorName) => CtrlAddRemoveResult;
    validate: () => void;
    isTouchedAndValid: boolean;
};
