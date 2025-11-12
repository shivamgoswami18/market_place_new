
import React, { useEffect, useRef, useState } from 'react'
import { Dropdown, Image } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import { getState, setState } from '../services/switcherServices';
import { Link } from 'react-router-dom';
import logo1 from "../../../assets/images/brand-logos/desktop-logo.png";
import logo2 from "../../../assets/images/brand-logos/toggle-dark.png";
import logo3 from "../../../assets/images/brand-logos/desktop-dark.png";
import logo4 from "../../../assets/images/brand-logos/toggle-logo.png";
import face1 from "../../../assets/images/faces/1.jpg";
import face12 from "../../../assets/images/faces/12.jpg";
import Switcher from '../switcher/switcher';
const Header = () => {

    let [variable, _setVariable] = useState(getState());

    // MenuClose Function

    function menuClose() {
        const theme = getState();

        if (window.innerWidth <= 992) {
            const newState = {
                toggled: "close"
            }
            setState(newState);
        }

        if (window.innerWidth >= 992) {
            const local_varaiable = theme;
            const newToggledValue = local_varaiable.toggled ? local_varaiable.toggled : '';

            setState({ toggled: newToggledValue });
        }
    }

    // Sidebar Toggle Function

    const overlayRef = useRef<HTMLDivElement | null>(null);
    const Query = (selector: any) => document.querySelector(selector)

    const toggleSidebar = () => {
        const theme = getState();
        const sidemenuType = theme.dataNavLayout;
        if (window.innerWidth >= 992) {
            if (sidemenuType === "vertical") {
                const verticalStyle = theme.dataVerticalStyle;
                const navStyle = theme.dataNavStyle;
                switch (verticalStyle) {
                    case "closed":
                        // Toggle between open/close state for "closed" vertical style
                        setState({
                            dataNavStyle: "",
                            toggled: theme.toggled === "close-menu-close" ? "" : "close-menu-close"
                        });
                        break;
                    case "overlay":
                        // Handle icon-overlay state with window width check
                        setState({
                            dataNavStyle: "",
                            toggled: theme.toggled === "icon-overlay-close" ? "" : "icon-overlay-close",
                            iconOverlay: ""
                        });

                        if (theme.toggled !== "icon-overlay-close" && window.innerWidth >= 992) {
                            setState({
                                toggled: "icon-overlay-close",
                                iconOverlay: "",
                            });
                        }
                        break;
                    case "icontext":
                        // Handle icon-text state
                        setState({
                            dataNavStyle: "",
                            toggled: theme.toggled === "icon-text-close" ? "" : "icon-text-close"
                        });
                        break;
                    case "doublemenu":
                        // Handle double menu state
                        setState({ dataNavStyle: "" });
                        if (theme.toggled === "double-menu-open") {
                            setState({ toggled: "double-menu-close" });
                        } else {
                            // Toggle the active double menu item
                            const sidemenu = Query(".side-menu__item.active");
                            if (sidemenu) {
                                setState({ toggled: "double-menu-open" });
                                if (sidemenu.nextElementSibling) {
                                    sidemenu.nextElementSibling.classList.add("double-menu-active");
                                } else {
                                    setState({ toggled: "double-menu-close" });
                                }
                            }
                        }
                        break;
                    case "detached":
                        // Handle detached menu state
                        setState({
                            toggled: theme.toggled === "detached-close" ? "" : "detached-close",
                            iconOverlay: ""
                        });
                        break;
                    default:
                        setState({ toggled: "" });
                        break;
                }

                // Handle navStyle changes
                switch (navStyle) {
                    case "menu-click":
                        setState({
                            toggled: theme.toggled === "menu-click-closed" ? "" : "menu-click-closed"
                        });
                        break;
                    case "menu-hover":
                        setState({
                            toggled: theme.toggled === "menu-hover-closed" ? "" : "menu-hover-closed"
                        });
                        break;
                    case "icon-click":
                        setState({
                            toggled: theme.toggled === "icon-click-closed" ? "" : "icon-click-closed"
                        });
                        break;
                    case "icon-hover":
                        setState({
                            toggled: theme.toggled === "icon-hover-closed" ? "" : "icon-hover-closed"
                        });
                        break;
                }
            }
        } else {
            // For mobile view (screen width < 992px)
            if (theme.toggled === "close") {
                setState({ toggled: "open" });

                setTimeout(() => {
                    if (theme.toggled === "open") {
                        const overlay = overlayRef.current
                        if (overlay) {
                            overlay.classList.add("active");
                            overlay.addEventListener("click", () => {
                                const overlay = overlayRef.current
                                if (overlay) {
                                    overlay.classList.remove("active");
                                    menuClose();
                                }
                            });
                        }
                    }
                    window.addEventListener("resize", () => {
                        if (window.innerWidth >= 992) {
                            const overlay = Query("#responsive-overlay");
                            if (overlay) {
                                overlay.classList.remove("active");
                            }
                        }
                    });
                }, 100);
            } else {
                setState({ toggled: "close" });
            }
        }
    };

    //  Switcher Offcanvas

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Theme Toggle Function

    const toggleTheme = () => {
        const currentTheme = getState();
        const newState = {
          dataThemeMode: currentTheme.dataThemeMode === 'dark' ? 'light' : 'dark',
          dataHeaderStyles: currentTheme.dataThemeMode === 'transparent' ? 'light' : 'transparent',
          dataMenuStyles: currentTheme.dataThemeMode === 'transparent' ? 'light' : 'transparent',
        }
        setState(newState)
        if (newState.dataThemeMode != 'dark') {
          const newState = {
            bodyBg: '',
            lightRgb: '',
            bodyBg2: '',
            inputBorder: '',
            formControlBg: '',
            gray: '',
          }
          setState(newState)
          localStorage.setItem("vyzorlightTheme", "light");
          localStorage.removeItem("vyzordarkTheme");
          localStorage.removeItem("vyzormenu");
          localStorage.removeItem("vyzorheader");
          localStorage.removeItem("bodyBg");
          localStorage.removeItem("bodyBg2");
          localStorage.removeItem("bgImg");
        }
        else {
          localStorage.setItem("vyzordarkTheme", "dark");
          localStorage.removeItem("vyzorlightTheme");
          localStorage.removeItem("vyzormenu");
          localStorage.removeItem("vyzorheader");
          localStorage.removeItem("bodyBg");
          localStorage.removeItem("bodyBg2");
          localStorage.removeItem("inputBorder");
          localStorage.removeItem("lightRgb");
          localStorage.removeItem("formControlBg");
          localStorage.removeItem("gray");
        }
      }
    // Sticky header handling

    useEffect(() => {
        const navbar = document?.querySelector(".app-header");
        const navbar1 = document?.querySelector(".app-sidebar");
        const sticky: any = navbar?.clientHeight;
        // const sticky1 = navbar1.clientHeight;

        function stickyFn() {
            if (window.pageYOffset >= sticky) {
                navbar?.classList.add("sticky-pin");
                navbar1?.classList.add("sticky-pin");
            } else {
                navbar?.classList.remove("sticky-pin");
                navbar1?.classList.remove("sticky-pin");
            }
        }

        window.addEventListener("scroll", stickyFn);
        window.addEventListener("DOMContentLoaded", stickyFn);

        // Cleanup event listeners when the component unmounts
        return () => {
            window.removeEventListener("scroll", stickyFn);
            window.removeEventListener("DOMContentLoaded", stickyFn);
        };
    }, []);

    return (
        <div>
            <header className="app-header sticky" id="header">

                {/* <!-- Start::main-header-container --> */}

                <div className="main-header-container container-fluid">

                    {variable.toggled === "open" && (
                        <div ref={overlayRef} id="responsive-overlay"></div>
                    )}

                    {/* <!-- Start::header-content-left --> */}

                    <div className="header-content-left">

                        {/* <!-- Start::header-element --> */}

                        <div className="header-element">
                            <div className="horizontal-logo">
                                <Link to={`${import.meta.env.BASE_URL}dashboards/sales/`} className="header-logo">
                                    <Image src={logo1} alt="logo" className="desktop-logo" />
                                    <Image src={logo2} alt="logo" className="toggle-dark" />
                                    <Image src={logo3} alt="logo" className="desktop-dark" />
                                    <Image src={logo4} alt="logo" className="toggle-logo" /> </Link>
                            </div>
                        </div>

                        {/* <!-- End::header-element --> */}

                        {/* <!-- Start::header-element --> */}

                        <div className="header-element mx-lg-0 mx-2">
                            <Link aria-label="Hide Sidebar" onClick={toggleSidebar} className="sidemenu-toggle header-link animated-arrow hor-toggle horizontal-navtoggle" data-bs-toggle="sidebar" to="#!"><span></span></Link>
                        </div>

                        {/* <!-- End::header-element --> */}

                    </div>

                    {/* <!-- End::header-content-left --> */}

                    {/* <!-- Start::header-content-right --> */}

                    <ul className="header-content-right">

                        {/* <!-- Start::header-element --> */}

                        <li className="header-element header-theme-mode">

                            {/* <!-- Start::header-link|layout-setting --> */}

                            <Link to="#!" className="header-link layout-setting" onClick={toggleTheme}>
                                <span className="light-layout">

                                    {/* <!-- Start::header-link-icon --> */}

                                    <svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M108.11,28.11A96.09,96.09,0,0,0,227.89,147.89,96,96,0,1,1,108.11,28.11Z" opacity="0.2" /><path d="M108.11,28.11A96.09,96.09,0,0,0,227.89,147.89,96,96,0,1,1,108.11,28.11Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>

                                    {/* <!-- End::header-link-icon --> */}

                                </span>
                                <span className="dark-layout">

                                    {/* <!-- Start::header-link-icon --> */}

                                    <svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><circle cx="128" cy="128" r="56" opacity="0.2" /><line x1="128" y1="40" x2="128" y2="32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><circle cx="128" cy="128" r="56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="64" y1="64" x2="56" y2="56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="64" y1="192" x2="56" y2="200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="192" y1="64" x2="200" y2="56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="192" y1="192" x2="200" y2="200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="40" y1="128" x2="32" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="128" y1="216" x2="128" y2="224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="216" y1="128" x2="224" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>

                                    {/* <!-- End::header-link-icon --> */}

                                </span>
                            </Link>

                            {/* <!-- End::header-link|layout-setting --> */}

                        </li>

                        {/* <!-- End::header-element --> */}

                        {/* <!-- Start::header-element --> */}

                        <Dropdown className="header-element notifications-dropdown d-xl-block d-none dropdown" autoClose="outside">

                            {/* <!-- Start::header-link|dropdown-toggle --> */}

                            <Dropdown.Toggle as="a" variant=''  className="header-link dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" id="messageDropdown" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M56,104a72,72,0,0,1,144,0c0,35.82,8.3,64.6,14.9,76A8,8,0,0,1,208,192H48a8,8,0,0,1-6.88-12C47.71,168.6,56,139.81,56,104Z" opacity="0.2" /><path d="M96,192a32,32,0,0,0,64,0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M56,104a72,72,0,0,1,144,0c0,35.82,8.3,64.6,14.9,76A8,8,0,0,1,208,192H48a8,8,0,0,1-6.88-12C47.71,168.6,56,139.81,56,104Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>
                                <span className="header-icon-pulse bg-secondary rounded pulse pulse-secondary"></span>
                            </Dropdown.Toggle>

                            {/* <!-- End::header-link|dropdown-toggle --> */}

                            {/* <!-- Start::main-header-dropdown --> */}

                            <Dropdown.Menu className="main-header-dropdown dropdown-menu dropdown-menu-end" data-popper-placement="none">
                                <div className="p-3 bg-primary text-fixed-white">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p className="mb-0 fs-16">Notifications</p>
                                        <Link to="#!" className="badge bg-light text-default border">Clear All</Link>
                                    </div>
                                </div>
                                <div className="dropdown-divider"></div>
                                <SimpleBar className="list-unstyled mb-0" id="header-notification-scroll">
                                    <li className="dropdown-item position-relative">
                                        <Link to={`${import.meta.env.BASE_URL}dashboards/sales`} className="stretched-link"></Link>
                                        <div className="d-flex align-items-start gap-3">
                                            <div className="lh-1">
                                                <span className="avatar avatar-sm avatar-rounded bg-primary-transparent">
                                                    <Image src={face1} alt="" />

                                                </span>
                                            </div>
                                            <div className="flex-fill">
                                                <span className="d-block fw-semibold">New Message</span>
                                                <span className="d-block text-muted fs-12">You have received a new message from John Doe</span>
                                            </div>
                                            <div className="text-end">
                                                <span className="d-block mb-1 fs-12 text-muted">11:45am</span>
                                                <span className="d-block text-primary d-none"><i className="ri-circle-fill fs-9"></i></span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="dropdown-item position-relative">
                                        <Link to={`${import.meta.env.BASE_URL}dashboards/sales`} className="stretched-link"></Link>
                                        <div className="d-flex align-items-start gap-3">
                                            <div className="lh-1">
                                                <span className="avatar avatar-sm avatar-rounded bg-primary-transparent">
                                                    <i className="ri-notification-line fs-16"></i>
                                                </span>
                                            </div>
                                            <div className="flex-fill">
                                                <span className="d-block fw-semibold">Task Reminder</span>
                                                <span className="d-block text-muted fs-12">Don't forget to submit your report by 3 PM today</span>
                                            </div>
                                            <div className="text-end">
                                                <span className="d-block mb-1 fs-12 text-muted">02:16pm</span>
                                                <span className="d-block text-primary d-none"><i className="ri-circle-fill fs-9"></i></span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="dropdown-item position-relative">
                                        <Link to={`${import.meta.env.BASE_URL}dashboards/sales`} className="stretched-link"></Link>
                                        <div className="d-flex align-items-start gap-3">
                                            <div className="lh-1">
                                                <span className="avatar avatar-sm avatar-rounded bg-primary-transparent fs-5">
                                                    <Image src={face12} alt="" />
                                                </span>
                                            </div>
                                            <div className="flex-fill">
                                                <span className="d-block fw-semibold">Friend Request</span>
                                                <span className="d-block text-muted fs-12">Jane Smith sent you a friend request</span>
                                            </div>
                                            <div className="text-end">
                                                <span className="d-block mb-1 fs-12 text-muted">10:04am</span>
                                                <span className="d-block text-primary"><i className="ri-circle-fill fs-9"></i></span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="dropdown-item position-relative">
                                        <Link to={`${import.meta.env.BASE_URL}dashboards/sales`} className="stretched-link"></Link>
                                        <div className="d-flex align-items-start gap-3">
                                            <div className="lh-1">
                                                <span className="avatar avatar-sm avatar-rounded bg-primary-transparent fs-5">
                                                    <i className="ri-notification-line fs-16"></i>
                                                </span>
                                            </div>
                                            <div className="flex-fill">
                                                <span className="d-block fw-semibold">Event Reminder</span>
                                                <span className="d-block text-muted fs-12">You have an upcoming event: Team Meeting on October 25 at 10 AM.</span>
                                            </div>
                                            <div className="text-end">
                                                <span className="d-block mb-1 fs-12 text-muted">12:58pm</span>
                                                <span className="d-block text-primary"><i className="ri-circle-fill fs-9"></i></span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="dropdown-item position-relative">
                                        <Link to={`${import.meta.env.BASE_URL}dashboards/sales`} className="stretched-link"></Link>
                                        <div className="d-flex align-items-start gap-3">
                                            <div className="lh-1">
                                                <span className="avatar avatar-sm avatar-rounded bg-primary-transparent fs-5">
                                                    <i className="ri-notification-line fs-16"></i>
                                                </span>
                                            </div>
                                            <div className="flex-fill">
                                                <span className="d-block fw-semibold">File Uploaded</span>
                                                <span className="d-block text-muted fs-12">The file "Project_Proposal.pdf" has been uploaded successfully</span>
                                            </div>
                                            <div className="text-end">
                                                <span className="d-block mb-1 fs-12 text-muted">05:13pm</span>
                                                <span className="d-block text-primary"><i className="ri-circle-fill fs-9"></i></span>
                                            </div>
                                        </div>
                                    </li>
                                </SimpleBar>
                                <div className="p-5 empty-item1 d-none">
                                    <div className="text-center">
                                        <span className="avatar avatar-xl avatar-rounded bg-secondary-transparent">
                                            <i className="ri-notification-off-line fs-2"></i>
                                        </span>
                                        <h6 className="fw-semibold mt-3">No New Notifications</h6>
                                    </div>
                                </div>
                            </Dropdown.Menu>

                            {/* <!-- End::main-header-dropdown --> */}

                        </Dropdown>

                        {/* <!-- End::header-element --> */}

                        {/* <!-- Start::header-element --> */}

                        <Dropdown className="header-element dropdown">

                            {/* <!-- Start::header-link|dropdown-toggle --> */}

                            <Dropdown.Toggle as="a" variant=''  className="header-link dropdown-toggle" id="mainHeaderProfile" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                <div>
                                    <Image src={face12} alt="img" className="header-link-icon" />
                                </div>
                            </Dropdown.Toggle>

                            {/* <!-- End::header-link|dropdown-toggle --> */}

                            <Dropdown.Menu className="main-header-dropdown dropdown-menu pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end" aria-labelledby="mainHeaderProfile">
                                <div className="p-3 bg-primary text-fixed-white">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p className="mb-0 fs-16">Profile</p>
                                        <Link to="#!" className="text-fixed-white"><i className="ti ti-settings-cog"></i></Link>
                                    </div>
                                </div>
                                <div className="dropdown-divider"></div>
                                <div className="p-3">
                                    <div className="d-flex align-items-start gap-2">
                                        <div className="lh-1">
                                            <span className="avatar avatar-sm bg-primary-transparent avatar-rounded">
                                                <Image src={face12} alt="" />
                                            </span>
                                        </div>
                                        <div>
                                            <span className="d-block fw-semibold lh-1">Tom Phillip</span>
                                            <span className="text-muted fs-12">tomphillip32@gmail.com</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="dropdown-divider"></div>
                                <ul className="list-unstyled mb-0">
                                    <li>
                                        <ul className="list-unstyled mb-0 sub-list">
                                            <li>
                                                <Link className="dropdown-item d-flex align-items-center" to={`${import.meta.env.BASE_URL}pages/profile-settings`}><i className="ti ti-settings-cog me-2 fs-18"></i>Profile Settings</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><Link className="dropdown-item d-flex align-items-center" to={`${import.meta.env.BASE_URL}pages/authentication/sign-in/cover`}><i className="ti ti-logout me-2 fs-18"></i>Log Out</Link></li>
                                </ul>
                            </Dropdown.Menu>
                        </Dropdown>

                        {/* <!-- End::header-element --> */}

                        {/* <!-- Start::header-element --> */}

                        <li className="header-element">

                            {/* <!-- Start::header-link|switcher-icon --> */}

                            <Link to="#!" className="header-link switcher-icon" data-bs-toggle="offcanvas" data-bs-target="#switcher-canvas" onClick={handleShow} >
                                <svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M207.86,123.18l16.78-21a99.14,99.14,0,0,0-10.07-24.29l-26.7-3a81,81,0,0,0-6.81-6.81l-3-26.71a99.43,99.43,0,0,0-24.3-10l-21,16.77a81.59,81.59,0,0,0-9.64,0l-21-16.78A99.14,99.14,0,0,0,77.91,41.43l-3,26.7a81,81,0,0,0-6.81,6.81l-26.71,3a99.43,99.43,0,0,0-10,24.3l16.77,21a81.59,81.59,0,0,0,0,9.64l-16.78,21a99.14,99.14,0,0,0,10.07,24.29l26.7,3a81,81,0,0,0,6.81,6.81l3,26.71a99.43,99.43,0,0,0,24.3,10l21-16.77a81.59,81.59,0,0,0,9.64,0l21,16.78a99.14,99.14,0,0,0,24.29-10.07l3-26.7a81,81,0,0,0,6.81-6.81l26.71-3a99.43,99.43,0,0,0,10-24.3l-16.77-21A81.59,81.59,0,0,0,207.86,123.18ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z" opacity="0.2" /><circle cx="128" cy="128" r="40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M41.43,178.09A99.14,99.14,0,0,1,31.36,153.8l16.78-21a81.59,81.59,0,0,1,0-9.64l-16.77-21a99.43,99.43,0,0,1,10.05-24.3l26.71-3a81,81,0,0,1,6.81-6.81l3-26.7A99.14,99.14,0,0,1,102.2,31.36l21,16.78a81.59,81.59,0,0,1,9.64,0l21-16.77a99.43,99.43,0,0,1,24.3,10.05l3,26.71a81,81,0,0,1,6.81,6.81l26.7,3a99.14,99.14,0,0,1,10.07,24.29l-16.78,21a81.59,81.59,0,0,1,0,9.64l16.77,21a99.43,99.43,0,0,1-10,24.3l-26.71,3a81,81,0,0,1-6.81,6.81l-3,26.7a99.14,99.14,0,0,1-24.29,10.07l-21-16.78a81.59,81.59,0,0,1-9.64,0l-21,16.77a99.43,99.43,0,0,1-24.3-10l-3-26.71a81,81,0,0,1-6.81-6.81Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>
                            </Link>
                            <Switcher show={show} handleClose={handleClose} />

                            {/* <!-- End::header-link|switcher-icon --> */}

                        </li>

                        {/* <!-- End::header-element --> */}

                    </ul>

                    {/* <!-- End::header-content-right --> */}

                </div>

                {/* <!-- End::main-header-container --> */}

            </header>
        </div>
    )
}

export default Header
