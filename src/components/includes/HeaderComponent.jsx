import React from "react";
import Swal from "sweetalert2";
function HeaderComponent() {
  const confirmLogout = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "ອອກຈາກລະບົບແທ້ ຫຼື ບໍ່?",
      text: "ທ່ານແນ່ໃຈບໍ ທີ່ຈະອອກຈາກລະບົບ",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "ຍົກເລີກ",
      confirmButtonColor: "#48A6A7",
      cancelButtonColor: "#d33",
      confirmButtonText: "ຢືນຢັນ!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };
  // const showSuccessMessage = () => {
  //   Swal.fire({
  //     title: "ອອກຈາກລະບົບ!",
  //     text: "ອອກຈາກລະບົບສຳເລັດແລ້ວ.",
  //     icon: "success",
  //     timer: 2000,
  //     position: "top-end",
  //     toast: true,
  //     showConfirmButton: false,
  //   });
  // };
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token

    window.location.href = "/"; // Redirect to login
  };
  return (
    <div className="sticky-top">
      {/* <!-- BEGIN #header --> */}
      <div id="header" className="app-header bg-light">
        {/* <!-- BEGIN navbar-header --> */}
        <div className="navbar-header">
          <a href="#" className="navbar-brand">
            <img
              src="../assets/img/logo/logo.png"
              className="rounded-circle mx-2"
              alt=""
            />
            <b className="me-3px ">ລະບົບຈັດການການເງິນຂອງງານຕ່າງໆ</b>
          </a>
          <button
            type="button"
            className="navbar-mobile-toggler"
            data-toggle="app-sidebar-mobile"
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        {/* <!-- END navbar-header --> */}
        {/* <!-- BEGIN header-nav --> */}
        <div className="navbar-nav">
          <div className="navbar-item navbar-form"></div>
          <div className="navbar-item dropdown">
            {/* <a
              href="#"
              data-bs-toggle="dropdown"
              className="navbar-link dropdown-toggle icon"
            >
              <i className="fa fa-bell"></i>
              <span className="badge">5</span>
            </a> */}
            <div className="dropdown-menu media-list dropdown-menu-end">
              <div className="dropdown-header">NOTIFICATIONS (5)</div>
              <a href="javascript:;" className="dropdown-item media">
                <div className="media-left">
                  <i className="fa fa-bug media-object bg-gray-500"></i>
                </div>
                <div className="media-body">
                  <h6 className="media-heading">
                    Server Error Reports{" "}
                    <i className="fa fa-exclamation-circle text-danger"></i>
                  </h6>
                  <div className="text-muted fs-10px">3 minutes ago</div>
                </div>
              </a>
              <a href="javascript:;" className="dropdown-item media">
                <div className="media-left">
                  <img
                    src="../assets/img/user/user-1.jpg"
                    className="media-object"
                    alt=""
                  />
                  <i className="fab fa-facebook-messenger text-blue media-object-icon"></i>
                </div>
                <div className="media-body">
                  <h6 className="media-heading">John Smith</h6>
                  <p>
                    Quisque pulvinar tellus sit amet sem scelerisque tincidunt.
                  </p>
                  <div className="text-muted fs-10px">25 minutes ago</div>
                </div>
              </a>
              <a href="javascript:;" className="dropdown-item media">
                <div className="media-left">
                  <img
                    src="../assets/img/user/user-2.jpg"
                    className="media-object"
                    alt=""
                  />
                  <i className="fab fa-facebook-messenger text-blue media-object-icon"></i>
                </div>
                <div className="media-body">
                  <h6 className="media-heading">Olivia</h6>
                  <p>
                    Quisque pulvinar tellus sit amet sem scelerisque tincidunt.
                  </p>
                  <div className="text-muted fs-10px">35 minutes ago</div>
                </div>
              </a>
              <a href="javascript:;" className="dropdown-item media">
                <div className="media-left">
                  <i className="fa fa-plus media-object bg-gray-500"></i>
                </div>
                <div className="media-body">
                  <h6 className="media-heading"> New User Registered</h6>
                  <div className="text-muted fs-10px">1 hour ago</div>
                </div>
              </a>
              <a href="javascript:;" className="dropdown-item media">
                <div className="media-left">
                  <i className="fa fa-envelope media-object bg-gray-500"></i>
                  <i className="fab fa-google text-warning media-object-icon fs-14px"></i>
                </div>
                <div className="media-body">
                  <h6 className="media-heading"> New Email From John</h6>
                  <div className="text-muted fs-10px">2 hour ago</div>
                </div>
              </a>
              <div className="dropdown-footer text-center">
                <a href="javascript:;" className="text-decoration-none">
                  View more
                </a>
              </div>
            </div>
          </div>

          <div className="navbar-item navbar-user dropdown">
            <a
              href="#"
              className="navbar-link d-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <i className="fas fa-sign-out-alt mx-1"></i>
              <span>
                <a
                  href="login.html"
                  onClick={confirmLogout}
                  className="dropdown-item fw-bold fs-5 m-2"
                >
                  ອອກຈາກລະບົບ
                </a>
              </span>
            </a>
            {/* <div className="dropdown-menu dropdown-menu-end me-1">
              <a href="extra_profile.html" className="dropdown-item">
                Edit Profile
              </a>
              <a
                href="email_inbox.html"
                className="dropdown-item d-flex align-items-center"
              >
                Inbox
                <span className="badge bg-danger rounded-pill ms-auto pb-4px">
                  2
                </span>
              </a>
              <a href="calendar.html" className="dropdown-item">
                Calendar
              </a>
              <a href="extra_settings_page.html" className="dropdown-item">
                Settings
              </a>
              <div className="dropdown-divider"></div>
            </div> */}
          </div>
        </div>
        {/* <!-- END header-nav --> */}
      </div>
    </div>
  );
}

export default HeaderComponent;
