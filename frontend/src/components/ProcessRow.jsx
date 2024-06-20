import React from "react";

const ProcessRow = ({ index, process, handleInputChange }) => {
  return (
    <tr key={index}>
      <td className="border border-gray-300 px-4 py-1 bg-gray-200">
        <input
          type="text"
          className="w-full px-1 py-1 border border-gray-300 rounded-md outline-none border-none w-ful bg-transparent"
          value={`P${index + 1}`}
          readOnly
        />
      </td>
      <td className="border border-gray-300 px-4 py-1 hover:bg-gray-100">
        <input
          type="number"
          name={`arrivalTime`}
          data-index={index} // Use data-index to identify the index of the row
          className="w-full px-1 py-1 border border-gray-300 rounded-md outline-none border-none w-full bg-transparent"
          value={process.arrivalTime}
          onChange={(e) => handleInputChange(e, index, "arrivalTime")}
        />
      </td>
      <td className="border border-gray-300 px-4 py-1 hover:bg-gray-100">
        <input
          type="number"
          name={`burstTime`}
          data-index={index} // Use data-index to identify the index of the row
          className="w-full px-1 py-1 border border-gray-300 rounded-md outline-none border-none w-full bg-transparent"
          value={process.burstTime}
          onChange={(e) => handleInputChange(e, index, "burstTime")}
        />
      </td>
    </tr>
  );
};

export default ProcessRow;
