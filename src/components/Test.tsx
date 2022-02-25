import { StrictMode, useState } from 'react';
import { useForm } from '../useForm/UseForm';
import { Form } from '../useForm/UseForm.types';
import { maxLength } from '../validations/validation.maxLength';
import { minLength } from '../validations/validation.minLength';
import { required } from '../validations/validation.required';

const formModel: Form = {
    name: {
        initialValue: 'hi',
        validations: [minLength(3), maxLength(10), required()],
    },
    single: { initialValue: true, validations: [required()] },
    contact: { initialValue: '', validations: [required()] },
    pet: { initialValue: 'ori', validations: [required()] },
    img: { initialValue: '', validations: [required()] },
};

export function Test(): JSX.Element {
    const form = useForm(formModel);
    const [state, setState] = useState('');

    const log = (): void => {
        console.log('form: ', form);
    };

    return (
        <div style={{ color: '#cdcdcd' }}>
            <StrictMode>
                <input
                    type="text"
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                />
                <hr />
                <input type="text" {...form.name.jsx} />
                <br />
                value: {form.name.value}
                <br />
                isValid: {JSON.stringify(form.name.isValid)}
                <hr />
                <input type="file" {...form.img.jsx} />
                <br />
                value: {(form.img.value as string).substring(0, 30)}
                <br />
                isValid: {JSON.stringify(form.img.isValid)}
                <hr />
                <label htmlFor="chb">
                    single?
                    <input type="checkbox" {...form.single.jsx} />
                    <br />
                    value: {JSON.stringify(form.single.value)}
                    <br />
                    isValid:{JSON.stringify(form.single.isValid)}
                </label>
                <hr />
                <div>
                    contact:
                    <label htmlFor="contactChoice1">
                        <input
                            {...form.contact.jsx}
                            type="radio"
                            id="contactChoice1"
                            name="contact"
                            value="email"
                        />
                        Email
                    </label>
                    <label htmlFor="contactChoice2">
                        <input
                            {...form.contact.jsx}
                            type="radio"
                            id="contactChoice2"
                            name="contact"
                            value="phone"
                        />
                        Phone
                    </label>
                    <label htmlFor="contactChoice3">
                        <input
                            {...form.contact.jsx}
                            type="radio"
                            id="contactChoice3"
                            name="contact"
                            value="fax"
                        />
                        Fax
                    </label>
                </div>
                value: {form.contact.value}
                <br />
                isValid: {JSON.stringify(form.contact.isValid)}
                <hr />
                <label htmlFor="pet-select">
                    Choose a pet:
                    <select {...form.pet.jsx} name="pets" id="pet-select">
                        <option value="">choose an option</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="hamster">Hamster</option>
                        <option value="parrot">Parrot</option>
                        <option value="spider">Spider</option>
                        <option value="ori">Ori</option>
                        <option value="goldfish">Goldfish</option>
                    </select>
                </label>
                <br />
                value: {form.pet.value}
                <br />
                isValid: {JSON.stringify(form.pet.isValid)}
                <hr />
                <button type="button" onClick={log}>
                    LOG
                </button>
            </StrictMode>
        </div>
    );
}
