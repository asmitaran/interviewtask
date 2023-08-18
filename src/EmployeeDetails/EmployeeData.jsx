import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import '../Styling/employeedata.scss';
import { MdAutoDelete } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function EmployeeData(props) {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [editError, setEditError] = useState('');

  useEffect(() => {
    axios.get('https://retoolapi.dev/eKMjRK/data')
      .then((resp) => {
        setData(resp.data);
      })

  }, [])

  const handleEditSubmit = (event) => {
    event.preventDefault();

    if (editEmployee.fullname.length < 5) {
      setEditError('Full Name must have a minimum of 5 characters');
      return;
    }

    if (editEmployee.age < 18) {
      setEditError('Age must be at least 18');
      return;
    }

    axios.put(`https://retoolapi.dev/eKMjRK/data/${editEmployee.id}`, editEmployee)
      .then((resp) => {
        setShowEditModal(false);
        setEditError('');
        window.location.reload();
      })

  }
  const handleDelete = (id) => {
    axios.delete(`https://retoolapi.dev/eKMjRK/data/${id}`)
      .then(() => {
        setData((prevData) => prevData.filter((employee) => employee.id !== id));
      })

  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map((employee) => employee.id));
    }
    setSelectAll(!selectAll);
  };
  const handledelteall = () => {
    const idsToDelete = data.map((employee) => employee.id);

    axios.post('https://retoolapi.dev/eKMjRK/data', {
      deleteAll: idsToDelete.join(',')
    })
      .then(() => {
        setData([]);
      })

  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditEmployee(null);
    setEditError('');
  };

  const handleEdit = (id) => {
    const employeeToEdit = data.find((employee) => employee.id === id);
    setEditEmployee({ ...employeeToEdit });
    setShowEditModal(true);
    setEditError('');
  };

  return (
    <div >
      <h2 className='employee-heading' > Employees Details</h2>
      <div style={{ marginLeft: "16px", marginBottom: "5px" }}>
        <button className='Add-btn' ><Link to="/">Add Details</Link></button>
        <button className="select-btn" onClick={handleSelectAll}>
          {selectAll ? 'Unselect All' : 'Select All'}
        </button>
        <button className='deleteall-btn' onClick={handledelteall}> Delete All </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th> <input type="checkbox" checked={selectAll} onChange={handleSelectAll} style={{ margin: 0, verticalAlign: 'middle' }} /></th>
            <th>Sr.No</th>
            <th>FullName</th>
            <th>Age</th>
            <th>Email</th>
            <th>Address</th>
            <th>Date Of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee) => (
            <tr key={employee.id} className={`employee-row ${selectedIds.includes(employee.id) ? 'selected-row' : ''}`} style={{ backgroundColor: selectedIds.includes(employee.id) ? '#f2f2f2' : 'initial', }}>
              <td>
                <input type="checkbox" checked={selectedIds.includes(employee.id)} onChange={() => handleCheckboxChange(employee.id)}
                  style={{
                    margin: 0,
                    verticalAlign: 'middle',
                    outline: selectedIds.includes(employee.id)
                      ? '2px solid #007bff'
                      : 'none',
                  }}
                />
              </td>
              <td>{employee.id}</td>
              <td>{employee.fullname}</td>
              <td>{employee.age}</td>
              <td>{employee.email}</td>
              <td>{employee.address}</td>
              <td>{employee.dob}</td>
              <td><button className="btn-delete" value={employee.id} onClick={() => handleDelete(employee.id)} > <MdAutoDelete /> </button>
                <button className='edit-btn' value={employee.id} onClick={() => handleEdit(employee.id)}  > <AiOutlineEdit /> </button>
                <button className="btn-view" value={employee.id}
                  onClick={(e) => {
                    const botid = e.target.value
                    if (botid) {
                      axios.get(`https://retoolapi.dev/eKMjRK/data/${botid}`)
                        .then((response) => {

                          props.data(response.data);
                          navigate("/view")
                        });
                      console.log(botid)
                    }

                  }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditModal && (
        <Modal show={showEditModal} onHide={closeEditModal} centered>
          <Modal.Header closeButton>
            <Modal.Title className='edit-headings'>Edit Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Full Name:</label>
                <input type="text" className="form-control" value={editEmployee.fullname} onChange={(e) => setEditEmployee({ ...editEmployee, fullname: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Age:</label>
                <input type="number" className="form-control" value={editEmployee.age} onChange={(e) => setEditEmployee({ ...editEmployee, age: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" className="form-control" value={editEmployee.email} onChange={(e) => setEditEmployee({ ...editEmployee, email: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input type="text" className="form-control" value={editEmployee.address} onChange={(e) => setEditEmployee({ ...editEmployee, address: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Date of Birth:</label>
                <input type="date" className="form-control" value={editEmployee.dob} onChange={(e) => setEditEmployee({ ...editEmployee, dob: e.target.value })} required />
              </div>
              {editError && <div className="text-danger">{editError}</div>}
              <button type="submit" className="saved-btn"> Save Changes</button>
              <button onClick={closeEditModal} className="cancel-btn"> Cancel</button>
            </form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      )}
    </div>
  )
}
export default EmployeeData;
