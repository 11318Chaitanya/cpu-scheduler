from flask import Flask, request, jsonify, send_file
from flask_cors import CORS  # Import CORS from flask_cors module
import subprocess
import json

app = Flask(__name__)
CORS(app)  # Initialize CORS with your Flask app

@app.route('/submit', methods=['POST'])
def submit():
    try:
        processes = json.loads(request.form['inputData'])  # Use json.loads for parsing JSON data
        time_quantum = int(request.form['timeQuantum'])

        print(processes)
        print(time_quantum)

        with open('input.txt', 'w') as f:
            f.write(f"{time_quantum}\n")
            for process in processes:
                f.write(f"{process['pid']} {process['arrivalTime']} {process['burstTime']}\n")

        # Compile and execute C++ program
        compile_process = subprocess.run(['g++', 'main.cpp', '-o', 'scheduler'], capture_output=True)
        if compile_process.returncode != 0:
            return jsonify({'error': 'Compilation failed'})

        run_process = subprocess.run(['./scheduler'], capture_output=True)
        if run_process.returncode != 0:
            return jsonify({'error': 'Execution failed'})

        # Read output JSON from file
        with open('output.json', 'r') as f:
            output_data = json.load(f)

        return jsonify(output_data)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=8080)
