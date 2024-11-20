import React from "react";
import PropTypes from "prop-types";

const Table = ({ record, index, date, course, handleCheckboxChange, attendance }) => {
  const { roll, name } = record;

  return (
    <tr>
      <td style={{ fontWeight: "700", fontSize: "36" }}>{index}</td>
      <td style={{ fontWeight: "700", fontSize: "36" }}>{roll}</td>
      <td style={{ fontWeight: "700" }}>{name}</td>
      <td style={{ fontWeight: "700", fontSize: "36" }}>{date}</td>
      <td>
        <input
          type="checkbox"
          style={{
                      width: "20px", // Adjust the width
                      height: "20px",
                      marginLeft:"10px" // Adjust the height
                    }}
          checked={attendance[roll]?.status === "Present"}
          onChange={(e) => handleCheckboxChange(roll, e.target.checked ? "Present" : "Absent")}
        />
      </td>
    </tr>
  );
};

Table.propTypes = {
  record: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  course: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  attendance: PropTypes.object.isRequired,
};

export default Table;
