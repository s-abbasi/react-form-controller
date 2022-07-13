import css from './sidebar-layout.module.scss';
import { SidebarLayoutProps } from './sidebar-layout.types';

export const SidebarLayout = (props: SidebarLayoutProps): JSX.Element => {
    return (
        <div className={css.container}>
            <div className={css.sidebar}>{props.sidebar}</div>
            <div className={css.main}>{props.main}</div>
        </div>
    );
};
