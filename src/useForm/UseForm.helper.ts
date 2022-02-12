import { cond, T } from 'ramda';
import { MutableRefObject } from 'react';
import {
    AttachListenerToEl,
    Form,
    GetInputType,
    InputTypes,
    Ref,
    SetInitialValue,
    ValueTypes,
} from './UseForm.types';

export const addElToRefs = (refs: MutableRefObject<Ref[]>, fieldName: keyof Form) => {
    return (el: HTMLInputElement) => {
        refs.current.push({ key: fieldName, ref: el });
        return el;
    };
};

export const attachListenerToEl: AttachListenerToEl = (obj) =>
    cond([
        [
            ({ type }) => type === 'text',
            ({ el }) => {
                el.addEventListener('input', (e) => {
                    obj.value = (e.target as HTMLInputElement).value;
                });
                return el;
            },
        ],
        [
            ({ type }) => type === 'checkbox',
            ({ el }) => {
                el.addEventListener('input', (e) => {
                    obj.value = (e.target as HTMLInputElement).checked;
                });
                return el;
            },
        ],
        [
            ({ type }) => type === 'radio',
            ({ el }) => {
                el.addEventListener('input', (e) => {
                    obj.value = (e.target as HTMLInputElement).value;
                });
                return el;
            },
        ],
    ]);

export const getElInputType: GetInputType = cond([
    [(el) => el.type === 'text', (el) => ({ type: 'text' as InputTypes, el })],
    [(el) => el.type === 'number', (el) => ({ type: 'number' as InputTypes, el })],
    [(el) => el.type === 'checkbox', (el) => ({ type: 'checkbox' as InputTypes, el })],
    [(el) => el.type === 'radio', (el) => ({ type: 'radio' as InputTypes, el })],
    [T, (el) => ({ type: 'text', el })],
]);

export const checkRefExistence = (
    fieldName: keyof Form,
    refs: MutableRefObject<Ref[]>
): boolean => {
    return refs.current.some((item: Ref) => item.key === fieldName);
};

export const setInitialValue: SetInitialValue = (initialValue: ValueTypes) =>
    cond([
        [
            (el: HTMLInputElement) => el.type === 'text',
            (el: HTMLInputElement) => {
                el.value = initialValue as string;
            },
        ],
        [
            (el: HTMLInputElement) => el.type === 'checkbox',
            (el: HTMLInputElement) => {
                el.checked = initialValue as boolean;
            },
        ],
        [
            (el: HTMLInputElement) => el.type === 'radio',
            (el: HTMLInputElement) => {
                el.checked = el.value === initialValue;
            },
        ],
    ]);
