import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ComparisonGraphs = ({ outputData }) => {
  const chartRef = useRef(null);
  let comparisonChartInstance = useRef(null);

  useEffect(() => {
    if (outputData) {
      const schedulerNames = Object.keys(outputData.data);
      const schedulers = schedulerNames.map(
        (key) => outputData.data[key].scheduler_name
      )
      const averageWaitingTimes = schedulerNames.map(
        (key) => outputData.data[key].average_waiting_time
      );
      const averageTurnaroundTimes = schedulerNames.map(
        (key) => outputData.data[key].average_turnaround_time
      );

      // Destroy existing chart instance if it exists
      if (comparisonChartInstance.current) {
        comparisonChartInstance.current.destroy();
      }

      // Create new chart instance
      comparisonChartInstance.current = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: schedulers,
          datasets: [
            {
              label: "Average Waiting Time",
              data: averageWaitingTimes,
              backgroundColor: "#3cb521", // Green
              borderWidth: 1,
            },
            {
              label: "Average Turnaround Time",
              data: averageTurnaroundTimes,
              backgroundColor: "#DF3D82", // Pink
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Time (ms)",
              },
            },
            x: {
              title: {
                display: true,
                text: "Schedulers",
              },
            },
          },
        },
      });
    }

    // Clean up function to destroy chart on unmount or when outputData changes
    return () => {
      if (comparisonChartInstance.current) {
        comparisonChartInstance.current.destroy();
      }
    };
  }, [outputData]);

  return (
    <div className="mt-8 w-1/2 border p-2 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Comparison of Average Waiting Time and Average Turnaround Time</h3>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ComparisonGraphs;
