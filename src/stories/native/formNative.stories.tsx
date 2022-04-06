import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FormModel } from '../../useForm/useForm.types';
import { FormNative } from './formNative';

export default {
    title: 'native/form',
    component: FormNative,
} as ComponentMeta<typeof FormNative>;

const formModel: FormModel = {
    firstName: {
        initialValue: 'sajad',
    },
    lastName: {
        initialValue: '',
    },
    single: {
        initialValue: true,
    },
    contact: {
        initialValue: 'phone',
    },
    image: {
        initialValue: undefined,
    },
    description: {
        initialValue: '',
    },
};
const Template: ComponentStory<typeof FormNative> = (): JSX.Element => (
    <FormNative {...formModel} />
);
export const Primary = Template.bind({});
Primary.args = formModel;
