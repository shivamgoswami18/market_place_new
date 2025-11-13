import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <Fragment>
      <footer className="footer mt-auto py-3 text-center">
        <div className="container">
          <span className="text-muted">
            {" "}
            Copyright © <span id="year"> 2025 </span>{" "}
            <Link to="#!" className="text-dark fw-medium">
              Vyzor
            </Link>
            . Designed with{" "}
            <span className="bi bi-heart-fill text-danger" /> by{" "}
            <Link target="_blank" to="https://spruko.com/">
              <span className="fw-medium text-primary">Spruko</span>
            </Link>{" "}
            All rights reserved
          </span>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;


