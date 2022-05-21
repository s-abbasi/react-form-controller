import { NormalizedModel, FormGroup } from './useForm.types';

export type ConvertModelToControls = (model: NormalizedModel) => {
    formGroup: FormGroup;
    model: NormalizedModel;
};

export type AddControlsToFormGroup = (obj: ReturnType<ConvertModelToControls>) => (
    obj: ReturnType<ConvertModelToControls>
) => {
    formGroup: FormGroup;
    model: ReturnType<ConvertModelToControls>['model'];
};

export type AddBindToFormGroup = (
    obj: ReturnType<ReturnType<AddControlsToFormGroup>>
) => FormGroup;
