import React from "react";
import Logo from "../Logo";

const Footer = () => {
  return (
    <>
      <footer className="footer bg-ebony-clay dark-mode-texts">
        <div className="container  pt-12 pt-lg-19 pb-10 pb-lg-19">
          <div className="row">
            <div className="col-lg-4 col-sm-6 mb-lg-0 mb-9">
              {/* <!-- footer logo start --> */}
              <Logo white className="footer-logo mb-14" />
              {/* <!-- footer logo End --> */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
