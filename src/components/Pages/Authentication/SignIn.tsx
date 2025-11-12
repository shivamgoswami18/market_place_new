import { Fragment, useState } from "react";
import { Card, Col, Form, Image, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Seo from "../../../shared/layouts-components/seo/seo";
import togglelogo from "../../../assets/images/brand-logos/toggle-logo.png";
import BG9 from "../../../assets/images/media/backgrounds/9.png";
import media72 from "../../../assets/images/media/media-72.png";
import BaseInput from "../../Base/BaseInput";
import BaseButton from "../../Base/BaseButton";
import { InputPlaceHolder, validationMessages, emailRegex } from "../../Constants/Validation";
import { SignInLabel } from "../../Constants/SignIn";

interface SignInProps {}

const SignIn: React.FC<SignInProps> = () => {
  const navigate = useNavigate();
  const [btnLoader, setBtnLoader] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required(validationMessages.required(SignInLabel.Email))
        .matches(emailRegex, validationMessages.format(SignInLabel.Email)),
      password: Yup.string().required(
        validationMessages.required(SignInLabel.Password)
      ),
    }),
    onSubmit: (_values, { setSubmitting }) => {
      setBtnLoader(true);
      setTimeout(() => {
        navigate(`${import.meta.env.BASE_URL}dashboard`);
        setBtnLoader(false);
        setSubmitting(false);
      }, 300);
    },
  });

  return (
    <Fragment>
      <Seo title="Signin" />

      <Row className="authentication authentication-cover-main mx-0">
        <Col xxl={9} xl={9}>
          <Row className="justify-content-center align-items-center h-100">
            <Col xxl={4} xl={5} lg={6} md={6} sm={8} className="col-12">
              <Card className="custom-card border-0 shadow-none my-4">
                <Card.Body className="p-5">
                  <div>
                    <h4 className="mb-1 fw-semibold">Hi,Welcome back!</h4>
                    <p className="mb-4 text-muted fw-normal text-nowrap">
                      Please enter your credentials
                    </p>
                  </div>
                  <Form noValidate onSubmit={formik.handleSubmit}>
                    <Row className=" gy-3">
                      <Col xl={12}>
                        <BaseInput
                          label={SignInLabel.Email}
                          name="email"
                          type="email"
                          placeholder={InputPlaceHolder(SignInLabel.Email)}
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          handleBlur={formik.handleBlur}
                          error={formik.errors.email}
                          touched={formik.touched.email}
                          labelClassName="text-default"
                          fullWidth
                        />
                      </Col>
                      <Col xl={12} className="mb-2">
                        <BaseInput
                          label={SignInLabel.Password}
                          name="password"
                          type="password"
                          placeholder={InputPlaceHolder(SignInLabel.Password)}
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          handleBlur={formik.handleBlur}
                          error={formik.errors.password}
                          touched={formik.touched.password}
                          labelClassName="text-default d-block"
                          containerClassName="mb-0"
                          fullWidth
                        />
                        <div className="mt-2">
                          <div className="d-flex align-items-center justify-content-between flex-wrap">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                defaultValue=""
                                id="defaultCheck1"
                                defaultChecked
                              />
                              <label
                                className="form-check-label"
                                htmlFor="defaultCheck1"
                              >
                                Remember me
                              </label>
                            </div>
                            <BaseButton
                              type="button"
                              className="link-danger fw-medium fs-12 bg-transparent border-0 p-0"
                              noPadding
                              unstyled
                              onClick={() =>
                                navigate(
                                  `${import.meta.env.BASE_URL}pages/authentication/reset-password/cover`
                                )
                              }
                            >
                              Forget password ?
                            </BaseButton>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <div className="d-grid mt-3">
                      <BaseButton
                        type="submit"
                        label="Sign In"
                        className="w-100"
                        loader={btnLoader || formik.isSubmitting}
                        disabled={btnLoader || formik.isSubmitting}
                      />
                    </div>
                  </Form>
                  <div className="text-center my-3 authentication-barrier">
                    <span className="op-4 fs-13">OR</span>
                  </div>
                  <div className="text-center mt-3 fw-medium d-flex justify-content-center align-items-center gap-2 flex-wrap">
                    <span className="mb-0">Dont have an account?</span>
                    <BaseButton
                      type="button"
                      className="text-primary bg-transparent border-0 p-0"
                      noPadding
                      unstyled
                      onClick={() =>
                        navigate(
                          `${import.meta.env.BASE_URL}pages/authentication/sign-up/cover`
                        )
                      }
                    >
                      Sign Up
                    </BaseButton>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xxl={3} xl={3} lg={12} className="d-xl-block d-none px-0">
          <div className="authentication-cover overflow-hidden">
            <div className="authentication-cover-logo">
              <Link to={`${import.meta.env.BASE_URL}dashboard`}>
                <Image src={togglelogo} alt="logo" className="desktop-dark" />
              </Link>
            </div>
            <div className="authentication-cover-background">
              <Image src={BG9} alt="" />
            </div>
            <div className="authentication-cover-content">
              <div className="p-5">
                <h3 className="fw-semibold lh-base">Welcome to Dashboard</h3>
                <p className="mb-0 text-muted fw-medium">
                  Manage your website and content with ease using our powerful
                  admin tools.
                </p>
              </div>
              <div>
                <Image src={media72} alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SignIn;

