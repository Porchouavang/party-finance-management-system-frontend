/* eslint-disable react-hooks/set-state-in-effect */
// import { useState, useEffect } from "react";
// import ParentComponent from "./includes/ParentComponent";
// import logo from "./login/logo.png";
import DateTimeComponent from "./DateTimeComponent"; // Import the DateTimeComponent
import ChildComponent from "./includes/ChildComponent";

import React, { useState, useEffect } from "react";
// import HeaderComponent from "./includes/HeaderComponent";
// import SidebarComponent from "./includes/SidebarComponent";
// import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
function ExpenditureComponent() {

    const { id } = useParams();
    const [Expenditure, setExpenditure] = useState([]);
    const [SumExpenditure, setSumExpenditure] = useState([]);
    // const [Party, setParty] = useState([]);
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
      console.error("Error fetching PasetSumExpenditure:", error);
    }
  };

  useEffect(() => {
    fetchSumExpenditure();
  })
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(Expenditure);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenditure");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, `expenditure_report_${id}.xlsx`);
  };
  const handlePrint = (id) => {
  const oldTitle = document.title;
  document.title = `ລາຍຈ່າຍ${id}`;
  window.print();
  document.title = oldTitle;
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

    useEffect(() => {
        if (id) fetchExpenditure();
    }, [id]);
    useEffect(() => {
        if (id) fetchExpenditure();
    }, [id]);

    return (
        <div>
            {/* <ParentComponent /> */}
            <div id="content" className="content card">
                <div className="container-fluid mt-4">
                    <h4 className="mt-2 text-center text-bold">
                        ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ
                    </h4>
                    <h4 className="mt-2 text-center text-bold">
                        ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນາຖາວອນ
                    </h4>
                    <br />
                    {/* Main content */}
                    <section className="content">
                        <div className="content">
                            <h2 className="text-center text-danger text-bold">ລະບົບຈັດການການເງິນຂອງງານຕ່າງໆ</h2>
                            <br />
                            <br />
                            <div className="row">
                                <div className="d-flex justify-content-around">
                                    <h5 className="text-bold d-flex">
                                        <p className="mx-1">ຊື່ຜູ້ດູແລ:</p>
                                        <ChildComponent />
                                    </h5>
                                    <h2 className="text-center text-bold text-danger">ໃບບິນລາຍຈ່າຍ{Expenditure[0]?.party}</h2>
                                    <DateTimeComponent />
                                </div>
                                <div className="row no-print">
                                    <div className="col-md-6"></div>
                                    <div className="col-md-4">
                                        <button className="mx-1 btn btn-success" onClick={exportToExcel}>
                                            <i className="fas fa-arrow-circle-down mx-1"></i>Export to Excel
                                        </button>
                                        <button className="mx-1 btn btn-primary" onClick={() => handlePrint(id)}>
                                            <i className="fas fa-print mx-1"></i>Print to PDF
                                        </button>
                                    </div>
                                    <div className="col-md-2"></div>
                                </div>

                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card border-0">
                                        <div className="content p-4">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>ລຳດັບ</th>
                                                        <th>ຈຳນວນເງິນ</th>
                                                        <th>ລາຍລະອຽດ</th>
                                                        <th>ສະຖານະ</th>
                                                        <th>ສ້າງວັນທີ່</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="fw-bold">
                                                    {Expenditure.map((expenditure, index) => (
                                                        <tr key={expenditure.id || index}>
                                                            <td>{index + 1}</td>
                                                            <td className="text-danger">
                                                                {Number(expenditure.expenditure).toLocaleString()}
                                                            </td>
                                                            <td>{expenditure.expenditure_description}</td>
                                                            <td className="text-danger">
                                                                {expenditure.status === 0 ? "ເງິນສົດ" : "ເງິນໂອນ"}
                                                            </td>
                                                            <td className="text-danger">{new Date(expenditure.created_at).toLocaleString()}</td>
                                                        </tr>
                                                    ))}
                                                    
                                                    <tr className="fw-bold">
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td>ລາຍຈ່າຍທັງໝົດ:</td>
                                                        <td className="text-danger">
                                                            {Number(SumExpenditure[0]?.sum_expenditure || 0).toLocaleString()}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default ExpenditureComponent;
