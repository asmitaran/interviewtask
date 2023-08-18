import React ,{useState}from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Employeedetails from './EmployeeDetails/Employeedetails';
import EmployeeData from './EmployeeDetails/EmployeeData';
import View from './EmployeeDetails/View';



function App() {
  
  const [viewdata, setviewdata] = useState('');

  // Callback func.lotion to receive data from the child
  const handleDataFromChild = (data) => {
    setviewdata(data);
  };
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Employeedetails />} />
        <Route path="/employeedata" element={<EmployeeData  data={handleDataFromChild } />}/>
        <Route path="/view" element={<View  data={viewdata}/>} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
