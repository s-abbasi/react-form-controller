import { compose } from 'ramda';
import { GenerateFormGroup } from '../useForm.types';
import { attachAddRemoveControlToFormGroup } from './attachAddRemoveControlToFormGroup';
import { attachBindToFormGroup } from './attachBindToFormGroup';
import { attachControlsToFormGroup } from './attachControlsToFormGroup';
import { normalizeModel } from './normalizeModel';

export const generateFormGroup: GenerateFormGroup = (addToRef) => (setRefValue) =>
    compose(
        attachAddRemoveControlToFormGroup(addToRef)(setRefValue),
        attachBindToFormGroup(addToRef),
        attachControlsToFormGroup(setRefValue),
        normalizeModel
    );
