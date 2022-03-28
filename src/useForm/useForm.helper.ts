import { ControlConvertor, ControlModel, DefaultValue } from './useForm.types';

export const isValueType = (
    controlValueType: DefaultValue | ControlModel
): controlValueType is DefaultValue => {
    return typeof controlValueType !== 'object';
};

export const getDefaultValue = (
    controlValueType: DefaultValue | ControlModel
): DefaultValue => {
    if (isValueType(controlValueType)) {
        return controlValueType;
    }
    return controlValueType.defaultValue;
};

export const setDefaultChecked = (
    controlValueType: DefaultValue | ControlModel
): boolean | undefined => {
    const value = getDefaultValue(controlValueType);
    const valueIsBoolean = typeof value === 'boolean';
    return valueIsBoolean ? value : undefined;
};
export const generateJSXValueAttribute = (
    value: unknown,
    control: DefaultValue | ControlModel
): unknown => {
    const valueIsBoolean = typeof value === 'boolean';

    if (valueIsBoolean) {
        return { defaultChecked: setDefaultChecked(control) };
    }
    return { defaultValue: value };
};

export const controlConvertor: ControlConvertor = (value) => {
    return {
        value: getDefaultValue(value),
    };
};
