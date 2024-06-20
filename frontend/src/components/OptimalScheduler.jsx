import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const OptimalScheduler = ({ outputData }) => {
  const chartRef = useRef(null);
  let chartInstance = useRef(null);

  useEffect(() => {
    if (outputData) {
      const {
        standard_deviation_at,
        standard_deviation_bt,
        average_at,
        average_bt,
        predicted_algo,
      } = outputData;

      // Destroy existing chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart instance
      chartInstance.current = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: ["Arrival Time", "Burst Time"],
          datasets: [
            {
              label: "Standard Deviation",
              data: [standard_deviation_at, standard_deviation_bt],
              backgroundColor: ["#1E90FF", "#1E90FF"],
              borderWidth: 1,
            },
            {
              label: "Average",
              data: [average_at, average_bt],
              backgroundColor: ["#FFA500", "#FFA500"],
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
                text: "Values",
              },
            },
            x: {
              title: {
                display: true,
                text: "Statistics",
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
        },
      });
    }

    // Clean up function to destroy chart on unmount or when outputData changes
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [outputData]);

  const renderAlgorithmExplanation = () => {
    switch (outputData.predicted_algo) {
      case "FCFS":
        return (
          <p className="text-sm">
            If the standard deviation of arrival times {outputData.standard_deviation_at.toFixed(2)} is greater
            than 50% of the average burst time {outputData.average_at.toFixed(2)}, it implies that arrival
            times are highly spread out. This scenario benefits from FCFS as
            processes arriving early can start executing immediately.
          </p>
        );
      case "SJF":
        return (
          <p className="text-sm">
            If the standard deviation of burst times {outputData.standard_deviation_bt.toFixed(2)} is less than
            50% of the average burst time, it indicates burst times are
            relatively consistent. SJF is effective here because it minimizes
            waiting time by executing shorter jobs first when their lengths are
            similar.
          </p>
        );
      case "RR":
        return (
          <p className="text-sm">
            If the standard deviation of burst times {outputData.standard_deviation_at.toFixed(2)} is between 50% and 100% of the
            average burst time, it shows moderate variability in burst times. RR
            is beneficial in such cases to ensure fair time distribution among
            processes. The time quantum {outputData.time_quantum} is set to 80% of the average burst
            time to balance between context switching overhead and process
            responsiveness.
          </p>
        );
      case "SRTF":
        return (
          <p className="text-sm">
            If none of the above conditions are met, it implies high variability
            in burst times, which benefits from preemptive scheduling to
            minimize waiting time. SRTF is effective in this scenario as it
            preempts longer processes to execute shorter ones arriving later.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-8 w-1/2 border p-2 rounded-lg">
      <div>
        <h3 className="text-lg font-semibold mb-1">
          Best Scheduling Algorithm For the Given Input
        </h3>
        <span className="font-semibold">-: {outputData.predicted_algo} :-</span>
        {renderAlgorithmExplanation()}
        <div className="flex flex-col">
          <div className="w-full my-2">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimalScheduler;
