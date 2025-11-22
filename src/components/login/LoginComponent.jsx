
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate for navigation
import Swal from "sweetalert2";
function LoginComponent() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // const handleLogout = () => {
  //   localStorage.removeItem("adminToken"); // Remove token
  //   window.location.href = "/admin/login"; // Redirect to login
  // };
  const [userDetails, setUserDetails] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(userRole);
  console.log(userDetails);
  console.log(loading);
  console.log(error);
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found, please log in.");
        setLoading(false);
        return;
      }

      try {
        // Fetch user details (first_name, last_name, role)
        const responseDetails = await axios.get(
          "http://192.168.100.134:3001/api/user/details", // Make sure this is the correct endpoint for user details
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserDetails(responseDetails.data); // Set the user details

        // Fetch user role
        const responseRole = await axios.get(
          "http://192.168.100.134:3001/api/user/role", // Endpoint to get user role
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserRole(responseRole.data.role); // Set the user role
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user details or role:", err);
        setError("Failed to fetch user details or role.");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);
  const showMessageSuccess = () => {
    Swal.fire({
      title: "ສຳເລັດແລ້ວ",
      text: "ຍິນດີຕ້ອນຮັບເຂົ້າສູ່ລະບົບ.",
      icon: "success",
      timer: 2000,
      position: "top-end",
      toast: true,
      showConfirmButton: false,
    });
  };

  const showMessageError = () => {
    Swal.fire({
      title: "ເກີດຂໍ້ຜິດພາດ!",
      text: "ກະລຸນາລອງອີກຄັ້ງ!",
      icon: "error",
      timer: 2000,
      position: "top-end",
      toast: true,
      showConfirmButton: false,
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://192.168.100.134:3001/api/adminlogin",
        { phone, password }
      );

      const { token, user } = response.data;

      // Store token and user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user)); // ✅ store user object

      console.log("Logged in as:", user);
      if (user.role === "superadmin") {
        navigate("/dashboard");
      } else if (user.role === "employee") {
        navigate("/admin/employee-dashboard");
      } else {
        navigate("/unauthorized"); // or show a message
      }

      showMessageSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
      showMessageError();
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" 
    
      style={{ backgroundImage: "url(/assets/img/bg.webp)" }}>
      <div
        className="card shadow-sm"
        style={{
          width: "400px",
          borderRadius: "1rem", // smooth rounded corners
          border: "1px solid #beb6b6ff", // subtle border
        }}
      >
        <div 
  className="card-body p-4 shadow-lg"
  style={{
    width: "420px",
    borderRadius: "1rem",
    border: "1px solid rgba(255,255,255,0.25)",
    background: "rgba(255, 255, 255, 0.7)",  // Semi-transparent white
    backdropFilter: "blur(10px)",            // Blur like glass
    WebkitBackdropFilter: "blur(10px)",      // Safari support
  }}>
          <p className="text-center mb-4">
            <img
              src="/assets/img/logo/logo.png"
              className="rounded-circle"
              width="120"
              alt="Logo"
            />
          </p>

          <h2 className="card-title text-success text-center mb-4">
            ເຂົ້າສູ່ລະບົບ
          </h2>

           <form className="mx-2" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="phone"
                className="label-form mb-1 fw-bold"
              >
                ເບີໂທ<span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa fa-phone"></i>
                </span>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="form-control"
                  placeholder="020 xx xxx xxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  pattern="020[0-9]{8}"
                  title="Enter a valid Lao phone number (020XXXXXXXX)"
                />
              </div>
            </div>

            <div className="mb-3">
              <label
                htmlFor="password"
                className="label-form mb-1 fw-bold"
              >
                ລະຫັດຜ່ານ<span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="form-control border-right-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ borderRight: 0 }}
                  placeholder="ລະຫັດຜ່ານ"
                  required
                />
                <span
                  className="input-group-text bg-white"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer", borderLeft: 0 }}
                >
                  <i
                    className={`fas ${
                      passwordVisible ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </span>
              </div>
            </div>

            <button type="submit" className="btn btn-success w-100">
              <i className="fas fa-sign-out-alt mx-1 m-2"></i>ເຂົ້າສູ່ລະບົບ
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent