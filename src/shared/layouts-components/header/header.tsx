
import { useEffect, useRef, useState } from 'react'
import { Dropdown, Image } from 'react-bootstrap';
import { getState, setState } from '../services/switcherServices';
import { Link } from 'react-router-dom';
import logo1 from "../../../assets/images/brand-logos/desktop-logo.png";
import logo2 from "../../../assets/images/brand-logos/toggle-dark.png";
import logo3 from "../../../assets/images/brand-logos/desktop-dark.png";
import logo4 from "../../../assets/images/brand-logos/toggle-logo.png";
import face12 from "../../../assets/images/faces/12.jpg";
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
                                <Link to={`${import.meta.env.BASE_URL}dashboard`} className="header-logo">
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
                                                <Link className="dropdown-item d-flex align-items-center" to="#!"><i className="ti ti-settings-cog me-2 fs-18"></i>Profile Settings</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><Link className="dropdown-item d-flex align-items-center" to={`${import.meta.env.BASE_URL}sign-in`}><i className="ti ti-logout me-2 fs-18"></i>Log Out</Link></li>
                                </ul>
                            </Dropdown.Menu>
                        </Dropdown>

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
