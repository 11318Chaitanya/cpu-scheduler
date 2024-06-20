import React from "react";
import ProcessTableRow from "./OutputTableRow";
import GanttChart from "./GanttChar";
import ComparisonGraphs from "./ComparisonGraphs";
import OptimalScheduler from "./OptimalScheduler";

const SchedulerOutputContainer = ({ outputData }) => {
  return (
    <div className="text-center mx-6">
      <h2 className="text-2xl font-semibold mb-4">Scheduler Output</h2>
      <div className="grid grid-cols-2 gap-6">
        {outputData &&
          Object.keys(outputData.data).map((key, index) => (
            <div key={index} className="py-2 px-2">
              <h3 className="text-lg font-semibold mb-2">
                {outputData.data[key].scheduler_name === "RR"
                  ? `${outputData.data[key].scheduler_name} (Time Quantum: ${outputData.time_quantum})`
                  : outputData.data[key].scheduler_name}
              </h3>
              <table className="min-w-full bg-white border border-gray-200 text-left">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 py-1 px-2 font-medium text-sm">
                      PID
                    </th>
                    <th className="border border-gray-300 py-1 px-2 font-medium text-sm">
                      Arrival Time
                    </th>
                    <th className="border border-gray-300 py-1 px-2 font-medium text-sm">
                      Burst Time
                    </th>
                    <th className="border border-gray-300 py-1 px-2 font-medium text-sm">
                      Completion Time
                    </th>
                    <th className="border border-gray-300 py-1 px-2 font-medium text-sm">
                      Turnaround Time
                    </th>
                    <th className="border border-gray-300 py-1 px-2 font-medium text-sm">
                      Waiting Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {outputData.data[key].processes.map((process, index) => (
                    <ProcessTableRow key={index} process={process} />
                  ))}
                </tbody>
              </table>
              <div>
                <h4 className="text-md font-semibold mt-4">Gantt Chart</h4>
                <GanttChart processes={outputData.data[key].processes} />
              </div>
            </div>
          ))}
      </div>

      {outputData && (
        <div className="flex gap-4">
          <OptimalScheduler outputData={outputData} />
          <ComparisonGraphs outputData={outputData} />
        </div>
      )}
    </div>
  );
};

export default SchedulerOutputContainer;
