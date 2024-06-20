# Scheduling Algorithms Web Application

This project is a web application that allows users to input processes and their respective burst and arrival times to simulate various scheduling algorithms. The backend is built using Flask and the frontend using React.

## Table of Contents

- [Project's Title](#projects-title)
- [Project Description](#project-description)
- [How to Run the Project](#how-to-run-the-project)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Running the Application](#running-the-application)
- [The Internal Working of Your Project](#the-internal-working-of-your-project)
  - [Explanation of C++ Scheduling Algorithms](#explanation-of-c-scheduling-algorithms)
    - [FCFS (First-Come, First-Served)](#fcfs-first-come-first-served)
    - [SJF (Shortest Job First)](#sjf-shortest-job-first)
    - [RR (Round Robin)](#rr-round-robin)
    - [SRTF (Shortest Remaining Time First)](#srtf-shortest-remaining-time-first)
  - [Selection Algorithm](#selection-algorithm)
  - [How Flask Interacts with the C++ File](#how-flask-interacts-with-the-c-file)
- [Your Learning Takeaways from the Project](#your-learning-takeaways-from-the-project)
- [Resources/References](#resourcesreferences)
- [Contributing](#contributing)


## Project's Title

CPU Scheduler Simulation

## Project Description

This project simulates various CPU scheduling algorithms using a combination of C++ for backend processing and a modern web frontend built with React and Vite. Users can input processes, including their arrival and burst times, and visualize the scheduling results through charts and tables.

## How to Run the Project

### Backend Setup

The backend is built using Flask and handles the processing of scheduling algorithms written in C++.

#### Prerequisites

- Python 3.x
- Flask
- Flask-CORS
- g++ (GNU Compiler Collection)

#### Installation

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

#### Running the Backend

1. Ensure you are in the `backend` directory with the virtual environment activated.
2. Start the Flask server:
    ```bash
    python app.py
    ```

The backend server should now be running on `http://localhost:8080`.

#### Endpoints

- `POST /submit`: Accepts CPU scheduling input data and returns the scheduling results.

### Frontend Setup

The frontend is built using React and communicates with the backend to display the results of the scheduling algorithms.

#### Prerequisites

- Node.js
- npm (Node Package Manager)

#### Installation

1. Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```

2. Install the required npm packages:
    ```bash
    npm install
    ```

#### Running the Frontend

1. Ensure you are in the `frontend` directory.
2. Run the Vite development server:
    ```bash
    npm run dev
    ```

The frontend should now be running and accessible at the address provided in the terminal output, typically `http://localhost:3000`.

### Running the Application

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

## The Internal Working of Your Project

### Explanation of C++ Scheduling Algorithms

#### FCFS (First-Come, First-Served)

- Processes are executed in the order they arrive.
- Simple and easy to implement, but can suffer from the "convoy effect" where short processes wait for long processes to complete.

#### SJF (Shortest Job First)

- Processes with the shortest burst time are executed first.
- Optimal for minimizing waiting time but requires precise knowledge of burst times, which isn't always possible.

#### RR (Round Robin)

- Each process is assigned a fixed time quantum.
- Processes are executed in a cyclic order.
- Provides fair time-sharing but can suffer from high context-switching overhead if the time quantum is too small.

#### SRTF (Shortest Remaining Time First)

- Preemptive version of SJF where the process with the shortest remaining burst time is executed next.
- Minimizes waiting time for shorter processes arriving later.

### Selection Algorithm

- **FCFS (First-Come, First-Served)**:
  - If the standard deviation of arrival times is greater than 50% of the average burst time, FCFS is recommended as it benefits processes arriving early.
  
- **SJF (Shortest Job First)**:
  - If the standard deviation of burst times is less than 50% of the average burst time, SJF minimizes waiting time by executing shorter jobs first.

- **RR (Round Robin)**:
  - If the standard deviation of burst times is between 50% and 100% of the average burst time, RR ensures fair time distribution. The time quantum is set to 80% of the average burst time.

- **SRTF (Shortest Remaining Time First)**:
  - If none of the above conditions are met, SRTF benefits from preemptive scheduling to minimize waiting time by executing shorter processes arriving later.


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

## My Learning Takeaways from the Project

- **Understanding of Scheduling Algorithms**: Explored different CPU scheduling algorithms such as FCFS, SJF, RR, and SRTF, understanding their strengths and weaknesses.
  
- **Integration of Backend and Frontend**: Learned how to integrate a Flask backend with a React frontend, handling data flow and communication between different components.
  
- **Algorithm Selection Logic**: Developed a selection algorithm based on statistical analysis of input data, optimizing the choice of scheduling algorithm dynamically.
  
- **Hands-on with C++ Integration**: Gained practical experience in integrating C++ programs within a web application context, managing file interactions and subprocess execution.
  
- **Software Engineering Best Practices**: Practiced good software engineering principles such as modular design, version control with Git, and collaborative development through contributions.


## Resources/References

- **CPU Scheduling Algorithms**:
  - Operating System Concepts by Abraham Silberschatz, Peter Baer Galvin, and Greg Gagne
  - GeeksforGeeks articles on CPU Scheduling
- **Flask Documentation**: https://flask.palletsprojects.com/
- **React Documentation**: https://reactjs.org/docs/getting-started.html
- **Vite Documentation**: https://vitejs.dev/guide/
- **C++ Reference**: http://www.cplusplus.com/reference/
- **Chart.js Documentation**: https://www.chartjs.org/docs/latest/
- **TutorialsPoint C++ Programming**: https://www.tutorialspoint.com/cplusplus/index.htm

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a pull request.




