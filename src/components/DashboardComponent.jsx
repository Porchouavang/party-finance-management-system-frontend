/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import HeaderComponent from './includes/HeaderComponent'
import SidebarComponent from './includes/SidebarComponent'
import {
  PieChart, Pie, Tooltip,
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Legend, Cell
} from "recharts";
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer } from "recharts";
import Swal from "sweetalert2";

function DashboardComponent() {
  const [Category, setCategory] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
  });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedCategory, setUpdatedCategory] = useState({
    name: "",
  });

  const handleUpdateCategory = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `http://192.168.100.134:3001/api/category/update/${selectedCategory.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCategory),
      }
    );
    const data = await response.json();
    console.log(data);
    showMessageSuccess();
    fetchCategory(); // refresh the list

    // close modal
   const modalEl = document.getElementById("modal-edit-employee");
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
  } catch (error) {
    showMessageError();
    console.error("Error updating category:", error);
  }
};

const fetchCategoryById = async (categoryId) => {
  try {
    const response = await fetch(`http://192.168.100.134:3001/api/category/select-by-id/${categoryId}`);
    const data = await response.json();
    setSelectedCategory(data); // ✅ fixed
    return data;
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    return null;
  }
};


  const fetchCategory = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://192.168.100.134:3001/api/category/select",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
      const data = await response.json();
      setCategory(data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };


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
      const response = await fetch("http://192.168.100.134:3001/api/category/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCategory),
      });
      const data = await response.json();
      setCategory([...Category, data]);
      showMessageSuccess();
      const modalEl = document.getElementById("modal-add-employee");
          const modal = bootstrap.Modal.getInstance(modalEl);
          if (modal) {
            modal.hide();

            // Force backdrop cleanup if needed
            const backdrops = document.querySelectorAll(".modal-backdrop");
            backdrops.forEach((bd) => bd.remove());

            // Remove modal-open class from body
            document.body.classList.remove("modal-open");
            document.body.style = "";
          }
      setNewCategory({ name: "" });
      fetchCategory();
    } catch (error) {
      showMessageError();
      console.error("Error creating category:", error);
    }
  }

  useEffect(() => {
  fetchCategory();
  if (selectedCategory) {
    setUpdatedCategory({ name: selectedCategory.name });
  }
}, [selectedCategory]);


    const bgColor = [
        'info',
        'success',
        'danger',
        'info',
        'success',
        'danger',
        'info',
        'success',
        'danger',
    ];
const [chartData, setChartData] = useState([]);
const [chartExpenditureData, setChartExpenditureData] = useState([]);

const colors = [
  "#0dbff0ff",  // info
  "#0ed7c3ff",  // success
  "#eb2828ff",  // danger
  "#43c1c1ff",  // info
  "#0dbff0ff",  // success
  "#0ed7c3ff",  // danger
];


  useEffect(() => {
    fetch("http://192.168.100.134:3001/api/finance/sum-income-chart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },

    })
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(item => ({
          name: item.category,
          value: Number(item.sum_income)
        }));
        setChartData(formatted);
        console.log("Formatted Chart Data:", formatted);
      })
      .catch(err => console.error(err));
  }, []);

  console.log("formatted data:", chartData);


  useEffect(() => {
    fetch("http://192.168.100.134:3001/api/finance/sum-expenditure-chart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },

    })
      .then(res => res.json())
      .then(data => {
        const formattedExpenditure = data.map(item => ({
          name: item.category,
          value: Number(item.sum_expenditure)
        }));
        setChartExpenditureData(formattedExpenditure);
        console.log("FormattedExpenditure Chart Data:", formattedExpenditure);
      })
      .catch(err => console.error(err));
  }, []);

  console.log("formatted data:", chartExpenditureData);


const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewCategory((prevCategory) => ({
    ...prevCategory,
    [name]: value,
  }));
};
const navigate = useNavigate();

const goToPartyPage = (id) => {
  navigate(`/party/${id}`);
};

// const [activeMenu, setActiveMenu] = useState(null); // track which menu is open
//   // const bgColor = ["primary", "success", "warning", "danger"]; // example colors

//   const handleMenuToggle = (id) => {
//     setActiveMenu(activeMenu === id ? null : id); // toggle menu
//   };

//   const handleEdit = (cat) => {
//     console.log("Edit:", cat);
//     setActiveMenu(null);
//   };

//   const handleDelete = (cat) => {
//     console.log("Delete:", cat);
//     setActiveMenu(null);
//   };


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
        deleteCategory(id);
      }
    });
  };

  // Delete Category from the API
  const deleteCategory = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`http://192.168.100.134:3001/api/category/delete/${id}`, {
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
        fetchCategory();
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
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-4">
                  <a
                    className="btn btn-info"
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
  {Category.map((cat, index) => (
    <div className="col-xl-3 col-md-6" key={cat.id}>
      <div className={`widget widget-stats bg-${bgColor[index % bgColor.length]}`}>
        <div className="d-flex justify-content-between">
        <div className="" onClick={() => goToPartyPage(cat.id)}>
          <h4 className="fs-3 text-white">{cat.name}</h4>
        </div>
        <div className="">
          <div href="#modal-edit-employee" onClick={() =>
                                fetchCategoryById(cat.id)
                              } data-bs-toggle="modal"><i className="fas fa-edit text-white"></i></div><br />
          <div onClick={() => confirmDelete(cat.id)}><i className="fas fa-trash text-white"></i></div>
        </div>
        </div>
      </div>
    </div>
  ))}
</div>

        {/* Charts Section */}
<div className="row mt-4">
  {/* Pie Chart */}
  <div className="col-md-6">
    <div className="card p-3">
      <h4 className="text-center">ລາຍຮັບຕາມປະເພດງານ</h4>
       <div style={{ width: "100%", height: 300 }}>
      {chartData.length > 0 ? (
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center">Loading chart...</p>
      )}
    </div>

    </div>
  </div>

  {/* Bar Chart */}
  <div className="col-md-6">
    <div className="card p-3">
      <h4 className="text-center">ລາຍຈ່າຍຕາມປະເພດງານ</h4>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartExpenditureData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value">
              {chartExpenditureData.map((entry, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  </div>
</div>

          <div className="modal fade" id="modal-add-employee">
            <div className="modal-dialog modal-md">
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
                <form onSubmit={handleFormSubmit}>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div className="label mb-1 fs-5">
                          ປະເພດງານ <span className="text-danger">*</span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="ກະລຸນາປ້ອນປະເພດງານ"
                          value={newCategory.name}
                          onChange={handleInputChange}
                          required
                        />
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
          <div className="modal fade" id="modal-edit-employee">
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                <div className="modal-header bg-info">
                  <h4 className="modal-title text-white">ເພີ່ມປະເພດງານໃໝ່</h4>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-hidden="true"
                  ></button>
                </div>
                <form onSubmit={handleUpdateCategory}>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div className="label mb-1 fs-5">
                          ປະເພດງານ <span className="text-danger">*</span>
                        </div>
                        <input
    type="text"
    className="form-control"
    name="name"
    placeholder="ກະລຸນາປ້ອນປະເພດງານ"
    value={updatedCategory.name}
    onChange={(e) =>
      setUpdatedCategory({ ...updatedCategory, name: e.target.value })
    }
    required
  />
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
  )
}

export default DashboardComponent