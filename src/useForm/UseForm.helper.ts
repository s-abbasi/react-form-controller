import { cond, T } from 'ramda';
import { MutableRefObject } from 'react';
import {
    Form,
    GetInputType,
    InputTypes,
    Ref,
    SetInitialValue,
    ValueTypes,
} from './UseForm.types';

export const attachListenerToEl = cond([
    [
        ({ type }) => type === 'text',
        ({ el }) => {
            el.addEventListener('input', () => {
                // eslint-disable-next-line no-console
                console.log('change text: ', el.value);
            });
            return el;
        },
    ],
    [
        ({ type }) => type === 'checkbox',
        ({ el }) => {
            el.addEventListener('input', () => {
                // eslint-disable-next-line no-console
                console.log('change chb: ', el.checked);
            });
            return el;
        },
    ],
]);

export const getElInputType: GetInputType = cond([
    [(el) => el.type === 'text', (el) => ({ type: 'text' as InputTypes, el })],
    [(el) => el.type === 'number', (el) => ({ type: 'number' as InputTypes, el })],
    [(el) => el.type === 'checkbox', (el) => ({ type: 'checkbox' as InputTypes, el })],
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
    ]);
