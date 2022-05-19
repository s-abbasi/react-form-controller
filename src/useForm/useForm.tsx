import { log } from '../logger';
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
    log('hook re-render');
    return generateFormGroup(baseFormGroup)(model);
};
