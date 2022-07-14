import css from './navigation.module.scss';

export const Navigation = (): JSX.Element => {
    return (
        <nav className={css.container}>
            <a className={css.navItem}>APIs</a>
            <a className={css.navItem}>Tutorial</a>
        </nav>
    );
};
