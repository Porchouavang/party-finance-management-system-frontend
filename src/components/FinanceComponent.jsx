/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import HeaderComponent from "./includes/HeaderComponent";
import SidebarComponent from "./includes/SidebarComponent";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

function FinanceComponent() {
  const { id } = useParams();
  const [Income, setIncome] = useState([]);
  const [newIncome, setNewIncome] = useState({
    income: "",
    income_description: "",
    status: "",
    partyId: id,
  });
  const [Party, setParty] = useState([]);
  const [selectedIncome, setSelectedIncome] = useState(null);
  // const [selectedIncome, setSelectedIncome] = useState(null);
  const [updatedIncome, setUpdatedIncome] = useState({
    income: "",
    income_description: "",
    status: 0,
    partyId: id,
  });
  const [Expenditure, setExpenditure] = useState([]);
  const [newExpenditure, setNewExpenditure] = useState({
    expenditure: "",
    expenditure_description: "",
    status: "",
    partyId: id,
  });

  const [selectedExpenditure, setSelectedExpenditure] = useState(null);
  // const [selectedExpenditure, setSelectedExpenditure] = useState(null);
  const [updatedExpenditure, setUpdatedExpenditure] = useState({
    expenditure: "",
    expenditure_description: "",
    status: 0,
    partyId: id,
  });
  const fetchParty = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://192.168.100.134:3001/api/party/select-by-id/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setParty(data);
    } catch (error) {
      console.error("Error fetching Party:", error);
    }
  };
  useEffect(() => {
    fetchParty(id);
  })
  const fetchIncome = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://192.168.100.134:3001/api/finance/select-income-by-party/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setIncome(data);
    } catch (error) {
      console.error("Error fetching Party:", error);
    }
  };
  const fetchExpenditure = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://192.168.100.134:3001/api/finance/select-expenditure-by-party/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setExpenditure(data);
    } catch (error) {
      console.error("Error fetching Party:", error);
    }
  };
  const handleUpdateIncome = async (e) => {
    e.preventDefault();
    if (!selectedIncome?.id) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://192.168.100.134:3001/api/finance/update-income/${selectedIncome.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // include partyId and ensure numeric types for income/status
          body: JSON.stringify({
            ...updatedIncome,
            partyId: id,
            income:
              updatedIncome.income === "" ? 0 : Number(updatedIncome.income),
            status: Number(updatedIncome.status),
          }),
        }
      );

      const data = await response.json();
      console.log("Updated:", data);

      showMessageSuccess();
      fetchIncome();

      // Close modal
      const modalEl = document.getElementById("modal-edit-income");
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) {
        modal.hide();
        document
          .querySelectorAll(".modal-backdrop")
          .forEach((bd) => bd.remove());
        document.body.classList.remove("modal-open");
      }
    } catch (error) {
      showMessageError();
      console.error("Error updating income:", error);
    }
  };
  const handleUpdateExpenditure = async (e) => {
    e.preventDefault();
    if (!selectedExpenditure?.id) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://192.168.100.134:3001/api/finance/update-expenditure/${selectedExpenditure.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // include partyId and ensure numeric types for Expenditure/status
          body: JSON.stringify({
            ...updatedExpenditure,
            partyId: id,
            expenditure:
              updatedExpenditure.expenditure === ""
                ? 0
                : Number(updatedExpenditure.expenditure),
            status: Number(updatedExpenditure.status),
          }),
        }
      );

      const data = await response.json();
      console.log("Updated:", data);

      showMessageSuccess();
      fetchExpenditure();

      // Close modal
      const modalEl = document.getElementById("modal-edit-expenditure");
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) {
        modal.hide();
        document
          .querySelectorAll(".modal-backdrop")
          .forEach((bd) => bd.remove());
        document.body.classList.remove("modal-open");
      }
    } catch (error) {
      showMessageError();
      console.error("Error updating income:", error);
    }
  };

  useEffect(() => {
    if (id) fetchIncome();
  }, [id]);
  useEffect(() => {
    if (id) fetchExpenditure();
  }, [id]);
  useEffect(() => {
    if (selectedIncome) {
      setUpdatedIncome({
        income: selectedIncome.income ?? "",
        income_description: selectedIncome.income_description ?? "",
        status: selectedIncome.status ?? 0,
        // add other fields if needed
      });
    }
  }, [selectedIncome]);

  useEffect(() => {
    if (selectedExpenditure) {
      setUpdatedExpenditure({
        expenditure: selectedExpenditure.expenditure ?? "",
        expenditure_description:
          selectedExpenditure.expenditure_description ?? "",
        status: selectedExpenditure.status ?? 0,
        // add other fields if needed
      });
    }
  }, [selectedExpenditure]);

  const showMessageSuccess = () => {
    Swal.fire({
      title: "ບັນທຶກສຳເລັດ!",
      text: "ພະແນກໃໝ່ຖືກບັນທຶກສຳເລັດແລ້ວ.",
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
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://192.168.100.134:3001/api/finance/create-income",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newIncome),
        }
      );

      const data = await response.json();
      console.log(data);
      const modalEl = document.getElementById("modal-add-employee");
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) {
        modal.hide();

        // Force backdrop cleanup if needed
        const backdrops = document.querySelectorAll(".modal-backdrop");
        backdrops.forEach((bd) => bd.remove());

        // Remove modal-open class from body
        document.body.classList.remove("modal-open");
        // document.body.style = "";
      }
      showMessageSuccess();

      setNewIncome({
        income: "",
        income_description: "",
        status: "",
        partyId: id,
      });

      fetchIncome();
    } catch (error) {
      showMessageError();
      console.error("Error creating Party:", error);
    }
  };
  const handleFormSubmitExpenditure = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://192.168.100.134:3001/api/finance/create-expenditure",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newExpenditure),
        }
      );

      const data = await response.json();
      console.log(data);
      const modalEl = document.getElementById("modal-add-expenditure");
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) {
        modal.hide();

        // Force backdrop cleanup if needed
        const backdrops = document.querySelectorAll(".modal-backdrop");
        backdrops.forEach((bd) => bd.remove());

        // Remove modal-open class from body
        document.body.classList.remove("modal-open");
        // document.body.style = "";
      }
      showMessageSuccess();

      setNewExpenditure({
        expenditure: "",
        expenditure_description: "",
        status: "",
        partyId: id,
      });

      fetchExpenditure();
    } catch (error) {
      showMessageError();
      console.error("Error creating Party:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Coerce numeric inputs to numbers so types remain consistent
    setNewIncome((prev) => ({
      ...prev,
      [name]:
        name === "income" || name === "status"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };
  const handleInputChangeExpenditure = (e) => {
    const { name, value } = e.target;
    // Coerce numeric inputs to numbers so types remain consistent
    setNewExpenditure((prev) => ({
      ...prev,
      [name]:
        name === "expenditure" || name === "status"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  // const navigate = useNavigate();

  // const goToOwnerPartyPage = (id) => {
  //   navigate(`/ownerparty/${id}`);
  // };
  const fetchIncomeById = async (incomeId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://192.168.100.134:3001/api/finance/select-by-id/${incomeId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await response.json();
      const incomeObj = Array.isArray(data) ? data[0] : data;

      setSelectedIncome(incomeObj);

      setUpdatedIncome({
        income: incomeObj?.income ?? "",
        income_description: incomeObj?.income_description ?? "",
        status: incomeObj?.status ?? 0,
      });
    } catch (error) {
      console.error("Error fetching income by ID:", error);
    }
  };
  const fetchExpenditureById = async (expenditureId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://192.168.100.134:3001/api/finance/select-by-id/${expenditureId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await response.json();
      const expenditureObj = Array.isArray(data) ? data[0] : data;

      setSelectedExpenditure(expenditureObj);

      setUpdatedExpenditure({
        expenditure: expenditureObj?.expenditure ?? "",
        expenditure_description: expenditureObj?.expenditure_description ?? "",
        status: expenditureObj?.status ?? 0,
      });
    } catch (error) {
      console.error("Error fetching income by ID:", error);
    }
  };

  // Confirm before deletion
  const confirmDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "ຕ້ອງການລຶບແທ້ ຫຼື ບໍ່?",
      text: "ທ່ານແນ່ໃຈບໍ ທີ່ຈະລຶບລະຫັດທີ່: " + id,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "ຍົກເລີກ",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ຢືນຢັນ!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFinance(id);
      }
    });
  };

  // Delete party from the API
  const deleteFinance = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`http://192.168.100.134:3001/api/finance/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        Swal.fire({
          title: "ລົບລ້າງສຳເລັດ!",
          text: "ຂໍ້ມູນໄດ້ຖືກລຶບສຳເລັດແລ້ວ",
          icon: "success",
          timer: 2000,
          position: "top-end",
          toast: true,
          showConfirmButton: false,
        });
        fetchExpenditure();
        fetchIncome();
      })
      .catch((error) => {
        console.error("Error deleting bank employee:", error);
        Swal.fire({
          title: "ເກີດຂໍ້ຜິດພາດ!",
          text: "ກະລຸນາກວດສອບອີກຄັ້ງ!",
          icon: "error",
          timer: 2000,
          position: "top-end",
          toast: true,
          showConfirmButton: false,
        });
      });
  };
  const navigate = useNavigate();
  const gotoIncome = (id) => {
    navigate(`/income/${id}`);
  };
  const gotoExpenditure = (id) => {
    navigate(`/expenditure/${id}`);
  };

  // duplicate effect removed: updatedIncome is set in the earlier effect
  // which uses nullish coalescing to provide safe defaults.

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
          <li className="breadcrumb-item active">{Party.name}</li>
        </ol>
        {/* <!-- END breadcrumb --> */}
        {/* <!-- BEGIN page-header --> */}
        <h1 className="page-header">ລະບົບຈັດການການເງິນຂອງງານຕ່າງໆ</h1>
        {/* <!-- END page-header --> */}

        {/* <!-- BEGIN row --> */}
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-md-6">
              <h1 className="text-center text-success">ລາຍຮັບ</h1>
              <div className="m-1 d-flex justify-content-between">
                <button
                  className="btn btn-success"
                  href="#modal-add-employee"
                  data-bs-toggle="modal"
                >
                  <i className="fa fa-plus mx-1"></i>ເພີ່ມລາຍຮັບ
                </button>
                <button className="btn btn-success" onClick={() => gotoIncome(id)}>
                  <i className="fa fa-arrow-circle-right mx-1"></i>ລາຍລະອຽດ
                </button>
              </div>
              <div className="overflow-auto">
                <table className="table table-striped fs-5">
                  <thead>
                    <tr>
                      <th>ລຳດັບ</th>
                      <th>ຈຳນວນເງິນ</th>
                      <th>ລາຍລະອຽດ</th>
                      <th>ສະຖານະ</th>
                      <th>ສ້າງວັນທີ່</th>
                      <th>ປູ່ມຄຳສັ່ງ</th>
                    </tr>
                  </thead>
                  <tbody className="fw-bold">
                    {Income.map((income, index) => (
                      <tr key={income.id || index}>
                        <td>{index + 1}</td>
                        <td className="text-success">
                          {Number(income.income).toLocaleString()}
                        </td>
                        <td>{income.income_description}</td>
                        <td className="text-success">
                          {income.status === 0 ? "ເງິນສົດ" : "ເງິນໂອນ"}
                        </td>
                        <td>{new Date(income.created_at).toLocaleString()}</td>
                        <td>
                          <button
                            className="btn btn-warning mx-1"
                            data-bs-toggle="modal"
                            data-bs-target="#modal-edit-income"
                            onClick={() => fetchIncomeById(income.id)}
                          >
                            <i className="fas fa-edit"></i>
                          </button>

                          <button
                            className="btn btn-danger"
                            onClick={() => confirmDelete(income.id)}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-6">
              <h1 className="text-center text-danger">ລາຍຈ່າຍ</h1>
              <div className="m-1 d-flex justify-content-between">
                <button
                  className="btn btn-danger"
                  href="#modal-add-expenditure"
                  data-bs-toggle="modal"
                >
                  <i className="fa fa-plus mx-1"></i>ເພີ່ມລາຍຈ່າຍ
                </button>
                <button className="btn btn-danger" onClick={() => gotoExpenditure(id)}>
                  <i className="fa fa-arrow-circle-right mx-1"></i>ລາຍລະອຽດ
                </button>
              </div>
              <div className="overflow-auto">
                <table className="table table-striped fs-5">
                  <thead>
                    <tr>
                      <th>ລຳດັບ</th>
                      <th>ຈຳນວນເງິນ</th>
                      <th>ລາຍລະອຽດ</th>
                      <th>ສະຖານະ</th>
                      <th>ສ້າງວັນທີ່</th>
                      <th>ປູ່ມຄຳສັ່ງ</th>
                    </tr>
                  </thead>
                  <tbody className="fw-bold">
                    {Expenditure.map((expenditure, index) => (
                      <tr key={expenditure.id || index}>
                        <td>{index + 1}</td>
                        <td className="text-success">
                          {Number(expenditure.expenditure).toLocaleString()}
                        </td>
                        <td>{expenditure.expenditure_description}</td>
                        <td className="text-success">
                          {expenditure.status === 0 ? "ເງິນສົດ" : "ເງິນໂອນ"}
                        </td>
                        <td>{new Date(expenditure.created_at).toLocaleString()}</td>
                        <td>
                          <button
                            className="btn btn-warning mx-1"
                            data-bs-toggle="modal"
                            data-bs-target="#modal-edit-expenditure"
                            onClick={() => fetchExpenditureById(expenditure.id)}
                          >
                            <i className="fas fa-edit"></i>
                          </button>

                          <button
                            className="btn btn-danger"
                            onClick={() => confirmDelete(expenditure.id)}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="modal fade" id="modal-add-employee">
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header bg-success">
                      <h4 className="modal-title text-white">ເພີ່ມລາຍຮັບ</h4>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-hidden="true"
                      ></button>
                    </div>
                    <form onSubmit={handleFormSubmit}>
                      <div className="modal-body">
                        <div className="row">
                          <div className="col-md-4 mb-3">
                            <div className="label mb-1 fs-5">
                              ຈຳນວນເງິນ <span className="text-danger">*</span>
                            </div>
                            <input
                              type="number"
                              className="form-control"
                              name="income"
                              placeholder="ກະລຸນາປ້ອນຈຳນວນເງິນ"
                              value={newIncome.income}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <div className="label mb-1 fs-5">
                              ລາຍລະອຽດ <span className="text-danger">*</span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              name="income_description"
                              placeholder="ກະລຸນາປ້ອນລາຍລະອຽດ"
                              value={newIncome.income_description}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <div className="label mb-1 fs-5">
                              ສະຖານະ <span className="text-danger">*</span>
                            </div>
                            <select
                              name="status"
                              className="form-control"
                              value={newIncome.status}
                              onChange={handleInputChange}
                            >
                              <option value="">-- ກະລຸນາເລືອກ -- </option>
                              <option value="0">ເງິນສົດ</option>
                              <option value="1">ເງິນໂອນ</option>
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
                        <button className="btn btn-success">
                          <i className="fa fa-print mx-1"></i>ເພີ່ມໃໝ່
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="modal fade" id="modal-edit-income">
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header bg-info">
                      <h4 className="modal-title text-white">ແກ້ໄຂລາຍຮັບ</h4>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-hidden="true"
                      ></button>
                    </div>
                    <form onSubmit={handleUpdateIncome}>
                      <div className="modal-body">
                        <div className="row">
                          <div className="col-md-4 mb-3">
                            <div className="label mb-1 fs-5">
                              ຈຳນວນເງິນ <span className="text-danger">*</span>
                            </div>
                            <input
                              type="number"
                              className="form-control"
                              name="income"
                              placeholder="ກະລຸນາປ້ອນຈຳນວນເງິນ"
                              value={updatedIncome.income}
                              onChange={(e) =>
                                setUpdatedIncome((prev) => ({
                                  ...prev,
                                  income:
                                    e.target.value === ""
                                      ? ""
                                      : Number(e.target.value),
                                }))
                              }
                              required
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <div className="label mb-1 fs-5">
                              ລາຍລະອຽດ <span className="text-danger">*</span>
                            </div>

                            <input
                              type="text"
                              className="form-control"
                              name="income_description"
                              placeholder="ກະລຸນາປ້ອນລາຍລະອຽດ"
                              value={updatedIncome.income_description}
                              onChange={(e) =>
                                setUpdatedIncome((prev) => ({
                                  ...prev,
                                  income_description: e.target.value,
                                }))
                              }
                              required
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <div className="label mb-1 fs-5">
                              ສະຖານະ <span className="text-danger">*</span>
                            </div>

                            <select
                              name="status"
                              className="form-control"
                              value={updatedIncome.status}
                              onChange={(e) =>
                                setUpdatedIncome((prev) => ({
                                  ...prev,
                                  status:
                                    e.target.value === ""
                                      ? ""
                                      : Number(e.target.value),
                                }))
                              }
                            >
                              <option value="">-- ກະລຸນາເລືອກ -- </option>
                              <option value="0">ເງິນສົດ</option>
                              <option value="1">ເງິນໂອນ</option>
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
              <div className="modal fade" id="modal-add-expenditure">
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header bg-danger">
                      <h4 className="modal-title text-white">ເພີ່ມລາຍຈ່າຍ</h4>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-hidden="true"
                      ></button>
                    </div>
                    <form onSubmit={handleFormSubmitExpenditure}>
                      <div className="modal-body">
                        <div className="row">
                          <div className="col-md-4 mb-3">
                            <div className="label mb-1 fs-5">
                              ຈຳນວນເງິນ <span className="text-danger">*</span>
                            </div>
                            <input
                              type="number"
                              className="form-control"
                              name="expenditure"
                              placeholder="ກະລຸນາປ້ອນຈຳນວນເງິນ"
                              value={newExpenditure.expenditure}
                              onChange={handleInputChangeExpenditure}
                              required
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <div className="label mb-1 fs-5">
                              ລາຍລະອຽດ <span className="text-danger">*</span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              name="expenditure_description"
                              placeholder="ກະລຸນາປ້ອນລາຍລະອຽດ"
                              value={newExpenditure.expenditure_description}
                              onChange={handleInputChangeExpenditure}
                              required
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <div className="label mb-1 fs-5">
                              ສະຖານະ <span className="text-danger">*</span>
                            </div>
                            <select
                              name="status"
                              className="form-control"
                              value={newExpenditure.status}
                              onChange={handleInputChangeExpenditure}
                            >
                              <option value="">-- ກະລຸນາເລືອກ -- </option>
                              <option value="0">ເງິນສົດ</option>
                              <option value="1">ເງິນໂອນ</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer d-flex justify-content-between">
                        <button
                          type="button"
                          data-bs-dismiss="modal"
                          className="btn btn-warning"
                        >
                          <i className="fa fa-times mx-1"></i>ຍົກເລີກ
                        </button>
                        <button className="btn btn-danger">
                          <i className="fa fa-print mx-1"></i>ເພີ່ມໃໝ່
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="modal fade" id="modal-edit-expenditure">
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header bg-info">
                      <h4 className="modal-title text-white">ແກ້ໄຂລາຍຈ່າຍ</h4>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-hidden="true"
                      ></button>
                    </div>
                    <form onSubmit={handleUpdateExpenditure}>
                      <div className="modal-body">
                        <div className="row">
                          <div className="col-md-4 mb-3">
                            <div className="label mb-1 fs-5">
                              ຈຳນວນເງິນ <span className="text-danger">*</span>
                            </div>
                            <input
                              type="number"
                              className="form-control"
                              name="expenditure"
                              placeholder="ກະລຸນາປ້ອນຈຳນວນເງິນ"
                              value={updatedExpenditure.expenditure}
                              onChange={(e) =>
                                setUpdatedExpenditure((prev) => ({
                                  ...prev,
                                  expenditure:
                                    e.target.value === ""
                                      ? ""
                                      : Number(e.target.value),
                                }))
                              }
                              required
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <div className="label mb-1 fs-5">
                              ລາຍລະອຽດ <span className="text-danger">*</span>
                            </div>

                            <input
                              type="text"
                              className="form-control"
                              name="expenditure_description"
                              placeholder="ກະລຸນາປ້ອນລາຍລະອຽດ"
                              value={updatedExpenditure.expenditure_description}
                              onChange={(e) =>
                                setUpdatedExpenditure((prev) => ({
                                  ...prev,
                                  expenditure_description: e.target.value,
                                }))
                              }
                              required
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <div className="label mb-1 fs-5">
                              ສະຖານະ <span className="text-danger">*</span>
                            </div>

                            <select
                              name="status"
                              className="form-control"
                              value={updatedExpenditure.status}
                              onChange={(e) =>
                                setUpdatedExpenditure((prev) => ({
                                  ...prev,
                                  status:
                                    e.target.value === ""
                                      ? ""
                                      : Number(e.target.value),
                                }))
                              }
                            >
                              <option value="">-- ກະລຸນາເລືອກ -- </option>
                              <option value="0">ເງິນສົດ</option>
                              <option value="1">ເງິນໂອນ</option>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinanceComponent;
