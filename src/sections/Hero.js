import React from "react";
import imgP from "../assets/image/patterns/globe-pattern.png";
import { Link } from "gatsby";
import Title from "../components/Core/Title";
import Text from "../components/Core/Text";

const styles = {
  atmbutton: {
    borderRadius: "50px",
    fontSize: "16px",
  },
  container:{
    height:"100vh"
  }
};

const Hero = () => {
  return (
    <>
      {/* <!-- Hero Area --> */}
      <div className="position-relative z-index-1 bg-squeeze pt-26 pt-lg-34 pb-20 pb-lg-30 d-flex align-items-center dark-mode-texts" style={styles.container}>
        <div className="pos-abs-tr h-100  z-index-n1">
          <img src={imgP} alt="Map background image" className="h-100" />
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6 text-left">
              <Title
                variant="pre"
                className="font-size-5 font-weight-bold text-primary"
              >
                The #1 Crypto ATM Database
              </Title>
              <Title variant="section" className="mb-7">
                Find the crypto ATM with the lowest fees near you
              </Title>
              <Text className="mb-5 text-black">
                Crypto ATM DB (CATMDB) gives you access to thousands of ATMs
                around the world with user-reported feedback
              </Text>
              <Link
                style={styles.atmbutton}
                to="/locate-atm"
                className="btn btn-primary btn-lg text-uppercase  "
              >
                Find an ATM
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
