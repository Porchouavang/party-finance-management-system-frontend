import React from 'react'
import HeaderComponent from './includes/HeaderComponent'
import SidebarComponent from './includes/SidebarComponent'
import {
  PieChart, Pie, Tooltip,
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Legend, Cell
} from "recharts";
import { ResponsiveContainer } from "recharts";


function PartyComponent() {
    const bgColor = [
        'light',
        'light',
        'light',
    ];
        
    const items = [
        'ງານດອງຂອງທ້າວ ກ',
        'ງານດອງຂອງທ້າວ ຂ',
        'ງານດອງຂອງນາງ ຄ',
        'ງານດອງຂອງທ້າວ ງ',
        'ງານດອງຂອງທ້າວ ກ',
        'ງານດອງຂອງທ້າວ ຂ',
        'ງານດອງຂອງນາງ ຄ',
        'ງານດອງຂອງທ້າວ ງ',
        'ງານດອງຂອງທ້າວ ກ',
        'ງານດອງຂອງທ້າວ ຂ',
        'ງານດອງຂອງນາງ ຄ',
        'ງານດອງຂອງທ້າວ ງ',
        'ງານດອງຂອງທ້າວ ກ',
        'ງານດອງຂອງທ້າວ ຂ',
        'ງານດອງຂອງນາງ ຄ',
        'ງານດອງຂອງທ້າວ ງ',
        'ງານດອງຂອງທ້າວ ກ',
        'ງານດອງຂອງທ້າວ ຂ',
        'ງານດອງຂອງນາງ ຄ',
        'ງານດອງຂອງທ້າວ ງ',
    ];
    const chartData = [
  { name: "ງານດອງຂອງທ້າວ ກ", value: 400 },
  { name: "ງານດອງຂອງທ້າວ ຂ", value: 300 },
  { name: "ງານດອງຂອງນາງ ຄ", value: 200 },
  { name: "ງານດອງຂອງທ້າວ ງ", value: 150 },
  { name: "ງານດອງຂອງທ້າວ ກ", value: 400 },
  { name: "ງານດອງຂອງທ້າວ ຂ", value: 300 },
  { name: "ງານດອງຂອງນາງ ຄ", value: 200 },
  { name: "ງານດອງຂອງທ້າວ ງ", value: 150 },
  { name: "ງານດອງຂອງທ້າວ ກ", value: 400 },
  { name: "ງານດອງຂອງທ້າວ ຂ", value: 300 },
  { name: "ງານດອງຂອງນາງ ຄ", value: 200 },
  { name: "ງານດອງຂອງທ້າວ ງ", value: 150 },
  { name: "ງານດອງຂອງທ້າວ ກ", value: 400 },
  { name: "ງານດອງຂອງທ້າວ ຂ", value: 300 },
  { name: "ງານດອງຂອງນາງ ຄ", value: 200 },
  { name: "ງານດອງຂອງທ້າວ ງ", value: 150 },
  { name: "ງານດອງຂອງທ້າວ ກ", value: 400 },
  { name: "ງານດອງຂອງທ້າວ ຂ", value: 300 },
  { name: "ງານດອງຂອງນາງ ຄ", value: 200 },
  { name: "ງານດອງຂອງທ້າວ ງ", value: 150 },
  { name: "ງານດອງຂອງທ້າວ ກ", value: 400 },
  { name: "ງານດອງຂອງທ້າວ ຂ", value: 300 },
  { name: "ງານດອງຂອງນາງ ຄ", value: 200 },
  { name: "ງານດອງຂອງທ້າວ ງ", value: 150 }
];

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
                    className="btn btn-light text-dark"
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
                <p className="text-dark">₭</p>
                {/* <i className="fa fa-desktop"></i> */}
              </div>
              <div className="stats-info">
                <h4 className="fs-3 text-dark">{itm}</h4>
                <p>
                  {/* {allIncome} */}
                </p>
              </div>
            </div>
          </div>))}
        </div>
        {/* Charts Section */}
<div className="row mt-4">
  {/* Pie Chart */}
  <div className="col-md-6">
    <div className="card p-3">
      <h4 className="text-center">ສັດສ່ວນປະເພດງານ</h4>

      <div style={{ width: "100%", height: 300 }}>
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
              <Cell fill="#276958ff" />  
              <Cell fill="#0dbff0ff" />  
              <Cell fill="#3086d1ff" />  
              <Cell fill="#43c1c1ff" />  
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  </div>

  {/* Bar Chart */}
  <div className="col-md-6">
    <div className="card p-3">
      <h4 className="text-center">ການປຽບທຽບລາຍຮັບ</h4>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value">
              <Cell fill="#276958ff" />  
              <Cell fill="#0dbff0ff" />  
              <Cell fill="#3086d1ff" />  
              <Cell fill="#43c1c1ff" />  
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
                <form>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div className="label mb-1 fs-5">
                          ປະເພດງານ <span className="text-danger">*</span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="first_name"
                          placeholder="ກະລຸນາປ້ອນປະເພດງານ"
                        //   value={newEmployee.first_name}
                        //   onChange={handleInputChange}
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

export default PartyComponent