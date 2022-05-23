/* eslint-disable no-param-reassign */
import { compose } from 'ramda';
import { GenerateFormGroup } from '../useForm.types';
import { attachAddRemoveControlToFormGroup } from './attachAddRemoveControlToFormGroup';
import { attachBindToFormGroup } from './attachBindToFormGroup';
import { attachControlsToFormGroup } from './attachControlsToFormGroup';
import { normalizeModel } from './normalizeModel';

export const generateFormGroup: GenerateFormGroup = compose(
    attachAddRemoveControlToFormGroup,
    attachBindToFormGroup,
    attachControlsToFormGroup,
    normalizeModel
);
