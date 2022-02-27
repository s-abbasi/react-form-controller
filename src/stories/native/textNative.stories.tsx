import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Form } from '../../useForm/UseForm.types';
import { TextNative } from './textNative';

export default {
    title: 'native/text',
    component: TextNative,
} as ComponentMeta<typeof TextNative>;

const formModel: Form = {
    name: { initialValue: '' },
};

const Template: ComponentStory<typeof TextNative> = (args: Form): JSX.Element => (
    <TextNative {...args} />
);

export const WithoutInitialValue = Template.bind({});
WithoutInitialValue.args = formModel;

export const WithInitialValue = Template.bind({});
WithInitialValue.args = { ...formModel, name: { initialValue: 'initial value' } };
