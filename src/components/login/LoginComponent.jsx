

function LoginComponent() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-sm"
        style={{
          width: "400px",
          borderRadius: "1rem", // smooth rounded corners
          border: "1px solid #ddd", // subtle border
        }}
      >
        <div className="card-body p-4">
          <p className="text-center mb-4">
            <img
              src="/assets/img/logo/logo.png"
              className="rounded-circle"
              width="120"
              alt="Logo"
            />
          </p>

          <h2 className="card-title text-center mb-4">
            ເຂົ້າສູ່ລະບົບ
          </h2>

          <form className="mx-2">
            <div className="mb-3">
              <label htmlFor="phone" className="form-label fw-bold">
                ເບີໂທ <span className="text-danger">*</span>
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
                  required
                  pattern="020[0-9]{8}"
                  title="Enter a valid Lao phone number (020XXXXXXXX)"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-bold">
                ລະຫັດຜ່ານ <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="ລະຫັດຜ່ານ"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              <i className="fas fa-sign-in-alt me-2"></i>ເຂົ້າສູ່ລະບົບ
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent