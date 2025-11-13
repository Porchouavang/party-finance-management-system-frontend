import React from "react";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
function SidebarComponent() {
  // Destructure first_name, last_name from userDetails
//   const { user_id, first_name, last_name, profile } = userDetails || {};
//   const location = useLocation();
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
  return (
    <div>
      <div id="sidebar" className="app-sidebar" data-bs-theme="">
        <div
          className="app-sidebar-content bg-light"
          data-scrollbar="true"
          data-height="100%"
        >
          <div className="menu">
            <div className="menu-profile bg-light">
              <div>
                <div className="text-center mt-2">
                  <img
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
                  </div>
                  {/* <div className="text-center fs-6">{user_id}</div> */}
                </div>
              </div>
            </div>

            {/* Super Admin Section */}
            {/* {userRole === "superadmin" && ( */}
              <div className="menu-item has-sub">
                <a
                  href="/admin/superadmin-dashboard"
                  className="menu-link mb-1 active"
                //   onClick={handleDashboardClick}
                >
                  <div className="menu-icon text-dark">
                    <i className="fa fa-dashboard"></i>
                  </div>
                  <div className="menu-text fs-4">ໜ້າຫຼັກ</div>
                </a>
                <div></div>
                <a type="button" className="menu-link mb-1">
                  <div className="menu-icon text-dark">
                    <i className="fa fa-cogs"></i>
                  </div>
                  <div className="menu-text fs-4">ຈັດການຂໍ້ມູນພື້ນຖານ</div>
                  <div className="menu-caret"></div>
                </a>
                <div className="menu-submenu">
                  <div
                    className={`menu-item fs-5 ${
                      location.pathname === "/admin/employee" ? "active" : ""
                    }`}
                  >
                    <a href="/admin/employee" className="menu-link mb-1">
                      <div className="menu-text">
                        <i className="fas fa-users-cog mx-1"></i>ຂໍ້ມູນພະນັກງານ
                      </div>
                    </a>
                  </div>

                  <div
                    className={`menu-item fs-5 ${
                      location.pathname === "/admin/room" ? "active" : ""
                    }`}
                  >
                    <a href="/admin/room" className="menu-link mb-1">
                      <div className="menu-text">
                        <i className="fas fa-hotel mx-1"></i>ຫ້ອງ
                      </div>
                    </a>
                  </div>
                  <div
                    className={`menu-item fs-5 ${
                      location.pathname === "/admin/timework" ? "active" : ""
                    }`}
                  >
                    <a href="/admin/timework" className="menu-link mb-1">
                      <div className="menu-text">
                        <i className="fas fa-clock mx-1"></i>ເວລາເຮັດວຽກ
                      </div>
                    </a>
                  </div>
                  {/* <div className={`menu-item fs-5 ${location.pathname === "/admin/report/booking" ? "active" : ""}`}>
                    <a href="/admin/slide" className="menu-link mb-1">
                      <div className="menu-text">
                        <i className="fas fa-image mx-1"></i>ສະໄລ້
                      </div>
                    </a>
                  </div> */}
                  <div
                    className={`menu-item fs-5 ${
                      location.pathname === "/admin/qrcode" ? "active" : ""
                    }`}
                  >
                    <a href="/admin/qrcode" className="menu-link mb-1">
                      <div className="menu-text">
                        <i className="fas fa-money-check mx-1"></i>ບັນຊີທະນາຄານ
                      </div>
                    </a>
                  </div>
                  {/* <div
                    className={`menu-item fs-5 ${
                      location.pathname === "/admin/customer" ? "active" : ""
                    }`}
                  >
                    <a href="/admin/customer" className="menu-link mb-1">
                      <div className="menu-text">
                        <i className="fas fa-users-cog mx-1"></i>ລູກຄ້າ
                      </div>
                    </a>
                  </div> */}
                </div>
                {/* <a
                  href="/admin/booking"
                  onClick={handleAdminBookingClick}
                  className="menu-link mb-1"
                >
                  <div className="menu-icon text-dark">
                    <i className="fa fa-calendar-check"></i>
                  </div>
                  <div className="menu-text fs-4">ຈອງຫ້ອງ</div>
                </a>
                <div></div> */}
              </div>
            {/* )} */}

          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarComponent;
