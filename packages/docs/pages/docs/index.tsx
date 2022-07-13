import { NextPage } from 'next';
import { SidebarLayout } from '../../layouts/sidebar-layout/sidebar-layout';

const main = <div>mainX</div>;
const sidebar = <div>sidebarR</div>;

const Docs: NextPage = () => {
    return <SidebarLayout main={main} sidebar={sidebar} />;
};

export default Docs;
