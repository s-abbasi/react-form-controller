import { NormalizedModel, Controls, FormGroup } from './useForm.types';

export type ConvertModelToControls = (model: NormalizedModel) => {
    controls: Controls;
    model: NormalizedModel;
};

export type AddControlsToFormGroup = (formGroup: FormGroup) => (
    obj: ReturnType<ConvertModelToControls>
) => {
    formGroup: FormGroup;
    model: ReturnType<ConvertModelToControls>['model'];
};

export type AddBindToFormGroup = (
    obj: ReturnType<ReturnType<AddControlsToFormGroup>>
) => FormGroup;
