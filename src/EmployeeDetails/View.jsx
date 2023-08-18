import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styling/view.scss';

function View(props) {
  const [employees, setEmployees] = useState(props.data);

  return (
    <div className="view-container">
      <h2 className="view-heading">Employee View Details</h2>

      <div
        key={employees.id}
        className="employee-details-card"
      >
        <form className="employee-form">
        <div className="employee-info">
            <label>User Id:</label>
            <span>{employees.id}</span>
          </div>
          <div className="employee-info">
            <label>Full Name:</label>
            <span>{employees.fullname}</span>
          </div>
          <div className="employee-info">
            <label>Age:</label>
            <span>{employees.age}</span>
          </div>
          <div className="employee-info">
            <label>Email:</label>
            <span>{employees.email}</span>
          </div>
          <div className="employee-info">
            <label>Address:</label>
            <span>{employees.address}</span>
          </div>
          <div className="employee-info">
            <label>Date Of Birth:</label>
            <span>{employees.dob}</span>
          </div>
          <button  className='back-btn'>
              <Link  to="/employeedata" className='back-link'>
                Back
              </Link>
            </button>
        </form>
      </div>
    </div>
  );
}

export default View;

