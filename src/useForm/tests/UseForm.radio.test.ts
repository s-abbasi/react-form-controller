import { act, renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import { Form } from '../UseForm.types';
import { useForm } from '../UseForm';

const formModel: Form = {
    name: { initialValue: '', disable: true },
    remember: { initialValue: false },
    gender: { initialValue: 'male' },
};

describe('UseForm - typeof radio', () => {
    test('should update "value" prop of returned UseForm on input change event', () => {
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const radioMaleEl: HTMLInputElement = document.createElement('input');
        radioMaleEl.type = 'radio';
        radioMaleEl.value = 'male';
        const radioFemaleEl: HTMLInputElement = document.createElement('input');
        radioFemaleEl.type = 'radio';
        radioFemaleEl.value = 'female';

        act(() => {
            form.gender.jsx.ref(radioMaleEl);
            form.gender.jsx.ref(radioFemaleEl);
        });

        fireEvent.input(radioFemaleEl, { targe: { value: 'female' } });

        expect(form.gender.value).toBe('female');
    });

    test('should set "disable" value of HTMLInputElement to value passed to formModel', () => {
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const input: HTMLInputElement = document.createElement('input');

        act(() => {
            form.name.jsx.ref(input);
        });

        expect(input.disabled).toBe(formModel.name.disable);
    });
});
