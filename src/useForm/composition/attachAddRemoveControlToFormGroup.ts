/* eslint-disable no-param-reassign */
import { FormGroup } from '../useForm.types';
import { generateFormGroup } from './composition';

export const attachAddRemoveControlToFormGroup =
    (addToRef) =>
    (setRefValue) =>
    (formGroup: Required<FormGroup>): Required<FormGroup> => {
        formGroup.add = (model) => {
            // TODO: guard against existing controls
            generateFormGroup(addToRef)(setRefValue)(model);
        };
        formGroup.remove = (controlName: string | string[]) => {
            const isTypeOfArray = Array.isArray(controlName);
            if (isTypeOfArray) {
                controlName.forEach((name) => delete formGroup.controls[name]);
            } else {
                delete formGroup.controls[controlName];
            }
        };
        return formGroup;
    };
