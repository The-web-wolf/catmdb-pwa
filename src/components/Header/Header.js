import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import Offcanvas from "../Offcanvas";
import NestedMenu from "../NestedMenu";
import { visitorMenu, userMenu } from "./menuItems";


const Header = () => {
  const gContext = useContext(GlobalContext);

  return (
    <>
      <button
        className={`navbar-toggler btn-close-off-canvas ${
          gContext.visibleOffCanvas ? "collapsed" : ""
        }`}
        type="button"
        data-toggle="collapse"
        data-target="#mobile-menu"
        aria-controls="mobile-menu"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={gContext.toggleOffCanvas}
      >
        <i className="fa fa-ellipsis-h d-block"></i>
      </button>
      <Offcanvas
        show={gContext.visibleOffCanvas}
        onHideOffcanvas={gContext.toggleOffCanvas}
      >
        <NestedMenu menuItems={
          gContext.isLoggedIn ? userMenu : visitorMenu
        } />
      </Offcanvas>
    </>
  );
};
export default Header;
