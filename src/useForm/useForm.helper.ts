import { ControlModel, NativeValueTypes } from './useForm.types';

export const isValueType = (
    controlValueType: NativeValueTypes | ControlModel
): controlValueType is NativeValueTypes => {
    return typeof controlValueType !== 'object';
};

export const setDefaultValue = (
    controlValueType: NativeValueTypes | ControlModel
): NativeValueTypes => {
    if (isValueType(controlValueType)) {
        return controlValueType;
    }
    return controlValueType.defaultValue;
};
