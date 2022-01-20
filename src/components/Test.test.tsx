// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';

import { Test } from './Test';

describe('Button', () => {
    test('renders the Test component', () => {
        render(<Test />);
    });
});
