import React from "react";

const GanttChart = ({ processes }) => {
  // Prepare initial chart data by flattening and mapping
  const chartData = processes.flatMap((process) =>
    process.gantt_chart.map((gantt) => ({
      pid: process.pid,
      start_time: gantt.start_time,
      end_time: gantt.end_time,
    }))
  );

  // Sort chart data by start_time
  const sortedChartData = chartData.sort((a, b) => a.start_time - b.start_time);

  // Array to hold final Gantt chart blocks with spaces
  const chartWithSpaces = [];

  // Iterate through sortedChartData to insert space blocks
  sortedChartData.forEach((item, index) => {
    // Add current process block
    chartWithSpaces.push(item);

    // Check if there's a gap to insert a space block
    if (index < sortedChartData.length - 1) {
      const nextItem = sortedChartData[index + 1];
      if (item.end_time !== nextItem.start_time) {
        // Insert space block
        const spaceBlock = {
          pid: `space_${index}`, // Unique ID for space block
          start_time: item.end_time,
          end_time: nextItem.start_time,
          isSpace: true,
        };
        chartWithSpaces.push(spaceBlock);
      }
    }
  });

  // Predefined colors in the specified order
  const predefinedColors = [
    "#3cb521",   // Green
    "#DF3D82",   // Pink
    "#150379",   // Indigo
    "#ff3f00",   // Orange
    "#a12568",   // Purple
    "#7b113a",   // Maroon
    "#086e7d",   // Teal
    "#9c27b0",   // Deep Purple
    "#18bc9c",   // Turquoise
    "#ff8800",   // Dark Orange
    "#003F5C",   // Prussian Blue
    "#D45087",   // Dark Pink
  ];

  // Color map to store assigned colors
  const pidColors = {};

  // Assign colors to PIDs including space blocks
  chartWithSpaces.forEach((item, index) => {
    if (!item.isSpace && !pidColors[item.pid]) {
      // Use modulo to cycle through predefined colors
      pidColors[item.pid] = predefinedColors[index % predefinedColors.length];
    }
  });

  // Calculate max end time to determine the chart width
  const maxTime = Math.max(...chartWithSpaces.map((item) => item.end_time));

  // Render Gantt chart with blocks and spaces
  return (
    <div className="gantt-chart relative">
      {/* Process bars */}
      <div className="flex">
        {chartWithSpaces.map((item, index) => {
          if (item.isSpace) {
            // Calculate width percentage for space block
            const widthPercent = ((item.end_time - item.start_time) / maxTime) * 100;
            return (
              <div
                key={index}
                className="gantt-space bg-gray-200"
                style={{ width: `${widthPercent}%` }}
              />
            );
          } else {
            // Calculate width percentage for process block
            const widthPercent = ((item.end_time - item.start_time) / maxTime) * 100;
            const color = pidColors[item.pid];
            const isFirstBlock = index === 0 || item.start_time !== sortedChartData[index - 1].end_time;

            return (
              <div
                key={index}
                className="gantt-bar flex items-center justify-center py-1"
                style={{
                  width: `${widthPercent}%`,
                  backgroundColor: color,
                  position: "relative",
                  textAlign: "center",
                }}
              >
                <div className="absolute top-8 -left-1 text-xs flex flex-col">
                {isFirstBlock && <span>{item.start_time}</span>}
                </div>
                <div className="absolute top-8 -right-1 text-xs text-xs flex flex-col">
                  {`${item.end_time}`}
                </div>
                {!item.isSpace && (
                  <span className="text-white text-sm">
                    {`P${item.pid}`}
                  </span>
                )}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default GanttChart;
