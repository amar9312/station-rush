import { PageProps as AppPageProps } from './';
import { route as ziggyRoute } from 'ziggy-js';

declare global {
    interface Window {
        axios: typeof import('axios');
    }

    /* eslint-disable no-var */
    var route: typeof ziggyRoute;
}

declare module '@inertiajs/core' {
    interface PageProps extends AppPageProps { }
}
