import React, { useState, useEffect } from "react";
import data from "./data.json";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const App = () => {
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);
    setCurrentPage(1); // Reset current page when ward changes
  };

  const handleBloodGroupChange = (event) => {
    setSelectedBloodGroup(event.target.value);
    setCurrentPage(1); // Reset current page when blood group changes
  };

  // Filter the data based on selected ward and blood group
  const filteredData = data.filter((item) => {
    if (selectedWard === "" && selectedBloodGroup === "") {
      return true; // Show all data when nothing is selected
    } else if (selectedWard !== "" && selectedBloodGroup !== "") {
      return item.ward.slice(-2) === selectedWard.slice(-2) && item.bloodGroup === selectedBloodGroup;
    } else if (selectedWard !== "") {
      return item.ward.slice(-2) === selectedWard.slice(-2);
    } else {
      return item.bloodGroup === selectedBloodGroup;
    }
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    // Fetch remaining data when changing pagination (dummy example)
    console.log("Fetching data for page", currentPage);
  }, [currentPage]);

  return (
    <section className="layout__01">
      <div className="container">
        <div className="layout__01__nav">
          <div className="input__box">
            <select value={selectedWard} onChange={handleWardChange}>
              <option> - Select Ward -</option>
              <option>01</option>
              <option>02</option>
              <option>03</option>
              <option>04</option>
              <option>05</option>
              <option>06</option>
              <option>07</option>
              <option>08</option>
              <option>09</option>
            </select>
          </div>
          <div className="input__box">
            <select value={selectedBloodGroup} onChange={handleBloodGroupChange}>
              <option> - Blood Group -</option>
              <option>O-</option>
              <option>O+</option>
              <option>A-</option>
              <option>B-</option>
              <option>AB-</option>
              <option>AB+</option>
              <option>A+</option>
              <option>B+</option>
            </select>
          </div>
          <div className="input__box">
            <select value={selectedBloodGroup} onChange={handleBloodGroupChange}>
              <option> - Quick Contact -</option>
              <option>+977 9812767056</option>
              <option>+977 9812767056</option>
              <option>+977 9812767056</option>
              <option>+977 9812767056</option>
              <option>+977 9812767056</option>
              <option>+977 9812767056</option>
              <option>+977 9812767056</option>
              <option>+977 9812767056</option>
            </select>
          </div>
        </div>
        <table className="table">
          <thead className="thead">
            <tr>
              <th>SN</th>
              <th>Name</th>
              <th>Age</th>
              <th>Contact</th>
              <th>Ward No</th>
              <th>Tole/ Village</th>
              <th>Work Place</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {currentItems.map((item, index) => {
              const itemIndex = indexOfFirstItem + index + 1;
              return (
                <tr key={index}>
                  <td>{itemIndex}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.contact}</td>
                  <td>{item.ward}</td>
                  <td>{item.tole}</td>
                  <td>{item.workplace}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredData.length > itemsPerPage && (
          <ul className="pagination">
            <li>
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                <FaAngleLeft />
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <li key={page}>
                <button className={page === currentPage ? "active" : ""} onClick={() => handlePageChange(page)}>
                  {page}
                </button>
              </li>
            ))}
            <li>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                <FaAngleRight />
              </button>
            </li>
          </ul>
        )}
      </div>
    </section>
  );
};

export default App;
