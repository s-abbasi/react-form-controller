import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FormMUI } from './formMUI';

export default {
    title: 'mui/form',
    component: FormMUI,
} as ComponentMeta<typeof FormMUI>;

const Template: ComponentStory<typeof FormMUI> = (): JSX.Element => <FormMUI />;

export const Primary = Template.bind({});
