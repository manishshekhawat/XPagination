import React, { useState, useEffect } from 'react';
import './Employee.css';

const EmployeeTable = () => {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const itemPerPage=10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let resp = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        let data = await resp.json();

        if (data) {
          setTableData(data);
          setPage(1)
          console.log(data);
        } else {
          console.log("error occured");
        }
      } catch (error) {
        alert("failed to fetch data");
    
      }
    };

    fetchData();
  }, []);

  const totalPages=Math.ceil(tableData.length/itemPerPage);
  const startIndex=(page-1)*10;
  const lastIndex=startIndex+itemPerPage;
  const currentData=tableData.slice(startIndex,lastIndex);

  const handleNextButton = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousButton = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="employee-table-container">
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='footer'>
        <button onClick={handlePreviousButton}>Previous</button>
        <button className="page-number" disabled>{page}</button>
        <button onClick={handleNextButton} >Next</button>
      </div>
    </div>
  );
};

export default EmployeeTable;


