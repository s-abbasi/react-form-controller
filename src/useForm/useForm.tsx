import { useMemo } from 'react';
import { generateFormGroup } from './composition';
import { FormGroup, FormModel } from './useForm.types';

const baseFormGroup: FormGroup = {
    controls: {},
    bind: undefined,
    isValid: false,
    isTouched: false,
    isDirty: false,
    add: undefined,
    remove: undefined,
};

export const useForm = (model: FormModel): Required<FormGroup> => {
    const formGroup = useMemo<Required<FormGroup>>(() => {
        return generateFormGroup(baseFormGroup)(model);
    }, [model]);

    return formGroup;
};

// [√] - render hook only once
