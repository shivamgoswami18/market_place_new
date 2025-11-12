import { lazy } from 'react'
const Sales = lazy(() => import('../../components/dashboards/sale/sale'));
const Analytics = lazy(() => import('../../components/dashboards/analytics/analytics'));
const ProfileSettings = lazy(() => import('../../components/pages/profile-settings/profile-settings'));

export const RouteData = [
    { id: 1, path: `${import.meta.env.BASE_URL}dashboards/sales`, element: <Sales /> },
    { id: 2, path: `${import.meta.env.BASE_URL}dashboards/analytics`, element: <Analytics /> },
    { id: 3, path: `${import.meta.env.BASE_URL}pages/profile-settings`, element: <ProfileSettings /> },
];