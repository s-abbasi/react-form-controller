import { useMemo } from 'react';
import { generateFormGroup } from './composition';
import { FormGroup, FormModel } from './useForm.types';

export const useForm = (model: FormModel): Required<FormGroup> => {
    const formGroup = useMemo<Required<FormGroup>>(() => {
        return generateFormGroup(model);
    }, [model]);

    return formGroup;
};
