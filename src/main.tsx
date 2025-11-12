import { Fragment, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const App = lazy(() => import('./pages/App.tsx'));
const AuthenticationLayout = lazy(() => import('./pages/authenticationlayout.tsx'));
const Rpcover = lazy(() => import('./components/pages/authentication/reset-password/cover/cover.tsx'));
const Sicover = lazy(() => import('./components/pages/authentication/sign-in/cover/cover.tsx'));
const Sucover = lazy(() => import('./components/pages/authentication/sign-up/cover/cover.tsx'));

import RootWrapper from './pages/Rootwrapper.tsx';
import { RouteData } from './shared/data/routingdata.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Fragment>
    <RootWrapper>
      <BrowserRouter>
        {/* <Scrolltotop /> */}
        <Routes>
          {/* Redirect root path to sign-in cover - must be first to take precedence */}
          <Route index element={<Navigate to={`${import.meta.env.BASE_URL}pages/authentication/sign-in/cover`} replace />} />

          <Route path={`${import.meta.env.BASE_URL}`} element={<App />}>
            {RouteData.map((idx) => (
              <Route key={idx.id} path={idx.path} element={idx.element} />
            ))}
          </Route>

          <Route path={`${import.meta.env.BASE_URL}`} element={<AuthenticationLayout />}>
            <Route path={`${import.meta.env.BASE_URL}pages/authentication/reset-password/cover`} element={<Rpcover />} />
            <Route path={`${import.meta.env.BASE_URL}pages/authentication/sign-up/cover`} element={<Sucover />} />
            <Route path={`${import.meta.env.BASE_URL}pages/authentication/sign-in/cover`} element={<Sicover />} />
          </Route>
        
        </Routes>
      </BrowserRouter>
    </RootWrapper>
  </Fragment>
);

