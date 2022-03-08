import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FormNative } from './formNative';

export default {
    title: 'native/form',
    component: FormNative,
} as ComponentMeta<typeof FormNative>;

const formModel = {
    name: { initialValue: '' },
};

const Template: ComponentStory<typeof FormNative> = (args: any): JSX.Element => (
    <FormNative {...args} />
);
export const Primary = Template.bind({});
Primary.args = formModel;
