import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Form } from '../../useForm/UseForm.types';
import { FormNative } from './formNative';

export default {
    title: 'native/form',
    component: FormNative,
} as ComponentMeta<typeof FormNative>;

const formModel: Form = {
    name: { initialValue: '' },
};

const Template: ComponentStory<typeof FormNative> = (args: Form): JSX.Element => (
    <FormNative {...args} />
);
export const Primary = Template.bind({});
Primary.args = formModel;
