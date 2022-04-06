import { renderHook } from '@testing-library/react-hooks';
import { useForm } from '../useForm/useForm';
import { FormModel } from '../useForm/useForm.types';

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

    test.skip('should set "<input defaultChecked={}>" to the given defaultValue in FormModel', () => {
        const formModel: FormModel = {
            contact: { initialValue: 'phone' },
        };
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const { props } = (
            <input type="radio" name="contact" id="phone" {...form.bind('contact')} />
        );

        expect(props.defaultChecked).toBe(true);
    });
});
