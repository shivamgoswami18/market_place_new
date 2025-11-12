import { lazy } from 'react'
const Dashboard = lazy(() => import('../../components/Pages/Dashboard/Dashboard.tsx'));

export const RouteData = [
    { id: 1, path: `${import.meta.env.BASE_URL}dashboard`, element: <Dashboard /> },
];