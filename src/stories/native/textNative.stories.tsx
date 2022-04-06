import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FormModel } from '../../useForm/useForm.types';
import { TextNative } from './TextNative';

export default {
    title: 'native/text',
    component: TextNative,
} as ComponentMeta<typeof TextNative>;

const formModel: FormModel = {
    firstName: {
        initialValue: 'sajad',
    },
    lastName: {
        initialValue: '',
    },
};

const Template: ComponentStory<typeof TextNative> = (args: FormModel): JSX.Element => (
    <TextNative {...args} />
);

export const WithoutInitialValue = Template.bind({});
WithoutInitialValue.args = formModel;

export const WithInitialValue = Template.bind({});
WithInitialValue.args = { ...formModel, firstName: 'with initial value' };
