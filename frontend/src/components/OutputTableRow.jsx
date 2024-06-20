import React from "react";

const ProcessTableRow = ({ process }) => {
  return (
    <tr>
      <td className="border border-gray-300 py-1 px-2 text-sm">{process.pid}</td>
      <td className="border border-gray-300 py-1 px-2 text-sm">{process.arrival_time}</td>
      <td className="border border-gray-300 py-1 px-2 text-sm">{process.burst_time}</td>
      <td className="border border-gray-300 py-1 px-2 text-sm">{process.completion_time}</td>
      <td className="border border-gray-300 py-1 px-2 text-sm">{process.turnaround_time}</td>
      <td className="border border-gray-300 py-1 px-2 text-sm">{process.waiting_time}</td>
    </tr>
  );
};

export default ProcessTableRow;
