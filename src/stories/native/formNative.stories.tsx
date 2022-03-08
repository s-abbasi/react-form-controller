import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FormNative } from './formNative';

export default {
    title: 'native/form',
    component: FormNative,
} as ComponentMeta<typeof FormNative>;

const formModel = {
    name: { initialValue: '' },
};

const Template: ComponentStory<typeof FormNative> = (): JSX.Element => <FormNative />;
export const Primary = Template.bind({});
Primary.args = formModel;
