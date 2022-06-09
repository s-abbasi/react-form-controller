import { FormGroup } from '@react-form-controller/hook/useForm/useForm.types';
import css from './actions.module.scss';

type Prop = {
    form: FormGroup;
    controlName: string;
    setValueTo: string | boolean;
};

export const Actions = ({ form, controlName, setValueTo }: Prop): JSX.Element => {
    const control = form.controls[controlName];

    return (
        <div className={css.container}>
            <div className={css.boxTitle}>actions</div>
            <button id="disable-btn" onClick={() => control.disable()}>
                disable()
            </button>
            <button id="enable-btn" onClick={() => control.enable()}>
                enable()
            </button>
            <button id="set-value-btn" onClick={() => control.setValue(setValueTo)}>
                setValue({setValueTo})
            </button>
            <button id="reset-btn" onClick={() => control.reset()}>
                reset()
            </button>
            <button id="add-validator-btn" onClick={() => control.addValidator([])}>
                addValidator()
            </button>
            <button id="remove-validator-btn" onClick={() => control.addValidator([])}>
                removeValidator()
            </button>
        </div>
    );
};
