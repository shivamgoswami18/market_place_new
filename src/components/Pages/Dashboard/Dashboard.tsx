import { Fragment } from "react";
import Seo from "../../../shared/layouts-components/seo/seo";

const Dashboard = () => (
  <Fragment>
    <Seo title="Dashboard" />
    <div className="mb-3 page-header-breadcrumb">
      <div className="d-flex align-center justify-content-between flex-wrap gap-2">
        <h1 className="page-title fw-medium fs-18 mb-0">Dashboard</h1>
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <span>Dashboard</span>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Dashboard
          </li>
        </ol>
      </div>
    </div>
    <p>This is dashboard</p>
  </Fragment>
);

export default Dashboard;

