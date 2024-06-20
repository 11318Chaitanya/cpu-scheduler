# Scheduling Algorithms Web Application

This project is a web application that allows users to input processes and their respective burst and arrival times to simulate various scheduling algorithms. The backend is built using Flask and the frontend using React.

## Table of Contents

- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [How Flask Interacts with the C++ File](#how-flask-interacts-with-the-c-file)
- [Contributing](#contributing)


## Backend Setup

The backend is built using Flask and handles the processing of scheduling algorithms written in C++.

### Prerequisites

- Python 3.x
- Flask
- Flask-CORS
- g++ (GNU Compiler Collection)

### Installation

1. Navigate to the `backend` folder:
    ```bash
    cd backend
    ```

2. Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install required Python packages:
    ```bash
    pip install Flask Flask-CORS
    ```

### Running the Backend

1. Ensure you are in the `backend` directory with the virtual environment activated.
2. Start the Flask server:
    ```bash
    python app.py
    ```

The backend server should now be running on `http://localhost:8080`.

### Endpoints

- `POST /submit`: Accepts CPU scheduling input data and returns the scheduling results.

## Frontend Setup

The frontend is built using React and communicates with the backend to display the results of the scheduling algorithms.

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```

2. Install the required npm packages:
    ```bash
    npm install
    ```

### Running the Frontend

1. Ensure you are in the `frontend` directory.
2. Run the Vite development server:
    ```bash
    npm run dev
    ```

The frontend should now be running and accessible at the address provided in the terminal output, typically `http://localhost:3000`.

## Running the Application

1. Start the backend server as described in the [Backend Setup](#backend-setup) section.
2. Start the frontend server as described in the [Frontend Setup](#frontend-setup) section.
3. Open your web browser and navigate to the address provided in the terminal output.

## Usage

1. Input the process details including Process ID, Arrival Time, and Burst Time.
2. Set the Time Quantum for Round Robin scheduling.
3. Click the "Submit" button to process the input data.
4. View the results which include:
   - Gantt chart
   - Comparison of average waiting time and average turnaround time
   - Optimal scheduling algorithm based on the given inputs
   - Statistical data such as standard deviation and averages of burst and arrival times.

### How Flask Interacts with the C++ File

1. **Receiving Input**:
   - The Flask app receives input data via a `POST` request to the `/submit` endpoint.
   - The input data, which includes the processes and the time quantum, is parsed and saved to a file named `input.txt`.

2. **Compiling the C++ Program**:
   - Flask runs a subprocess command to compile the `main.cpp` file using `g++`.
   - If the compilation fails, an error message is returned.

3. **Executing the Compiled Program**:
   - Upon successful compilation, Flask runs the compiled C++ program.
   - The C++ program reads the `input.txt` file, processes the data, and writes the scheduling results to `output.json`.

4. **Returning Output**:
   - Flask reads the `output.json` file and returns the results as a JSON response.

### Predicted Algorithm Explanation

- **FCFS (First-Come, First-Served)**:
  - If the standard deviation of arrival times is greater than 50% of the average burst time, FCFS is recommended as it benefits processes arriving early.
  
- **SJF (Shortest Job First)**:
  - If the standard deviation of burst times is less than 50% of the average burst time, SJF minimizes waiting time by executing shorter jobs first.

- **RR (Round Robin)**:
  - If the standard deviation of burst times is between 50% and 100% of the average burst time, RR ensures fair time distribution. The time quantum is set to 80% of the average burst time.

- **SRTF (Shortest Remaining Time First)**:
  - If none of the above conditions are met, SRTF benefits from preemptive scheduling to minimize waiting time by executing shorter processes arriving later.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a pull request.




