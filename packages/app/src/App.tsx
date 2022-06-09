import { Outlet, ReactLocation, Route, Router } from '@tanstack/react-location';
import { Checkbox } from './checkbox/checkbox';
import { Dropdown } from './dropdown/dropdown';
import { Radio } from './radio/radio';
import { Text } from './text/text';

const location = new ReactLocation();

const routes: Route[] = [
    { path: 'text', element: <Text /> },
    { path: 'radio', element: <Radio /> },
    { path: 'checkbox', element: <Checkbox /> },
    { path: 'dropdown', element: <Dropdown /> },
];

function App(): JSX.Element {
    return (
        <Router location={location} routes={routes}>
            <Outlet />
        </Router>
    );
}

export default App;
