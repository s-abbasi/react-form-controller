export type SidebarProps = {
    list: SidebarGroup[];
};

export type SidebarGroup = {
    groupName: string;
    items: SidebarItem[];
};

export type SidebarItem = {
    label: string;
    adornment: 'fn' | 'prop' | undefined;
};
