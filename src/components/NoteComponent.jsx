/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import HeaderComponent from "./includes/HeaderComponent";
import SidebarComponent from "./includes/SidebarComponent";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

function NoteComponent() {
  const { id } = useParams();
  const [Note, setNote] = useState([]);
  const [newNote, setNewNote] = useState({
    content: "",
    partyId: id,
  });
  const [Party, setParty] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  // const [selectedNote, setSelectedNote] = useState(null);
  const [updatedNote, setUpdatedNote] = useState({
    content: "",
    partyId: id,
  });
  console.log(Note);
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
  const fetchNote = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://192.168.100.134:3001/api/note/select-by-party/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setNote(data);
    } catch (error) {
      console.error("Error fetching Party:", error);
    }
  };
  const handleUpdateNote = async (e) => {
    e.preventDefault();
    if (!selectedNote?.id) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://192.168.100.134:3001/api/note/update/${selectedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // include partyId and ensure numeric types for income/status
          body: JSON.stringify({
            ...updatedNote,
            partyId: id,
            content:
              updatedNote.content === "" ? null : updatedNote.content,
          }),
        }
      );

      const data = await response.json();
      console.log("Updated:", data);

      showMessageSuccess();
      fetchNote();

      // Close modal
      const modalEl = document.getElementById("modal-edit-note");
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
    if (id) fetchNote();
  }, [id]);
  useEffect(() => {
    if (selectedNote) {
      setUpdatedNote({
        content: selectedNote.content ?? "",
        // add other fields if needed
      });
    }
  }, [selectedNote]);
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
        "http://192.168.100.134:3001/api/note/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newNote),
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

      setNewNote({
        content: "",
        partyId: id,
      });

      fetchNote();
    } catch (error) {
      showMessageError();
      console.error("Error creating Party:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Coerce numeric inputs to numbers so types remain consistent
    setNewNote((prev) => ({
      ...prev,
      [name]:
        name === "content"
          ? value === ""
            ? ""
            : String(value)
          : value,
    }));
  };
  
  const fetchNoteById = async (noteId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://192.168.100.134:3001/api/note/select-by-id/${noteId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await response.json();
      const noteObj = Array.isArray(data) ? data[0] : data;

      setSelectedNote(noteObj);

      setUpdatedNote({
        content: noteObj?.content ?? "",
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
        deleteNote(id);
      }
    });
  };

  // Delete party from the API
  const deleteNote = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`http://192.168.100.134:3001/api/note/delete/${id}`, {
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
        fetchNote();
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
  const gotoNoteDetail = (id) => {
    navigate(`/note-detail/${id}`);
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
            <div className="col-md-6 fs-5">
              <h1 className="text-center fw-bold text-primary">ເພີ່ມເນື້ອໃນໃໝ່</h1>
              <div className="panel panel-inverse">
                <div className="panel-heading bg-primary">
                  <h4 className="panel-title fs-5">ຟອມເພີ່ມເນື້ອໃນໃໝ່</h4>
                </div>
                <div className="panel-body">
                  <form onSubmit={handleFormSubmit}>
                    <div className="row">
                      <div className="mb-4 col-md-6">
                        <label className="form-label">ເນື້ອໃນ</label>
                         <textarea name="content" id="" className="form-control" value={newNote.content} required
                              onChange={handleInputChange}></textarea>
                          </div>
                      </div>
                      
                    <button type="submit" className="btn btn-primary">
                      <i className="fas fa-save mx-1"></i>ບັນທຶກ
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h1 className="text-center text-primary">ລາຍການເນື້ອໃນ</h1>
              
                <button className="btn btn-primary m-1" onClick={() => gotoNoteDetail(id)}>
                  <i className="fa fa-arrow-circle-right mx-1"></i>ລາຍລະອຽດ
                </button>
              <div className="overflow-auto card">
                <table className="table table-striped fs-5 m-3">
                  <thead>
                    <tr>
                      <th>ລຳດັບ</th>
                      <th>ເນື້ອໃນ</th>
                      <th>ສ້າງວັນທີ່</th>
                      <th>ປູ່ມຄຳສັ່ງ</th>
                    </tr>
                  </thead>
                  <tbody className="fw-bold">
                    {Note.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="text-primary"
                            style={{ whiteSpace: "normal", wordBreak: "break-word", width: "150px" }}>
                          <b>{item.content}</b>
                        </td>

                        <td>{new Date(item.created_at).toLocaleString()}</td>
                        <td>
                          <button
                            className="btn btn-warning mx-1"
                            data-bs-toggle="modal"
                            data-bs-target="#modal-edit-note"
                            onClick={() => fetchNoteById(item.id)}
                          >
                            <i className="fas fa-edit"></i>
                          </button>

                          <button
                            className="btn btn-danger"
                            onClick={() => confirmDelete(item.id)}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="modal fade" id="modal-edit-note">
                <div className="modal-dialog modal-md">
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
                    <form onSubmit={handleUpdateNote}>
                      <div className="modal-body">
                        <div className="row">

                          <div className="col-md-12 mb-3">
                            <div className="label mb-1 fs-5">
                              ເນື້ອໃນ <span className="text-danger">*</span>
                            </div>

                            <textarea name="content" id="" className="form-control" value={updatedNote.content}
                              onChange={(e) =>
                                setUpdatedNote((prev) => ({
                                  ...prev,
                                  content: e.target.value,
                                }))
                              }></textarea>
                          
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

export default NoteComponent;
