import { Fragment, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { Initialload } from "./contextapi";
import Backtotop from "./components/Common/BackToTop/BackToTop";
import Footer from "./components/Common/Footer/Footer";
import Sidebar from "./components/Common/Sidebar/Sidebar";
import Header from "./components/Common/Header/Header";
import Switcher from "./components/Common/Switcher/Switcher";
import { data$, getState } from "./layout/services/switcherServices";

function App() {
  const [lateLoad, setlateLoad] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const [pageloading, setpageloading] = useState(false);

  useEffect(() => {
    setlateLoad(true);
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;

      if (progressRef.current) {
        progressRef.current.style.width = `${scrollPercent}%`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [variable, setVariable] = useState(getState());

  useEffect(() => {
    const subscription = data$.subscribe((e) => {
      setVariable(e);
    });

    return () => subscription.unsubscribe();
  }, []);

  const containerclass = variable.dataPageStyle === "flat" ? "main-body-container" : "";

  return (
    <Fragment>
      <Initialload.Provider value={{ pageloading, setpageloading }}>
        <div style={{ display: `${lateLoad ? "block" : "none"}` }}>
          <div ref={progressRef} className="progress-top-bar" />
          <Switcher />
          <div className="page">
            <Header />
            <Sidebar />
            <div className="main-content app-content">
              <div className={`container-fluid page-container ${containerclass}`}>
                <Outlet />
              </div>
            </div>
            <Footer />
          </div>
          <Backtotop />
        </div>
      </Initialload.Provider>
    </Fragment>
  );
}

export default App;

