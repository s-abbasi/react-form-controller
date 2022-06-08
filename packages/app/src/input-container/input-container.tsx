import { FC, ReactNode } from 'react';
import css from './input-container.module.scss';

export const InputContainer: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className={css.container}>
            <div className={css.boxTitle}>input</div>
            {children}
        </div>
    );
};
