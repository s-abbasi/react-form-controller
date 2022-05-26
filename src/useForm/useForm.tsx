/* eslint-disable no-param-reassign */

import { useEffect, useMemo, useRef } from 'react';
import { generateFormGroup } from './composition/composition';
import {
    AddToRef,
    ControlRefs,
    FormGroup,
    FormModel,
    SetRefValue,
    Controls,
    FilterByTypeRadio,
    SetAsInitialized,
    FilterNonInitialized,
    SetDefaultValue,
} from './useForm.types';

export const useForm = (model: FormModel): Required<FormGroup> => {
    const refs = useRef<ControlRefs>({});

    const addToRef: AddToRef = (controlName, ref) => {
        const key = ref.type === 'radio' ? `${controlName}#${ref.value}` : controlName;
        if (!refs.current[controlName]?.ref) {
            const obj = { ref, initializeValueSet: false };
            refs.current[key] = obj;
        } else {
            refs.current[key].ref = ref;
        }
    };

    const setRefValue: SetRefValue = (controlName, value) => {
        const key = `${controlName}#${value}`;
        refs.current[key].ref.value = value;
    };

    const formGroup = useMemo<Required<FormGroup>>(() => {
        return generateFormGroup(addToRef)(setRefValue)(model);
    }, [model]);

    const setRadioInitialCheckedState = (controls: Controls): void => {
        const filterByTypeRadio: FilterByTypeRadio = ([controlName, { ref }]) => {
            const key = controlName.split('#')[0];
            return ref.type === 'radio' && ref.value === controls[key].value;
        };

        const setAsInitialized: SetAsInitialized = (item) => {
            item[1].initializeValueSet = true;
            return item;
        };

        const filterNonInitialized: FilterNonInitialized = ([, { initializeValueSet }]) =>
            !initializeValueSet;

        const setDefaultValue: SetDefaultValue = ([, { ref }]) => {
            ref.defaultChecked = true;
        };

        Object.entries(refs.current)
            .filter(filterNonInitialized)
            .map(setAsInitialized)
            .filter(filterByTypeRadio)
            .forEach(setDefaultValue);
    };

    useEffect(() => {
        setRadioInitialCheckedState(formGroup.controls);
    }, [formGroup.controls]);

    return formGroup;
};
