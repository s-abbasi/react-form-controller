import { useForm, required } from '@react-form-controller/hook';
import { RenderCounter } from '../render-counter/render-counter';
import { Result } from '../result/result';
import { Actions } from '../actions/actions';
import { InputContainer } from '../input-container/input-container';
import { FormModel } from '@react-form-controller/hook/useForm/useForm.types';

export const formModel: FormModel = {
    pet: {
        initialValue: 'dog',
        validators: [],
    },
};
export const Dropdown = (): JSX.Element => {
    const form = useForm(formModel);

    return (
        <div>
            <RenderCounter />
            <div>
                <p>DROPDOWN</p>
                <InputContainer>
                    <label htmlFor="select-inp">Choose a pet:</label>

                    <select {...form.bind('pet')} name="pets" id="select-inp">
                        <option value="">--Please choose an option--</option>
                        <option value="dog">Dog</option>
                        <option value="hamster">Hamster</option>
                        <option value="goldfish">Goldfish</option>
                    </select>
                </InputContainer>
                <Actions form={form} controlName="pet" setValueTo="goldfish" />
                <Result form={form} controlName="pet" />
            </div>
        </div>
    );
};
