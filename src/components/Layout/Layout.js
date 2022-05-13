import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useContext,
  useRef,
} from "react";

import styled, { ThemeProvider } from "styled-components";
import { Helmet } from "react-helmet";
import AOS from "aos";

import Header from "../Header";

import GlobalContext from "../../context/GlobalContext";

import GlobalStyle from "../../utils/globalStyle";

import imgFavicon from "../../assets/brand.png";

import "../../assets/fonts/fontawesome-5/webfonts/fa-brands-400.ttf";
import "../../assets/fonts/fontawesome-5/webfonts/fa-regular-400.ttf";
import "../../assets/fonts/fontawesome-5/webfonts/fa-solid-900.ttf";

import "../../assets/fonts/icon-font/fonts/avasta.ttf";
import "../../assets/fonts/icon-font/css/style.css";

import "../../assets/fonts/icon-font/css/style.css";
import "../../assets/fonts/fontawesome-5/css/all.css";

import "../../scss/bootstrap.scss";
import "../../scss/main.scss";

import { get, merge } from "lodash";

// the full theme object
import { theme as baseTheme } from "../../utils";

const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #08304b;
  z-index: 9999999999;
  opacity: 1;
  visibility: visible;
  transition: all 1s ease-out 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  &.inActive {
    opacity: 0;
    visibility: hidden;
  }
`;

// options for different color modes
const modes = { light: "light", dark: "dark" };

// merge the color mode with the base theme
// to create a new theme object
const getTheme = (mode) =>
  merge({}, baseTheme, {
    colors: get(baseTheme.colors.modes, mode, baseTheme.colors),
  });

const Layout = ({ children, pageContext }) => {
  const gContext = useContext(GlobalContext);

  const [visibleLoader, setVisibleLoader] = useState(true);

  useLayoutEffect(() => {
    AOS.init({ once: true });
    setVisibleLoader(false);
  }, []);

  // Navbar style based on scroll
  const eleRef = useRef();

  useEffect(() => {
    window.addEventListener(
      "popstate",
      function(event) {
        // The popstate event is fired each time when the current history entry changes.
        gContext.closeOffCanvas();
      },
      false
    );
    window.addEventListener(
      "pushState",
      function(event) {
        // The pushstate event is fired each time when the current history entry changes.
        gContext.closeOffCanvas();
      },
      false
    );
  }, [gContext]);

  if (pageContext.layout === "bare") {
    return (
      <ThemeProvider
        theme={
          gContext.themeDark ? getTheme(modes.dark) : getTheme(modes.light)
        }
      >
        <div data-theme-mode-panel-active data-theme="light">
          <GlobalStyle />
          <Helmet>
            <title>CATMDB</title>
            <link rel="icon" type="image/png" href={imgFavicon} />
          </Helmet>
          <Loader id="loading" className={visibleLoader ? "" : "inActive"}>
            <span className="fa fa-spinner fa-spin fa-3x color-light"></span>
          </Loader>
          <div className="site-wrapper overflow-hidden" ref={eleRef}>
            {children}
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <>
      <ThemeProvider
        theme={
          gContext.themeDark ? getTheme(modes.dark) : getTheme(modes.light)
        }
      >
        <div data-theme-mode-panel-active data-theme="light">
          <GlobalStyle />
          <Helmet>
            <title>CATMDB</title>
            <link rel="icon" type="image/png" href={imgFavicon} />
          </Helmet>
          <Loader id="loading" className={visibleLoader ? "" : "inActive"} />
          <div className="site-wrapper overflow-hidden" ref={eleRef}>
            <Header />
            {children}
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};

export default Layout;
