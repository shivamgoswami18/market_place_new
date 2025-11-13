import { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import RootWrapper from './layout/RootWrapper';
import AppRoutes from './routes/AppRoutes';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Fragment>
    <RootWrapper>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </RootWrapper>
  </Fragment>
);

