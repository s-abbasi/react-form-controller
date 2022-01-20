import { render } from '@testing-library/react';

import { Test } from './Test';

describe('Button', () => {
    test('renders the Test component', () => {
        render(<Test />);
    });
});
