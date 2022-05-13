import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

const Sidebar = (props) => {
  const gContext = useContext(GlobalContext);
  return (
    <>
      {gContext.userData && (
        <div {...props}>
          <div className="pl-lg-5">
            {/* <!-- Top Start --> */}
            <div className="bg-white shadow-9 rounded-4">
              <div className="px-5 pt-10 text-center border-bottom border-mercury">
                <h4 className="mb-0">
                  <span className="text-black-2 font-size-6 font-weight-semibold">
                    {gContext.userData.firstName} {gContext.userData.lastName}
                  </span>
                </h4>
                <p className="mb-8">
                  <span className="text-gray font-size-4">
                    {gContext.userData.username}
                  </span>
                </p>
              </div>
              {/* <!-- Bottom Start --> */}
              <div className="px-9 pt-lg-5 pt-9 pt-xl-9 pb-5">
                <h5 className="text-info mb-8 font-size-5">Contact Info</h5>
                {/* <!-- Single List --> */}
                <div className="mb-7">
                  <p className="font-size-4 mb-0">Location</p>
                  <h5 className="font-size-4 font-weight-semibold mb-0 text-black-2 text-break">
                    {gContext.userData.location}
                  </h5>
                </div>
                {/* <!-- Single List --> */}
                {/* <!-- Single List --> */}
                <div className="mb-7">
                  <p className="font-size-4 mb-0">E-mail</p>
                  <h5 className="font-size-4 font-weight-semibold mb-0">
                    <span className="text-black-2 text-break">
                      {gContext.userData.email}
                    </span>
                  </h5>
                </div>
                {/* <!-- Single List --> */}
              </div>
              {/* <!-- Bottom End --> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
