import React from 'react'
import HeaderComponent from './includes/HeaderComponent'
import SidebarComponent from './includes/SidebarComponent'

function DashboardComponent() {
    const bgColor = [
        'info',
        'success',
        'danger',
    ]
    const items = [
        'ງານດອງ',
        'ງານລ້ຽງ',
        'ງານສົບ',
    ]
  return (
    <div>
        <HeaderComponent />
        <SidebarComponent />
        <div id="content" className="app-content">
        {/* <!-- BEGIN breadcrumb --> */}
        <ol className="breadcrumb float-xl-end fs-5">
          <li className="breadcrumb-item">
            <a href="javascript:;">ໜ້າຫຼັກ</a>
          </li>
          <li className="breadcrumb-item active">ຂໍ້ມູນປະເພດງານ</li>
        </ol>
        {/* <!-- END breadcrumb --> */}
        {/* <!-- BEGIN page-header --> */}
        <h1 className="page-header">ລະບົບຈັດການການເງິນຂອງງານຕ່າງໆ</h1>
        {/* <!-- END page-header --> */}

        {/* <!-- BEGIN row --> */}
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-md-5">
              <div className="row">
                <div className="col-md-4">
                  <a
                    className="btn btn-primary"
                    href="#modal-add-employee"
                    data-bs-toggle="modal"
                  >
                    <i className="fa fa-plus mx-1"></i>ເພີ່ມປະເພດງານໃໝ່
                  </a>
                </div>
                <div className="col-md-5 mx-2">
                  
                </div>
                {/* <div className="col-md-4">
                  <select name="" id="" className="form-select">
                    <option value="">ຕ້ອນຮັບ</option>
                    <option value="">ການເງິນ</option>
                  </select>
                </div> */}
              </div>
            </div>
            <div className="col-md-7">
              
            </div>
           
          </div>
          <br />
        <div className="row">
          {/* <!-- BEGIN col-3 --> */}
          {items.map((itm) => (
             <div className="col-xl-3  col-md-6">
            <div className={`widget widget-stats bg-${bgColor[items.indexOf(itm)]}`}>


              <div className="stats-icon">
                <p className="text-white">₭</p>
                {/* <i className="fa fa-desktop"></i> */}
              </div>
              <div className="stats-info">
                <h4 className="fs-3">{itm}</h4>
                <p>
                  {/* {allIncome} */}
                </p>
              </div>
            </div>
          </div>))}
        </div>
          <div className="modal fade" id="modal-edit-employee">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header bg-success">
                  <h4 className="modal-title text-white">ແກ້ໄຂຂໍ້ມູນປະເພດງານ</h4>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-hidden="true"
                  ></button>
                </div>

                <form
                //   onSubmit={(e) =>
                //     handleFormUpdate(e, selectedEmployee?.user_id)
                //   }
                >
                  <div className="modal-body">
                    <div className="row">
                      {/* <div className="col-md-2 mb-3">
                        <div className="label mb-1 fs-5">
                          ເພດ <span className="text-danger">*</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p>
                            <input
                              type="radio"
                              name="gender"
                              value="ຊາຍ" // Male
                              onChange={(e) => {
                                setUpdateEmployee({
                                  ...updateEmployee,
                                  gender: e.target.value, // Correctly set gender
                                });
                              }}
                              checked={updateEmployee.gender === "ຊາຍ"}
                            />
                            ຊາຍ
                          </p>
                          <p>
                            <input
                              type="radio"
                              name="gender"
                              value="ຍິງ" // Female
                              onChange={(e) => {
                                setUpdateEmployee({
                                  ...updateEmployee,
                                  gender: e.target.value, // Correctly set gender
                                });
                              }}
                              checked={updateEmployee.gender === "ຍິງ"}
                            />
                            ຍິງ
                          </p>
                          <p>
                            <input
                              type="radio"
                              name="gender"
                              value="ອື່ນໆ" // Other
                              onChange={(e) => {
                                setUpdateEmployee({
                                  ...updateEmployee,
                                  gender: e.target.value, // Correctly set gender
                                });
                              }}
                              checked={updateEmployee.gender === "ອື່ນໆ"}
                            />
                            ອື່ນໆ
                          </p>
                        </div>
                      </div> */}
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ຊື່ <span className="text-danger">*</span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="first_name"
                          placeholder="ກະລຸນາປ້ອນຊື່"
                        //   value={updateEmployee.first_name}
                        //   onChange={(e) =>
                        //     setUpdateEmployee({
                        //       ...updateEmployee,
                        //       first_name: e.target.value,
                        //     })
                        //   }
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ນາມສະກຸນ <span className="text-danger">*</span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="last_name"
                          placeholder="ກະລຸນາປ້ອນນາມສະກຸນ"
                        //   value={updateEmployee.last_name}
                        //   onChange={(e) =>
                        //     setUpdateEmployee({
                        //       ...updateEmployee,
                        //       last_name: e.target.value,
                        //     })
                        //   }
                          required
                        />
                      </div>
                      {/* <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ອີເມວ <span className="text-danger">*</span>
                        </div>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="ກະລຸນາປ້ອນອີເມວ"
                          name="email"
                          value={updateEmployee.email}
                          onChange={(e) =>
                            setUpdateEmployee({
                              ...updateEmployee,
                              email: e.target.value,
                            })
                          }
                          required
                        />
                      </div> */}
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ລະຫັດຜ່ານ <span className="text-danger">*</span>
                        </div>
                        <input
                          type="text"
                          name="password"
                          className="form-control"
                          placeholder="*********"
                        //   value={updateEmployee.password}
                        //   onChange={(e) =>
                        //     setUpdateEmployee({
                        //       ...updateEmployee,
                        //       password: e.target.value,
                        //     })
                        //   }
                          required
                        />
                      </div>

                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ເບີໂທ <span className="text-danger">*</span>
                        </div>
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          placeholder="ກະລຸນາປ້ອນເບີໂທ"
                        //   value={updateEmployee.phone}
                        //   onChange={(e) =>
                        //     setUpdateEmployee({
                        //       ...updateEmployee,
                        //       phone: e.target.value,
                        //     })
                        //   }
                          required
                        />
                      </div>
                      {/* <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ວັນເດືອນປີເກີດ <span className="text-danger">*</span>
                        </div>
                        <input
                          type="date"
                          name="birthday"
                          className="form-control"
                          placeholder="ກະລຸນາປ້ອນວັນເດືອນປີເກີດ"
                          value={updateEmployee.birthday}
                          onChange={(e) =>
                            setUpdateEmployee({
                              ...updateEmployee,
                              birthday: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ອາຍຸ <span className="text-danger">*</span>
                        </div>
                        <input
                          type="number"
                          name="age"
                          className="form-control"
                          placeholder="ກະລຸນາປ້ອນອາຍຸ"
                          value={updateEmployee.age}
                          onChange={(e) =>
                            setUpdateEmployee({
                              ...updateEmployee,
                              age: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ແຂວງ <span className="text-danger">*</span>
                        </div>
                        <select
                          className="form-control mt-2"
                          name="province_id"
                          required
                          onChange={handleProvinceChange}
                        >
                          <option value="">-- ເລືອກແຂວງ --</option>
                          {provinces.map((pro) => (
                            <option
                              key={pro.province_id}
                              value={pro.province_id}
                            >
                              {pro.province_name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ເມືອງ <span className="text-danger">*</span>
                        </div>
                        <select
                          className="form-control mt-2"
                          value={updateEmployee.district_id}
                          onChange={(e) =>
                            setUpdateEmployee({
                              ...updateEmployee,
                              district_id: e.target.value,
                            })
                          }
                          required
                          name="district_id"
                        >
                          <option value="">-- ເລືອກແຂວງກ່ອນ --</option>
                          {districts.map((district) => (
                            <option
                              key={district.district_id}
                              value={district.district_id}
                            >
                              {district.district_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ບ້ານ <span className="text-danger">*</span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="village"
                          placeholder="ກະລຸນາປ້ອນບ້ານ"
                          value={updateEmployee.village}
                          onChange={(e) =>
                            setUpdateEmployee({
                              ...updateEmployee,
                              village: e.target.value,
                            })
                          }
                          required
                        />
                      </div> */}
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ຕຳແໜ່ງ <span className="text-danger">*</span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="position"
                          placeholder="ກະລຸນາປ້ອນຕຳແໜ່ງ"
                        //   value={updateEmployee.position}
                        //   onChange={(e) =>
                        //     setUpdateEmployee({
                        //       ...updateEmployee,
                        //       position: e.target.value,
                        //     })
                        //   }
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ເວລາເຮັດວຽກ <span className="text-danger">*</span>
                        </div>
                        <select
                          className="form-control mt-2"
                          name="time_work_id"
                        //   value={updateEmployee.time_work_id}
                        //   onChange={(e) =>
                        //     setUpdateEmployee({
                        //       ...updateEmployee,
                        //       time_work_id: e.target.value,
                        //     })
                        //   }
                          required
                        >
                          <option value="">-- ເລືອກເວລາເຮັດວຽກ --</option>
                          {/* {TimeWorks.map((tmw) => (
                            <option
                              key={tmw.time_work_id}
                              value={tmw.time_work_id}
                            >
                              {tmw.time_work}
                            </option>
                          ))} */}
                        </select>
                      </div>
                      {/* <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ໂປຣໄຟລ໌ <span className="text-danger">*</span>
                        </div>
                        <input
                          type="file"
                          className="form-control"
                          name="profile"
                          placeholder="ກະລຸນາປ້ອນເບີໂທ"
                          onChange={(e) =>
                            setUpdateEmployee({
                              ...updateEmployee,
                              profile: e.target.files[0],
                            })
                          }
                          required
                        />
                      </div>
                      {imagePreview && (
                        <div className="col-md-3 text-center">
                          <img
                            src={imagePreview}
                            alt="QR Code Preview"
                            className="img-fluid mt-2"
                            style={{ maxWidth: "80%" }}
                            required
                          />
                        </div>
                      )}
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ເລືອກສິດ <span className="text-danger">*</span>
                        </div>
                        <select
                          className="form-control mt-2"
                          name="role_id"
                          value={updateEmployee.role_id}
                          onChange={(e) =>
                            setUpdateEmployee({
                              ...updateEmployee,
                              role_id: e.target.value,
                            })
                          }
                          required
                        >
                          <option value="">-- ເລືອກສິດຜູ້ໃຊ້ --</option>
                          {Roles.map((rl) => (
                            <option key={rl.id} value={rl.id}>
                              {rl.title}
                            </option>
                          ))}
                        </select>
                      </div> */}
                    </div>
                  </div>
                  <div className="modal-footer d-flex justify-content-between">
                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      className="btn btn-danger"
                    >
                      <i className="fa fa-times mx-1"></i>ຍົກເລີກ
                    </button>
                    <button className="btn btn-success">
                      <i className="fa fa-print mx-1"></i>ເພີ່ມໃໝ່
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal fade" id="modal-add-employee">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header bg-primary">
                  <h4 className="modal-title text-white">ເພີ່ມປະເພດງານໃໝ່</h4>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-hidden="true"
                  ></button>
                </div>
                <form>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-2 mb-3">
                        <div className="label mb-1 fs-5">
                          ເພດ <span className="text-danger">*</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p>
                            <input
                              type="radio"
                              name="gender"
                              value="ຊາຍ"
                            //   onChange={handleInputChange}
                            //   checked={newEmployee.gender === "ຊາຍ"}
                            />
                            ຊາຍ
                          </p>
                          <p>
                            <input
                              type="radio"
                              name="gender"
                              value="ຍິງ"
                            //   onChange={handleInputChange}
                            //   checked={newEmployee.gender === "ຍິງ"}
                            />
                            ຍິງ
                          </p>
                          <p>
                            <input
                              type="radio"
                              name="gender"
                              value="ອື່ນໆ"
                            //   onChange={handleInputChange}
                            //   checked={newEmployee.gender === "ອື່ນໆ"}
                            />
                            ອື່ນໆ
                          </p>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ຊື່ <span className="text-danger">*</span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="first_name"
                          placeholder="ກະລຸນາປ້ອນຊື່"
                        //   value={newEmployee.first_name}
                        //   onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ນາມສະກຸນ <span className="text-danger">*</span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="last_name"
                          placeholder="ກະລຸນາປ້ອນນາມສະກຸນ"
                        //   value={newEmployee.last_name}
                        //   onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ອີເມວ <span className="text-danger">*</span>
                        </div>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="ກະລຸນາປ້ອນອີເມວ"
                          name="email"
                        //   value={newEmployee.email}
                        //   onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ລະຫັດຜ່ານ <span className="text-danger">*</span>
                        </div>
                        <input
                          type="text"
                          name="password"
                          className="form-control"
                          placeholder="*********"
                        //   value={newEmployee.password}
                        //   onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ເບີໂທ <span className="text-danger">*</span>
                        </div>
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          placeholder="ກະລຸນາປ້ອນເບີໂທ"
                        //   value={newEmployee.phone}
                        //   onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ວັນເດືອນປີເກີດ <span className="text-danger">*</span>
                        </div>
                        <input
                          type="date"
                          name="birthday"
                          className="form-control"
                          placeholder="ກະລຸນາປ້ອນວັນເດືອນປີເກີດ"
                        //   value={newEmployee.birthday}
                        //   onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ອາຍຸ <span className="text-danger">*</span>
                        </div>
                        <input
                          type="number"
                          name="age"
                          className="form-control"
                          placeholder="ກະລຸນາປ້ອນອາຍຸ"
                        //   value={newEmployee.age}
                        //   onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ແຂວງ <span className="text-danger">*</span>
                        </div>
                        <select
                          className="form-control mt-2"
                          name="province_id"
                          required
                        //   onChange={handleProvinceChange}
                        >
                          <option value="">-- ເລືອກແຂວງ --</option>
                          {/* {provinces.map((pro) => (
                            <option
                              key={pro.province_id}
                              value={pro.province_id}
                            >
                              {pro.province_name}
                            </option>
                          ))} */}
                        </select>
                      </div>

                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ເມືອງ <span className="text-danger">*</span>
                        </div>
                        <select
                          className="form-control mt-2"
                        //   value={newEmployee.district_id}
                        //   onChange={handleInputChange}
                          required
                          name="district_id"
                        >
                          <option value="">-- ເລືອກແຂວງກ່ອນ --</option>
                          {/* {districts.map((district) => (
                            <option
                              key={district.district_id}
                              value={district.district_id}
                            >
                              {district.district_name}
                            </option>
                          ))} */}
                        </select>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ບ້ານ <span className="text-danger">*</span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="village"
                          placeholder="ກະລຸນາປ້ອນບ້ານ"
                        //   value={newEmployee.village}
                        //   onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ຕຳແໜ່ງ <span className="text-danger">*</span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="position"
                          placeholder="ກະລຸນາປ້ອນຕຳແໜ່ງ"
                        //   value={newEmployee.position}
                        //   onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ເວລາເຮັດວຽກ <span className="text-danger">*</span>
                        </div>
                        <select
                          className="form-control mt-2"
                          name="time_work_id"
                        //   value={newEmployee.time_work_id}
                        //   onChange={handleInputChange}
                          required
                        >
                          <option value="">-- ເລືອກເວລາເຮັດວຽກ --</option>
                          {/* {TimeWorks.map((tmw) => (
                            <option
                              key={tmw.time_work_id}
                              value={tmw.time_work_id}
                            >
                              {tmw.time_work}
                            </option>
                          ))} */}
                        </select>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ໂປຣໄຟລ໌ <span className="text-danger">*</span>
                        </div>
                        <input
                          type="file"
                          className="form-control"
                          name="profile"
                          placeholder="ກະລຸນາປ້ອນເບີໂທ"
                        //   onChange={handleInputChange}
                          required
                        />
                      </div>
                      {/* {imagePreview && (
                        <div className="col-md-3 text-center">
                          <img
                            src={imagePreview}
                            alt="QR Code Preview"
                            className="img-fluid mt-2"
                            style={{ maxWidth: "80%" }}
                            required
                          />
                        </div>
                      )} */}
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          ເລືອກສິດ <span className="text-danger">*</span>
                        </div>
                        <select
                          className="form-control mt-2"
                          name="role_id"
                        //   value={newEmployee.role_id}
                        //   onChange={handleInputChange}
                          required
                        >
                          <option value="">-- ເລືອກສິດຜູ້ໃຊ້ --</option>
                          {/* {Roles.map((rl) => (
                            <option key={rl.id} value={rl.id}>
                              {rl.title}
                            </option>
                          ))} */}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer d-flex justify-content-between">
                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      className="btn btn-danger"
                    >
                      <i className="fa fa-times mx-1"></i>ຍົກເລີກ
                    </button>
                    <button className="btn btn-primary">
                      <i className="fa fa-print mx-1"></i>ເພີ່ມໃໝ່
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div id="printableEmployeeI">
            <div className="modal fade" id="modal-view-employee">
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header bg-success">
                    <h4 className="modal-title text-white">
                      ຂໍ້ມູນປະເພດງານລະຫັດທີ່:{" "}
                      <span className="text-dark">
                        {/* {updateEmployee.user_id} */}
                      </span>
                    </h4>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-hidden="true"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-4"></div>
                      <div className="col-md-4">
                        {/* {imagePreview && (
                          <div className=" text-center">
                            <img
                              src={imagePreview}
                              alt="QR Code Preview"
                              className="img-fluid mt-2 rounded-5"
                              style={{ maxWidth: "40%" }}
                              required
                            /> */}
                            <p className="mt-2 fs-5 fw-bold">ໂປຣໄຟລ໌</p>
                          </div>
                        {/* )} */}
                      </div>
                      <div className="col-md-4"></div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          {/* <b>ເພດ:</b> {updateEmployee.gender} */}
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          {/* <b>ຊື່:</b> {updateEmployee.first_name} */}
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          {/* <b>ນາມສະກຸນ:</b> {updateEmployee.last_name} */}
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          {/* <b>ອີເມວ:</b> {updateEmployee.email} */}
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          {/* <b>ເບີໂທ:</b> {updateEmployee.phone} */}
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          {/* <b>ວັນເດືອນປີເກີດ:</b> {updateEmployee.birthday} */}
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          {/* <b>ອາຍຸ:</b> {updateEmployee.age} ປີ */}
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          {/* <b>ບ້ານ:</b> {updateEmployee.village} */}
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          {/* <b>ເມືອງ:</b> {updateEmployee.district_name} */}
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          {/* <b>ແຂວງ:</b> {updateEmployee.province_name} */}
                        </div>
                      </div>

                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          {/* <b>ຕຳແໜ່ງ:</b> {updateEmployee.position} */}
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          {/* <b>ເວລາເຮັດວຽກ:</b> {updateEmployee.time_work} */}
                        </div>
                      </div>

                      <div className="col-md-3 mb-3">
                        <div className="label mb-1 fs-5">
                          {/* <b>ສະຖານະສິດ:</b> {updateEmployee.title} */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer d-flex justify-content-between">
                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      className="btn btn-danger"
                    >
                      <i className="fa fa-times mx-1"></i>ຍົກເລີກ
                    </button>
                    <button
                    //   onClick={() => handlePrint(updateEmployee.user_id)}
                      className="btn btn-success"
                    >
                      <i className="fa fa-print mx-1"></i>ປຼິ່ນ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default DashboardComponent