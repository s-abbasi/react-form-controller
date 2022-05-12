import { renderHook } from '@testing-library/react-hooks';
import { ChangeEvent } from 'react';
import { useForm } from '../useForm/useForm';
import { FormChangeEvent, FormModel } from '../useForm/useForm.types';

describe('Radio', () => {
    test('should set "<input defaultValue={}>" to the given defaultValue in FormModel', () => {
        const formModel: FormModel = {
            contact: { initialValue: 'phone' },
        };
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const { props } = (
            <input type="radio" name="contact" id="phone" {...form.bind('contact')} />
        );

        expect(props.defaultValue).toBe('phone');
    });

    test.todo(
        'should set "<input defaultChecked={}>" to the given defaultValue in FormModel'
    );

    test('should set form.control.isTouched to true on blur event', () => {
        const formModel: FormModel = {
            contact: 'phone',
        };
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const onBlueEvent = (): boolean => true;
        form.bind('contact').onBlur(onBlueEvent as unknown as FormChangeEvent);

        expect(form.contact.isTouched).toBe(true);
    });

    test('should set form.control.isDirty to true on input change event', () => {
        const formModel: FormModel = {
            contact: 'phone',
        };
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const change = { target: { value: 'newValue' } } as ChangeEvent<HTMLInputElement>;
        form.bind('contact').onChange(change);

        expect(form.contact.isDirty).toBe(true);
    });
});
