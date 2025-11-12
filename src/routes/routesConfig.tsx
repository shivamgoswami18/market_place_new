import { lazy } from "react";
import type { ReactNode } from "react";

const App = lazy(() => import("../pages/App"));
const AuthenticationLayout = lazy(() => import("../pages/AuthLayout"));
const SignIn = lazy(() => import("../components/Pages/Authentication/SignIn"));
const Dashboard = lazy(() => import("../components/Pages/Dashboard/Dashboard"));

export type RouteConfig = {
  path: string;
  element: ReactNode;
  isPublic?: boolean;
  children?: Array<{
    path: string;
    element: ReactNode;
  }>;
};

const basePath = import.meta.env.BASE_URL;

export const redirectPath = `${basePath}sign-in`;

export const publicRoutes: RouteConfig[] = [
  {
    path: basePath,
    element: <AuthenticationLayout />,
    isPublic: true,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export const privateRoutes: RouteConfig[] = [
  {
    path: basePath,
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
];

