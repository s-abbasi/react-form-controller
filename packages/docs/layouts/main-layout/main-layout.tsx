import css from './main-layout.module.scss';
import { MainLayoutProps } from './main-layout.types';

export function MainLayout({ children }: MainLayoutProps): JSX.Element {
    return (
        <div className={css.container}>
            <header className={css.header}></header>
            <main className={css.main}>{children}</main>
        </div>
    );
}
