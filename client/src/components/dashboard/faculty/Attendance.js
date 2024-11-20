import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getStudents, markAttendance } from "../../../actions/faculty";
import { connect } from "react-redux";
import Table from "./Table";
import Sidebar from "./Sidebar";

const FacultyAttendance = ({
  getStudents,
  markAttendance,
  faculty: { students, courses },
  auth: { user },
  match,
}) => {
  let year;
  courses.forEach((course) => {
    if (course.course === match.params.course) year = course.year;
  });

  useEffect(() => {
    getStudents(year);
  }, [getStudents, year]);

  const [date, setDate] = useState("");
  const [attendance, setAttendance] = useState({});
  const [selectAll, setSelectAll] = useState(false); // Track the "Select All" checkbox state

  // Handle checkbox changes for individual rows
  const handleCheckboxChange = (roll, status) => {
    setAttendance((prevState) => ({
      ...prevState,
      [roll]: { ...prevState[roll], status },
    }));
  };

  // Handle "Select All" checkbox
  const handleSelectAll = (isChecked) => {
    const updatedAttendance = {};
    students.forEach(({ roll }) => {
      updatedAttendance[roll] = { status: isChecked ? "Present" : "Absent" };
    });
    setAttendance(updatedAttendance);
    setSelectAll(isChecked);
  };

  // Submit attendance with validation
  const handleSubmit = () => {
    if (!date) {
      // Show a popup if date is not selected
      alert("Please select a date before submitting attendance.");
      return;
    }

    const attendanceArray = Object.entries(attendance).map(([roll, { status }]) => ({
      roll,
      date,
      status,
    }));

    markAttendance(year, match.params.course, attendanceArray);

    // Reset checkboxes after submission
    setAttendance({});
    setSelectAll(false); // Uncheck the "Select All" checkbox
  };

  return students.length > 0 ? (
    <Fragment>
      <div className="grid-container">
        <header className="header" style={{backgroundColor: "#099E2A"}}>
          <div className="header__logo">Attendance Dashboard</div>
        </header>
        <Sidebar user={user} />

        <div>
          <h1 style={{ paddingLeft: "15px", paddingTop: "15px" }}>
            {match.params.course}
          </h1>
          <h5 style={{ paddingLeft: "15px" }}>
            <b>Choose date: </b>
          </h5>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <table
            id="attendance-table"
            className="table table-bordered table-striped"
          >
            <thead style={{ backgroundColor: "#099E2A", color: "white" }}>
              <tr>
                <th>S.No</th>
                <th>Roll</th>
                <th>Name</th>
                <th>Date</th>
                <th>
                  Select All{" "}
                  <input
                    type="checkbox"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginLeft: "10px",
                    }}
                    checked={selectAll}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
              </tr>
            </thead>

            <tbody id="myTable">
              {students.map((record, index) => (
                <Table
                  key={record.roll}
                  record={record}
                  index={index + 1}
                  date={date}
                  course={match.params.course}
                  handleCheckboxChange={handleCheckboxChange}
                  attendance={attendance}
                />
              ))}
            </tbody>
          </table>
          <button
            onClick={handleSubmit}
            className="btn btn-success"
            style={{ marginLeft: "20px", backgroundColor: "#099E2A", height: "50px", width: "100px" }}
          >
            Submit
          </button>

        </div>
      </div>
    </Fragment>
  ) : (
    <div className="grid-container">
      <Sidebar user={user} />
      <h1>No records created for {match.params.course} yet.</h1>
    </div>
  );
};

FacultyAttendance.propTypes = {
  getStudents: PropTypes.func.isRequired,
  markAttendance: PropTypes.func.isRequired,
  faculty: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  faculty: state.faculty,
  auth: state.auth,
});

export default connect(mapStateToProps, { getStudents, markAttendance })(FacultyAttendance);
