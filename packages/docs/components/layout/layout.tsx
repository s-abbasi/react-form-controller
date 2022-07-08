import css from './layout.module.scss';
import { LayoutProps } from './layout.types';

export function Layout({ children }: LayoutProps): JSX.Element {
    return (
        <div className={css.container}>
            <header className={css.header}>header</header>
            <aside className={css.aside}>aside</aside>
            <main className={css.main}>{children}</main>
        </div>
    );
}
