import { NextPage } from 'next';
import { Sidebar } from '../../components/sidebar/sidebar';
import { SidebarLayout } from '../../layouts/sidebar-layout/sidebar-layout';
import { SidebarGroup } from '../../components/sidebar/sidebar.types';

const main = <div></div>;

const list: SidebarGroup[] = [
    {
        groupName: 'Composition API',
        items: [
            { label: 'Reactivity: Core Reactivity', adornment: 'prop' },
            { label: 'Reactivity: Utilities', adornment: 'fn' },
            { label: 'Reactivity: Advanced', adornment: 'fn' },
            { label: 'Lifecycle Hooks', adornment: 'prop' },
            { label: 'Dependency Injection', adornment: 'prop' },
        ],
    },
    {
        groupName: 'Options API',
        items: [
            { label: 'Options: State', adornment: 'prop' },
            { label: 'Options: Rendering', adornment: 'fn' },
            { label: 'Options: Composition', adornment: 'fn' },
            { label: 'Options: Misc', adornment: 'prop' },
            { label: 'Component Instance', adornment: 'prop' },
        ],
    },
    {
        groupName: 'Controller',
        items: [
            { label: 'Reactivity: Core Reactivity', adornment: 'prop' },
            { label: 'Reactivity: Utilities', adornment: 'fn' },
            { label: 'Reactivity: Advanced', adornment: 'fn' },
            { label: 'Lifecycle Hooks', adornment: 'prop' },
            { label: 'Dependency Injection', adornment: 'prop' },
        ],
    },
    {
        groupName: 'Adaptors',
        items: [
            { label: 'Options: State', adornment: 'prop' },
            { label: 'Options: Rendering', adornment: 'fn' },
            { label: 'Options: Composition', adornment: 'fn' },
            { label: 'Options: Misc', adornment: 'prop' },
            { label: 'Component Instance', adornment: 'prop' },
            { label: 'Options: Misc Advanced', adornment: 'prop' },
            { label: 'Component Instance Advanced', adornment: 'prop' },
        ],
    },
];

const Docs: NextPage = () => {
    const sidebar = <Sidebar list={list} />;
    return <SidebarLayout main={main} sidebar={sidebar} />;
};

export default Docs;
