import { act, renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import { Form } from './UseForm.types';
import { useForm } from './UseForm';

const formModel: Form = {
    name: { initialValue: '' },
    remember: { initialValue: false },
    gender: { initialValue: 'male' },
};

describe('UseForm', () => {
    test('should set "value" prop of returned UseForm to given initialValue', () => {
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;
        expect(form.name.value).toBe(formModel.name.initialValue);
    });
});

describe('UseForm - typeof text', () => {
    test('should update "value" prop of returned UseForm on input change event', () => {
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const inputTextEl: HTMLInputElement = document.createElement('input');
        inputTextEl.type = 'text';

        act(() => {
            form.name.jsx.ref(inputTextEl);
            fireEvent.input(inputTextEl, { target: { value: 'sajad' } });
        });

        expect(form.name.value).toBe('sajad');
    });

    test('should update "value" prop of returned UseForm on input change event without type of input specified', () => {
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const input: HTMLInputElement = document.createElement('input');

        act(() => {
            form.name.jsx.ref(input);
            fireEvent.input(input, { target: { value: 'sajad' } });
        });

        expect(form.name.value).toBe('sajad');
    });
});

describe('UseForm - typeof checkbox', () => {
    test('should update "value" prop of returned UseForm on input change event', () => {
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const checkboxEl = document.createElement('input');
        checkboxEl.type = 'checkbox';

        act(() => {
            form.remember.jsx.ref(checkboxEl);
        });

        fireEvent.input(checkboxEl, { target: { checked: true } });

        expect(form.remember.value).toBe(true);
    });
});

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
});
