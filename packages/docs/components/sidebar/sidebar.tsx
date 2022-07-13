import css from './sidebar.module.scss';
import { SidebarItem, SidebarProps } from './sidebar.types';

const itemList = (item: SidebarItem) => {
    return (
        <li key={item.label} className={css.item}>
            {item.label}
            <span className={css.adornment}>{item.adornment}</span>
        </li>
    );
};

export const Sidebar = ({ list }: SidebarProps): JSX.Element => {
    const groupList = list.map((group) => {
        return (
            <ul key={group.groupName} className={css.list}>
                <span className={css.title}>{group.groupName}</span>
                {group.items.map((item) => itemList(item))}
            </ul>
        );
    });

    return <div className={css.container}>{groupList}</div>;
};
