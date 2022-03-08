import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextMUI } from './textMUI';

export default {
    title: 'mui/TextField',
    component: TextMUI,
} as ComponentMeta<typeof TextMUI>;

const formModel = {
    name: { initialValue: '' },
};

const Template: ComponentStory<typeof TextMUI> = (): JSX.Element => <TextMUI />;

export const WithoutInitialValue = Template.bind({});
WithoutInitialValue.args = formModel;

export const WithInitialValue = Template.bind({});
WithInitialValue.args = { ...formModel, name: { initialValue: 'initial value' } };
