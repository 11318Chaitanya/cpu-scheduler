// InputProcesses.jsx
import React, { useState, useEffect } from "react";
import ProcessRow from "./ProcessRow";
import Controller from "./Controller";

const InputProcesses = ({ onSubmit }) => {
  const [rows, setRows] = useState(5); // Initialize with 5 rows for default inputs
  const [turnaroundTime, setTurnAroundTime] = useState(2);
  const [processData, setProcessData] = useState([]);

  // Set default input values on component mount
  useEffect(() => {
    const defaultProcesses = [
      { pid: "1", arrivalTime: "0", burstTime: "6" },
      { pid: "2", arrivalTime: "1", burstTime: "3" },
      { pid: "3", arrivalTime: "2", burstTime: "8" },
      { pid: "4", arrivalTime: "3", burstTime: "1" },
      { pid: "5", arrivalTime: "4", burstTime: "4" },
    ];

    setProcessData(defaultProcesses);
  }, []);

  const addRow = () => {
    setRows((prevRows) => prevRows + 1);
    // Add default process data for the new row

    const newRow = {
      pid: `${rows + 1}`,
      arrivalTime: "0",
      burstTime: "5",
    };
    setProcessData((prevData) => [...prevData, newRow]);
  };

  const removeRow = () => {
    if (rows > 1) {
      setRows((prevRows) => prevRows - 1);
      // Remove the last row's process data
      setProcessData((prevData) => prevData.slice(0, -1));
    }
  };

  const handleInputChange = (e, rowIndex, field) => {
    const { name, value } = e.target;
    const newData = [...processData];
    newData[rowIndex][name] = value;
    setProcessData(newData);
    console.log(processData);
  };

  const changeTurnAroundTime = (e) => {
    setTurnAroundTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data to send to Flask backend
    const formData = new FormData();
    formData.append("inputData", JSON.stringify(processData));
    formData.append("timeQuantum", turnaroundTime);

    // Call parent component's onSubmit function
    onSubmit(formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center text-xl font-medium mb-4">
        <h2>Type values into the table and the results will be displayed below</h2>
      </div>

      <form id="processForm" onSubmit={handleSubmit}>
        <div className="w-full mb-4">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                  Process
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                  Arrival Time
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                  Burst Time
                </th>
              </tr>
            </thead>
            <tbody>
              {processData.map((process, index) => (
                <ProcessRow
                  key={index}
                  index={index}
                  process={process}
                  handleInputChange={handleInputChange}
                />
              ))}
            </tbody>
          </table>
        </div>

        <Controller
          rows={rows}
          addRow={addRow}
          removeRow={removeRow}
          turnaroundTime={turnaroundTime}
          changeTurnAroundTime={changeTurnAroundTime}
        />

        {/* <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Submit
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default InputProcesses;
