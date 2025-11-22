import React from "react";
import { useLocation, useParams } from "react-router-dom";

// import { useNavigate } from "react-router-dom";
function SidebarComponent() {
  // Destructure first_name, last_name from userDetails
//   const { user_id, first_name, last_name, profile } = userDetails || {};
  const location = useLocation();
//   const handleDashboardClick = () => {
//     navigate("/admin/superadmin-dashboard");
//   };
//   const handleAdminBookingClick = () => {
//     navigate("/admin/booking");
//   };
//   const handleEmployeeDashboardClick = () => {
//     navigate("/admin/employee-dashboard");
//   };
//   const navigate = useNavigate();
const { id } = useParams();

  return (
    <div>
      <div id="sidebar" className="app-sidebar" data-bs-theme="">
        <div
          className="app-sidebar-content"
          data-scrollbar="true"
          data-height="100%"
        >
          <div className="menu">
            <div className="menu-profile bg-gray">
              <div>
                <div className="text-center mt-2">
                  <img
                  src="/assets/img/user/admin.png"
                    // src={`http://192.168.100.131:3001${userDetails.profile}`}
                    className="text-center"
                    style={{ borderRadius: "60%" }}
                    width="80"
                    alt=""
                  />
                </div>
                <div className="menu-profile-info">
                  <div className="text-center fs-4">
                    {/* {first_name && last_name
                      ? `${first_name} ${last_name}`
                      : "User"} */}
                    Admin
                  </div>
                  {/* <div className="text-center fs-6">{user_id}</div> */}
                </div>
              </div>
            </div>

            {/* Super Admin Section */}
            {/* {userRole === "superadmin" && ( */}
              <div className="menu-item has-sub">
                {/* <a
                  href="/dashboard"
                  className="menu-link mb-1 active"
                //   onClick={handleDashboardClick}
                >
                  <div className="menu-icon text-dark">
                    <i className="fa fa-dashboard"></i>
                  </div>
                  <div className="menu-text fs-4">ໜ້າຫຼັກ</div>
                </a>
                <div>
                  <div
                    className={`menu-item fs-5 ${
                      location.pathname === "/dashboard" ? "active" : ""
                    }`}
                  >
                    <a
                      href="/dashboard"
                      className="menu-link mb-1"
                    //   onClick={handleDashboardClick}
                    >
                      <div className="menu-text">ໜ້າຫຼັກ</div>
                    </a>
                  </div>
                </div> */}
                {(location.pathname.startsWith("/ownerparty/") || location.pathname.startsWith("/finance/") || location.pathname.startsWith("/note/")) && (
                  <>
                  
                    <a type="button" className="menu-link mb-1">
                      <div className="menu-icon text-dark">
                        <i className="fa fa-bar-chart"></i>
                      </div>
                      <div className="menu-text fs-4">ເມນູ</div>
                      <div className="menu-caret"></div>
                    </a>
                    <div className="menu-submenu">
                      <div
                        className={`menu-item fs-5 ${
                          location.pathname === "/dashboard" ? "active" : ""
                        }`}
                      >
                        <a href="/dashboard" className="menu-link mb-1">
                          <div className="menu-text">
                            <i className="fas fa-dashboard mx-1"></i>ໜ້າຫຼັກ
                          </div>
                        </a>
                      </div>
                      <div
                        className={`menu-item fs-5 ${
                          location.pathname === `/finance/${id}` ? "active" : ""
                        }`}
                      >
                        <a href={`/finance/${id}`} className="menu-link mb-1">
                          <div className="menu-text">
                            <i className="fas fa-dollar-sign mx-1"></i>ລາຍຮັບ-ລາຍຈ່າຍ
                          </div>
                        </a>
                      </div>

                      <div
                        className={`menu-item fs-5 ${
                          location.pathname === `/note/${id}` ? "active" : ""
                        }`}
                      >
                        <a href={`/note/${id}`} className="menu-link mb-1">
                          <div className="menu-text">
                            <i className="fas fa-edit mx-1"></i> ບັນທຶກ
                          </div>
                        </a>
                      </div>
                    </div>
                  </>
                )}

              </div>
            {/* )} */}

          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarComponent;
