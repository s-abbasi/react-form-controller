import { Outlet, ReactLocation, Route, Router } from '@tanstack/react-location';
import { Radio } from './radio/radio';
import { Text } from './text/text';

const location = new ReactLocation();

const routes: Route[] = [
    { path: 'text', element: <Text /> },
    { path: 'radio', element: <Radio /> },
];

function App(): JSX.Element {
    return (
        <Router location={location} routes={routes}>
            <Outlet />
        </Router>
    );
}

export default App;
