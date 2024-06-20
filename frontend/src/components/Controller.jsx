// Controller.jsx
import React from "react";

const Controller = ({ rows, addRow, removeRow, turnaroundTime, changeTurnAroundTime }) => {
  return (
    <div className="bg-gray-200 py-3 px-4 rounded-lg">
      <div>
        <h5 className="text-xl font-bold">Controller</h5>
      </div>
      <div className="flex gap-5">
        <div className="flex items-center">
          <span className="mr-3 font-semibold">Number of Processes: </span>
          <div className="flex items-center bg-white rounded-lg">
            <button
              type="button"
              onClick={addRow}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
            >
              +
            </button>
            <p className="px-7">{rows}</p>
            <button
              type="button"
              onClick={removeRow}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
            >
              -
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="turnarondTime">
            Turn Abound Time (for Round Robin):
          </label>
          <input
            type="number"
            id="turnaroundTime"
            className="border-none outline-none rounded-md px-2 py-1 text-sm w-20"
            value={turnaroundTime}
            onChange={changeTurnAroundTime}
          />
        </div>

        <div>
        <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg"
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
};

export default Controller;
