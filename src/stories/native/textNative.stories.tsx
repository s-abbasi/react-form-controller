import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextNative } from './TextNative';

export default {
    title: 'native/text',
    component: TextNative,
} as ComponentMeta<typeof TextNative>;

const formModel: any = {
    name: { initialValue: '' },
};

const Template: ComponentStory<typeof TextNative> = (args: any): JSX.Element => (
    <TextNative {...args} />
);

export const WithoutInitialValue = Template.bind({});
WithoutInitialValue.args = formModel;

export const WithInitialValue = Template.bind({});
WithInitialValue.args = { ...formModel, name: { initialValue: 'initial value' } };
