/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react'
import HeaderComponent from './includes/HeaderComponent'
import SidebarComponent from './includes/SidebarComponent'
import {
  PieChart, Pie, Tooltip,
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Legend, Cell
} from "recharts";
import { useParams } from 'react-router-dom';
import { ResponsiveContainer } from "recharts";

function OwnerPartyComponent() {

  const { id } = useParams()

  // const [selectedParty, setSelectedParty] = useState(null);
  // const [updatedParty, setUpdatedParty] = useState({
  //   name: "",
  // });
  const [Party, setParty] = useState([]);
  const [SumIncome, setSumIncome] = useState([]);
  const [SumExpenditure, setSumExpenditure] = useState([]);
  const [SumRemaining, setSumRemaining] = useState([]);
  const [SumIncomeToday, setSumIncomeToday] = useState([]);
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
    // Only fetch when `id` changes. Previously this effect had no dependency
    // array which caused it to run on every render and created an infinite
    // fetch-render loop, preventing charts and other data from stabilizing.
    fetchParty(id);
  }, [id]);
  const fetchSumIncome = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://192.168.100.134:3001/api/finance/sum-income-by-party/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setSumIncome(data);
    } catch (error) {
      console.error("Error fetching PasetSumIncome:", error);
    }
  };
  const fetchSumIncomeToday = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://192.168.100.134:3001/api/finance/sum-income-today-by-party/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setSumIncomeToday(data);
    } catch (error) {
      console.error("Error fetching PasetSumIncome:", error);
    }
  };
  const fetchSumExpenditure = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://192.168.100.134:3001/api/finance/sum-expenditure-by-party/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setSumExpenditure(data);
    } catch (error) {
      console.error("Error fetching PasetSumIncome:", error);
    }
  };
  const fetchSumRemaining = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://192.168.100.134:3001/api/finance/sum-remaining-by-party/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setSumRemaining(data);
    } catch (error) {
      console.error("Error fetching PasetSumIncome:", error);
    }
  };

  useEffect(() => {
    // Re-fetch sums whenever the `id` changes.
    fetchSumIncome();
    fetchSumIncomeToday();
    fetchSumExpenditure();
    fetchSumRemaining();
  }, [id]);

const [chartData, setChartData] = useState([]);
const [chartExpenditureData, setChartExpenditureData] = useState([]);

const colors = [
  "#0dbff0ff",  // info
  "#de2d2dff",  // success
  "#1bf2c3ff",  // danger
];
useEffect(() => {
  fetch(`http://192.168.100.134:3001/api/finance/sum-income-chart-by-party-id/${id}`)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        const item = data[0]; 

        const formatted = [
          { name: "ລາຍຮັບ", value: Number(item.sum_income_chart) },
          { name: "ລາຍຈ່າຍ", value: Number(item.sum_expenditure_chart) },
          { name: "ເງິນທີ່ຍັງເຫຼືອ", value: Number(item.sum_remaining_chart) },
        ];

        setChartData(formatted);
        console.log("Combined Pie Data:", formatted);
      }
    })
    .catch(err => console.error(err));
}, [id]);

  console.log("formatted data:", chartData);


  useEffect(() => {
    fetch(`http://192.168.100.134:3001/api/finance/sum-expenditure-chart-by-party-id/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },

    })
      .then(res => res.json())
      .then(data => {
        const formattedExpenditure = data.map(item => ({
          name: item.party,
          value: Number(item.sum_expenditure_chart)
        }));
        setChartExpenditureData(formattedExpenditure);
        console.log("FormattedExpenditure Chart Data:", formattedExpenditure);
      })
      .catch(err => console.error(err));
  }, [id]);

  console.log("formattedexpenditure data:", chartExpenditureData);



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
            <div className="col-md-12">
              <div className="row">
                {/* <div className="col-md-4">
                  <a
                    className="btn btn-info"
                    href="#modal-add-employee"
                    data-bs-toggle="modal"
                  >
                    <i className="fa fa-plus mx-1"></i>ເພີ່ມປະເພດງານໃໝ່
                  </a>
                </div> */}
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
            <div className="col-xl-3 col-md-6">
              <div className="widget widget-stats bg-info">
                <div className="stats-icon">
                  <p className="text-white">₭</p>
                  {/* <i className="fa fa-desktop"></i> */}
                </div>
                <div className="stats-info">
                  <h4 className="fs-3">ລາຍຈ່າຍທັງໝົດ</h4>
                  <p>
                    {Number(SumIncome[0]?.sum_income || 0).toLocaleString("en-US")}
                    ກີບ
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="widget widget-stats bg-danger">
                <div className="stats-icon">
                  <p className="text-white">₭</p>
                  {/* <i className="fa fa-desktop"></i> */}
                </div>
                <div className="stats-info">
                  <h4 className="fs-3">ລາຍຈ່າຍທັງໝົດ</h4>
                  <p>
                    {Number(SumExpenditure[0]?.sum_expenditure || 0).toLocaleString("en-US")}
                    ກີບ
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="widget widget-stats bg-warning">
                <div className="stats-icon">
                  <p className="text-white">₭</p>
                  {/* <i className="fa fa-desktop"></i> */}
                </div>
                <div className="stats-info">
                  <h4 className="fs-3">ເງິນທີ່ຍັງເຫຼືອ</h4>
                  <p>
                    {Number(SumRemaining[0]?.sum_remaining || 0).toLocaleString("en-US")}
                    ກີບ
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="widget widget-stats bg-success">
                <div className="stats-icon">
                  <p className="text-white">₭</p>
                  {/* <i className="fa fa-desktop"></i> */}
                </div>
                <div className="stats-info">
                  <h4 className="fs-3">ລາຍຮັບມື້ນີ້</h4>
                  <p>
                    {Number(SumIncomeToday[0]?.sum_income_today || 0).toLocaleString("en-US")}
                    ກີບ
                  </p>
                </div>
              </div>
            </div>
          </div>
 <div className="row mt-4">
   {/* Pie Chart */}
   <div className="col-md-6">
     <div className="card p-3">
       <h4 className="text-center">ລາຍງານ PieChart</h4>
       <ResponsiveContainer width="100%" height={300}>
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

     </div>
   </div>
 
   {/* Bar Chart */}
   <div className="col-md-6">
     <div className="card p-3">
       <h4 className="text-center">ລາຍງານ BarChart</h4>
 
       <div style={{ width: "100%", height: 300 }}>
         <ResponsiveContainer width="100%" height={300}>
           <BarChart data={chartData}>
             <CartesianGrid strokeDasharray="3 3" />
             <XAxis dataKey="name" />
             <YAxis />
             <Tooltip />
             <Legend />
             <Bar dataKey="value">
               {chartData.map((entry, index) => (
                 <Cell key={index} fill={colors[index % colors.length]} />
               ))}
             </Bar>
           </BarChart>
         </ResponsiveContainer>
       </div>
 
     </div>
   </div>
 </div>


        </div>
      </div>
    </div>
  )
}

export default OwnerPartyComponent