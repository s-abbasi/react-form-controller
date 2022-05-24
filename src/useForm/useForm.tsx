import { useMemo, useRef } from 'react';
import { generateFormGroup } from './composition/composition';
import { AddToRef, FormGroup, FormModel, SetRefValue } from './useForm.types';

type ControlRefs = {
    [key: string]: unknown;
};

export const useForm = (model: FormModel): Required<FormGroup> => {
    const refs = useRef<ControlRefs>({});

    const addToRef: AddToRef = (controlName, ref) => {
        refs.current[controlName] = ref;
    };

    const setRefValue: SetRefValue = (controlName, value) => {
        refs.current[controlName].value = value;
    };

    const formGroup = useMemo<Required<FormGroup>>(() => {
        return generateFormGroup(addToRef)(setRefValue)(model);
    }, [model]);

    return formGroup;
};
