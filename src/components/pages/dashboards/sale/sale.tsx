import React, { Fragment, useState } from "react";
import { Card, Col, Dropdown, Form, Image, ListGroup, Pagination, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import SpkDatepickr from "../../../../shared/@spk-reusable-components/reusable-plugins/spk-datepicker";
import SpkButton from "../../../../shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-buttons";
import SpkListCard from "../../../../shared/@spk-reusable-components/application-reusable/spk-listcard";
import Spkapexcharts from "../../../../shared/@spk-reusable-components/reusable-plugins/spk-apexcharts";
import SpkDropdown from "../../../../shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-dropdown";
import SpkTables from "../../../../shared/@spk-reusable-components/reusable-tables/spk-tables";
import SpkBadge from "../../../../shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-badge";
import Seo from "../../../../shared/layouts-components/seo/seo";
import {
  Activities,
  Channels,
  Customers,
  Orders,
  Overviewoptions,
  Overviewseries,
  Products,
  SalesCard,
  Stats,
  Transactionsdata,
  Visitorsoptions,
  Visitorsseries,
} from "../../../../shared/data/dashboards/salesdata";
import background8 from "../../../../assets/images/media/backgrounds/8.png";

interface SalesProps {}

const Sales: React.FC<SalesProps> = () => {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([today, nextWeek]);
  const [startDate, endDate] = dateRange;

  return (
    <Fragment>
      <Seo title="Dashboards-Sales" />
      <div className="d-flex align-items-center justify-content-between mb-3 page-header-breadcrumb flex-wrap gap-2">
        <div>
          <h1 className="page-title fw-medium fs-20 mb-0">Dashboard</h1>
        </div>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <div className="form-group">
            <SpkDatepickr
              className="form-control breadcrumb-input datepicker-input"
              placeholderText="Select date range"
              startDate={startDate}
              endDate={endDate}
              selectsRange={true}
              onChange={(update: any) => setDateRange(update)}
            />
          </div>
          <div className="btn-list">
            <SpkButton Buttonvariant="primary" Customclass="btn btn-icon btn-wave">
              <i className="ri-refresh-line"></i>
            </SpkButton>
            <SpkButton Buttonvariant="primary" Customclass="btn btn-icon btn-wave me-0">
              <i className="ri-filter-3-line"></i>
            </SpkButton>
          </div>
        </div>
      </div>

      <Row>
        <Col xxl={9}>
          <Row>
            <Col xxl={3}>
              <Row>
                {SalesCard.map((idx, index) => (
                  <Col xxl={12} xl={6} md={6} key={index}>
                    <SpkListCard titleClass="fs-13 fw-medium mb-0" listCard cardClass={idx.cardClass} list={idx} />
                  </Col>
                ))}
              </Row>
            </Col>
            <Col xxl={9}>
              <Card className="custom-card">
                <Card.Header className="justify-content-between">
                  <div className="card-title">Sales Overview</div>
                  <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
                    <SpkButton Buttontype="button" Buttonvariant="" Customclass="btn btn-primary btn-wave waves-effect waves-light">
                      Day
                    </SpkButton>
                    <SpkButton Buttontype="button" Buttonvariant="" Customclass="btn btn-primary-light btn-wave waves-effect waves-light">
                      Week
                    </SpkButton>
                    <SpkButton Buttontype="button" Buttonvariant="" Customclass="btn btn-primary-light btn-wave waves-effect waves-light">
                      Month
                    </SpkButton>
                    <SpkButton Buttontype="button" Buttonvariant="" Customclass="btn btn-primary-light btn-wave waves-effect waves-light">
                      Year
                    </SpkButton>
                  </div>
                </Card.Header>
                <Card.Body className="pb-0 pt-5">
                  <div id="sales-overview">
                    <Spkapexcharts
                      height={356}
                      type={"line"}
                      width={"100%"}
                      chartOptions={Overviewoptions}
                      chartSeries={Overviewseries}
                    />
                  </div>
                </Card.Body>
                <Card.Footer className="bg-light p-0">
                  <Row className="g-0 w-100">
                    {Stats.map((stat, idx) => (
                      <div key={idx} className={`col-sm-4 ${idx !== Stats.length - 1 ? "border-sm-end" : ""}`}>
                        <div className="p-3 text-center">
                          <span className="d-block text-muted mb-1">{stat.title}</span>
                          <h6 className="fw-semibold mb-0">{stat.value}</h6>
                        </div>
                      </div>
                    ))}
                  </Row>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xxl={3}>
          <Row>
            <Col xl={12}>
              <Card className="custom-card shadow-none card-bg-primary overflow-hidden dashboard-banner-card">
                <Card.Body>
                  <div className="dashboard-banner-card-background">
                    <Image src={background8} alt="" />
                  </div>
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <div>
                      <h5 className="fw-semibold mb-1 text-fixed-white">Hi, Tom Phillip &#128075;</h5>
                      <span className="d-block fs-14 mb-3 pe-5 text-fixed-white">
                        Check out the latest sales updates.
                      </span>
                      <Link to="#!" className="btn btn-secondary btn-wave mt-1">
                        Upgrade To Pro <i className="ti ti-arrow-narrow-right"></i>
                      </Link>
                    </div>
                    <div className="dashboard-banner-image d-sm-block d-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="Layer 1"
                        width="748.82965"
                        height="557.20035"
                        viewBox="0 0 748.82965 557.20035"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <path
                          d="M276.60133,642.057c-3.59968,0-7.20676.1709-10.72934.51563l-.51267.0498c-23.36542,2.37793-40.45611,16.17286-39.75323,32.08985l.13588,2.87793c.08961,1.81933.18508,3.77539.26367,5.94531.04255,1.07031,1.31106,1.8916,2.88946,1.8916H803.62751c40.52148-.2832,80.89606-.63965,119.9956-1.05957a177.65216,177.65216,0,0,0,21.95374-1.30957c10.86591-1.48047,18.40759-4.415,23.05841-8.97168h.00147c5.78332-5.65039,5.96551-12.76562,5.6159-20.80469-.71246-16.23242-1.419-33.28515-2.12414-50.28613-.62281-14.9834-1.24274-29.92676-1.86261-44.2334-.38343-8.49023-1.23536-15.98437-7.80317-21.71191-7.11865-6.19434-20.10137-9.334-38.58831-9.334-.22333,0-.44507,0-.67133.001-57.9361.23731-115.34192,23.1709-142.8454,57.06732-3.16711,3.90332-6.11822,8.082-8.97247,12.124a158.91584,158.91584,0,0,1-13.7804,17.66406,66.94863,66.94863,0,0,1-9.10321,8.16894c-.22326.17774-.47888.36817-.7492.54883-.61847.46387-1.26477.91114-1.895,1.30957a62.04148,62.04148,0,0,1-11.60926,6.07617l-.40692.15723c-.30627.126-.6383.252-.97027.36719a68.20886,68.20886,0,0,1-7.17,2.20605c-10.484,2.66016-22.40545,3.29785-35.43151,1.89356a151.75182,151.75182,0,0,1-35.2295-8.26465c-12.06244-4.38867-23.3529-9.86035-34.27173-15.15137-4.79614-2.32519-9.75683-4.72851-14.711-7.00586-.93134-.42871-1.84723-.84765-2.7771-1.2666-6.05066-2.71484-11.5365-4.957-16.77045-6.85449a146.28118,146.28118,0,0,0-39.96478-8.52149c-14.40918-.9082-27.10688.80469-37.73191,5.07911a60.6496,60.6496,0,0,0-8.53469,4.23339c-12.58466,7.52344-20.343,18.627-27.845,29.36524-9.33233,13.35644-18.98275,27.16894-38.0382,34.3291-21.98825,8.26953-54.08371,4.834-76.791-1.14062-7.13919-1.87891-14.26956-4.04-21.16565-6.13086q-4.17768-1.26719-8.36136-2.51661c-5.48071-1.6289-9.96621-2.877-14.116-3.93066l-1.31253-.33594c-.73008-.18261-1.46088-.36523-2.20493-.53906-4.92911-1.19141-9.51892-2.12891-14.03891-2.86621l-1.06943-.17969c-2.144-.32519-4.14834-.5957-6.11526-.82324l-.78516-.08984A109.23844,109.23844,0,0,0,276.60133,642.057Z"
                          transform="translate(-225.58517 -171.39982)"
                          fill="rgba(255, 255, 255, 0.2)"
                        />
                        <path
                          d="M343.64,685.3514a1.19069,1.19069,0,0,1,1.18683-1.19452h510.294a1.19069,1.19069,0,0,1,0,2.38135h-510.294A1.19066,1.19066,0,0,1,343.64,685.3514Z"
                          transform="translate(-225.58517 -171.39982)"
                          fill="#cacaca"
                        />
                        {/* SVG truncated for brevity */}
                      </svg>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={12}>
              <Card className="custom-card">
                <Card.Header className="justify-content-between">
                  <div className="card-title">Visitors By Device</div>
                  <Link to="#!" className="fs-12 text-muted text-decoration-underline">
                    View Report <i className="ti ti-arrow-narrow-right"></i>
                  </Link>
                </Card.Header>
                <Card.Body className="pb-0 px-0">
                  <div id="visitors-report">
                    <Spkapexcharts
                      height={290}
                      type={"radar"}
                      width={"100%"}
                      chartOptions={Visitorsoptions}
                      chartSeries={Visitorsseries}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Rest of the component remains unchanged */}
      {/* ... */}
    </Fragment>
  );
};

export default Sales;

