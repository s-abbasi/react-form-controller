import { FormGroup } from '@react-form-controller/hook/useForm/useForm.types';
import css from './action.module.scss';

export const Detail = (formGroup: FormGroup): JSX.Element => {
    return (
        <div className={css.container}>
            <div className={css.boxTitle}>actions</div>
            <button
                id="disable-btn"
                onClick={() => formGroup.controls.firstName.disable()}
            >
                disable()
            </button>
            <button id="enable-btn" onClick={() => formGroup.controls.firstName.enable()}>
                enable()
            </button>
            <button
                id="set-value-btn"
                onClick={() => formGroup.controls.firstName.setValue('sara')}
            >
                setValue('sara')
            </button>
            <button id="reset-btn" onClick={() => formGroup.controls.firstName.reset()}>
                reset()
            </button>
            <button
                id="add-validator-btn"
                onClick={() => formGroup.controls.firstName.addValidator([])}
            >
                addValidator()
            </button>
            <button
                id="remove-validator-btn"
                onClick={() => formGroup.controls.firstName.addValidator([])}
            >
                removeValidator()
            </button>
        </div>
    );
};
