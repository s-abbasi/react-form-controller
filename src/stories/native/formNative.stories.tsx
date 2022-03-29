import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FormModel } from '../../useForm/useForm.types';
import { FormNative } from './formNative';

export default {
    title: 'native/form',
    component: FormNative,
} as ComponentMeta<typeof FormNative>;

const formModel: FormModel = {
    firstName: {
        defaultValue: 'sajad',
    },
    lastName: {
        defaultValue: '',
    },
    single: {
        defaultValue: true,
    },
    contact: {
        defaultValue: 'phone',
    },
    image: {
        defaultValue: undefined,
    },
    description: {
        defaultValue: '',
    },
};
const Template: ComponentStory<typeof FormNative> = (): JSX.Element => (
    <FormNative {...formModel} />
);
export const Primary = Template.bind({});
Primary.args = formModel;
