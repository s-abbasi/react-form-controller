import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextNative } from './TextNative';

export default {
    title: 'native/text',
    component: TextNative,
} as ComponentMeta<typeof TextNative>;

const Template: ComponentStory<typeof TextNative> = (): JSX.Element => <TextNative />;

export const WithoutInitialValue = Template.bind({});
WithoutInitialValue.args = {};

export const WithInitialValue = Template.bind({});
WithInitialValue.args = { ...{}, name: { initialValue: 'initial value' } };
