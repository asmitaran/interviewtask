import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../Styling/employeedetails.scss';


function Employeedetails() {
  const data = { fullname: '', address: '', email: '', dob: '', age: '', }
  const [inputdata, setinputdata] = useState(data);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handlechange = (e) => {
    setinputdata({ ...inputdata, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    let newErrors = {};
    if (!inputdata.fullname || inputdata.fullname.length < 5) {
      newErrors.fullname = 'Full name should be at least 5 characters long';
    }

    if (!inputdata.age || inputdata.age <= 18) {
      newErrors.age = 'Age Should Be Minimum 18';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      axios
        .post('https://retoolapi.dev/eKMjRK/data', inputdata)
        .then((resp) => {
          console.log(resp.data);
          setinputdata(data);
          setErrors({});
        })
    }
  }

  return (
    <div className='background-animated'>
      <div className="form-container ">
        <form onSubmit={handlesubmit} className="employee-form">
          <label htmlFor="fname" className="label"> Full Name:</label>
          <input type="text" name="fullname" value={inputdata.fullname} onChange={handlechange} className="input-field"
          />
          {errors.fullname && <p className="error">{errors.fullname}</p>}

          <label className="label" htmlFor="fname">Age:</label>
          <input type="number" className="input-field" name="age" value={inputdata.age} onChange={handlechange} />
          {errors.age && <p className="error">{errors.age}</p>}
          <br />

          <label className="label" htmlFor="fname">Email:</label>
          <input type="email" className="input-field" name="email" value={inputdata.email} onChange={handlechange} />
          {errors.email && <p className="error">{errors.email}</p>}
          <br />

          <label className="label" htmlFor="fname">Address:</label>
          <input type="text" name="address" className="input-field" value={inputdata.address} onChange={handlechange} />
          {errors.address && <p className="error">{errors.address}</p>}
          <br />

          <label className="label" htmlFor="fname">Date Of Birth:</label>
          <input type="date" className="input-field" name="dob" value={inputdata.dob} onChange={handlechange} />
          {errors.dob && <p className="error">{errors.dob}</p>}
          <br />

          <button type="submit" className="submit-btn">
            Submit
          </button>
          <button className="add-details-btn">
            <Link className="add-details-link" to="/employeedata">Go to Employeedata</Link>
          </button>
        </form>
      </div>
    </div>
  )
}
export default Employeedetails;
