#include <bits/stdc++.h>
#include <fstream>
#include "json.hpp"

using namespace std;
using json = nlohmann::json;

struct Process {
    int pid;
    int at;
    int bt;
    int rt;
    int ct;
    int wt;
    int tat;
    vector<pair<int, int>> gantt; // Pair of (start time, end time) for each execution segment
};

void fcfs(vector<Process> p, json& outputJson);
void rr(vector<Process> p, json& outputJson, int& tq);
void sjf(vector<Process> p, json& outputJson);
void srtf(vector<Process> p, json& outputJson);

void generateOutput(vector<Process> &p, json& outputJson, string schedulerName);
void average(vector<Process> &p, json& outputJson);


//================================== Predicting the best algo for the given condition ===================================// 

void select_algorithm(vector<Process> p, json& outputJson) {
    int n = p.size();
    float avg_at = 0, avg_bt = 0, variance_at = 0, variance_bt = 0;

    for (auto &proc : p) {
        avg_at += proc.at;
        avg_bt += proc.bt;
    }
    avg_at /= n;
    avg_bt /= n;

    for (auto &proc : p) {
        variance_at += pow(proc.at - avg_at, 2);
        variance_bt += pow(proc.bt - avg_bt, 2);
    }
    variance_at /= n;
    variance_bt /= n;

    float stddev_at = sqrt(variance_at);
    float stddev_bt = sqrt(variance_bt);

    cout << "Average AT: " << avg_at << ", Stddev AT: " << stddev_at << endl;
    cout << "Average BT: " << avg_bt << ", Stddev BT: " << stddev_bt << endl;

    outputJson["average_at"] = avg_at;
    outputJson["standard_deviation_at"] = stddev_at;
    outputJson["average_bt"] = avg_bt;
    outputJson["standard_deviation_bt"] = stddev_bt;


    // Refined decision criteria
    if (stddev_at > avg_bt * 0.5) {
        outputJson["predicted_algo"] = "FCFS";
    } else if (stddev_bt < avg_bt * 0.5) {
        outputJson["predicted_algo"] = "SJF";
    } else if (stddev_bt > avg_bt * 0.5 && stddev_bt < avg_bt) {
        outputJson["predicted_algo"] = "RR";
    } else {
        outputJson["predicted_algo"] = "SRTF";
    }
}

//===================================== FCFS (First Come First Serve) =========================================//

void fcfs(vector<Process> p, json& outputJson) {
    auto comp = [](Process &first, Process &second) {
        return first.at < second.at;
    };

    sort(p.begin(), p.end(), comp);

    int curr_t = 0;
    for (auto &i : p) {
        if (curr_t < i.at) {
            curr_t = i.at;
        }
        int start_t = curr_t;
        i.ct = i.bt + curr_t;
        curr_t = i.ct;
        i.tat = i.ct - i.at;
        i.wt = i.tat - i.bt;
        i.gantt.push_back({start_t, i.ct});
    }

    generateOutput(p, outputJson, "FCFS");
}

//=============================================== RR (Round Robin) ==============================================//

void rr(vector<Process> p, json& outputJson, int& tq) {
    int n = p.size();
    int curr_t = 0;
    int comp = 0;
    int ind = 0;

    float avg_bt = 0;
    for (auto &proc : p) {
        avg_bt += proc.bt;
    }
    avg_bt /= n;
    int time_quantum = max(1, (int)(0.8 * avg_bt));

    if(tq != 0) time_quantum = tq;
    else tq = time_quantum;

    sort(p.begin(), p.end(), [](Process & a, Process & b){
        return a.at < b.at;
    });

    queue<int> ready_queue;
    
    while(comp < n || !ready_queue.empty()){
        while(ind < n && p[ind].at <= curr_t){
            ready_queue.push(ind);
            ind++;
        }

        if(ready_queue.empty()){
            curr_t++;
            continue;
        }

        int i = ready_queue.front();
        ready_queue.pop();

        int start_t = curr_t;
        if (p[i].rt > time_quantum) {
            curr_t += time_quantum;
            p[i].rt -= time_quantum;
            while (ind < n && p[ind].at <= curr_t) {
                ready_queue.push(ind);
                ind++;
            }
            ready_queue.push(i);
        } else {
            curr_t += p[i].rt;
            p[i].rt = 0;
            p[i].ct = curr_t;
            p[i].tat = p[i].ct - p[i].at;
            p[i].wt = p[i].tat - p[i].bt;
            comp++;
        }
        p[i].gantt.push_back({start_t, curr_t});
    }

    generateOutput(p, outputJson, "RR");
}


//======================================= SJF (Shortest Job First) [Non Preemptive] ================================================//

void sjf(vector<Process> p, json& outputJson) {
    auto comp = [](Process & first, Process & second){
        return first.at < second.at;
    };

    sort(p.begin(), p.end(), comp);

    vector<Process> ready_queue;
    int curr_t = 0;
    int ind = 0;
    int n = p.size();

    while(ind < n || !ready_queue.empty()){
        while(ind < n && p[ind].at <= curr_t){
            ready_queue.push_back(p[ind]);
            ind++;
        }

        if(ready_queue.empty()){
            curr_t = p[ind].at;
            continue;
        }

        sort(ready_queue.begin(), ready_queue.end(), [](Process &a, Process &b){
                return a.bt < b.bt;
        });

        Process curr_pr = ready_queue.front();
        ready_queue.erase(ready_queue.begin());
        int start_t = curr_t;
        curr_pr.wt = max(0, curr_t - curr_pr.at);
        curr_t += curr_pr.bt;
        curr_pr.ct = curr_t;

        for(auto &i: p){
            if(i.pid == curr_pr.pid){
                i.wt = curr_pr.wt;
                i.tat = curr_pr.wt + curr_pr.bt;
                i.ct = curr_pr.ct;
                i.gantt.push_back({start_t, curr_pr.ct});
                break;
            }
        }
    }
    generateOutput(p, outputJson, "SJF");
}

//==================================== SRTF (Shortest Remaining Time First) [Preemptive] ====================================//

void srtf(vector<Process> p, json& outputJson) {
    int n = p.size();
    int curr_t = 0;
    int comp = 0;

    while (comp != n) {
        int minInd = -1;
        int mini = INT_MAX;
        for (int i = 0; i < n; i++) {
            if (p[i].at <= curr_t && p[i].rt > 0 && p[i].rt < mini) {
                mini = p[i].rt;
                minInd = i;
            }
        }

        if (minInd == -1) {
            curr_t++;
            continue;
        }

        int start_t = curr_t;
        p[minInd].rt--;

        if (p[minInd].rt == 0) {
            comp++;
            int completionTime = curr_t + 1;
            p[minInd].ct = completionTime;
            p[minInd].wt = completionTime - p[minInd].at - p[minInd].bt;
            p[minInd].tat = completionTime - p[minInd].at;
            p[minInd].gantt.push_back({start_t, completionTime});
        } else {
            // Check if the current interval overlaps with the previous interval for the same process
            if (!p[minInd].gantt.empty() && p[minInd].gantt.back().second == curr_t) {
                p[minInd].gantt.back().second++; // Extend the end time of the last interval
            } else {
                p[minInd].gantt.push_back({start_t, curr_t + 1});
            }
        }
        curr_t++;
    }

    generateOutput(p, outputJson, "SRTF");
}

void average(vector<Process>& p, json& outputJson) {
    int total = 0;
    for (auto &i : p) {
        total += i.wt;
    }
    outputJson["average_waiting_time"] = (float)total / p.size();

    total = 0;
    for (auto &i : p) {
        total += i.tat;
    }
    outputJson["average_turnaround_time"] = (float)total / p.size();
}

void generateOutput(vector<Process>& p, json& outputJson, string schedulerName) {
    sort(p.begin(), p.end(), [](Process &a, Process &b) {
        return a.pid < b.pid;
    });

    // Merge consecutive intervals with the same start and end times
    for (auto& process : p) {
        vector<pair<int, int>> merged;
        for (size_t i = 0; i < process.gantt.size(); ++i) {
            int start = process.gantt[i].first;
            int end = process.gantt[i].second;
            while (i < process.gantt.size() - 1 && process.gantt[i + 1].first == end) {
                end = process.gantt[++i].second;
            }
            merged.push_back({start, end});
        }
        process.gantt = merged;
    }


    json processesJson = json::array();

    for (auto &i : p) {
        json processJson;
        processJson["pid"] = i.pid;
        processJson["arrival_time"] = i.at;
        processJson["burst_time"] = i.bt;
        processJson["completion_time"] = i.ct;
        processJson["turnaround_time"] = i.tat;
        processJson["waiting_time"] = i.wt;
        
        json ganttJson = json::array();
        for (auto &segment : i.gantt) {
            json segmentJson;
            segmentJson["start_time"] = segment.first;
            segmentJson["end_time"] = segment.second;
            ganttJson.push_back(segmentJson);
        }
        processJson["gantt_chart"] = ganttJson;
        
        processesJson.push_back(processJson);
    }

    outputJson["scheduler_name"] = schedulerName;
    outputJson["processes"] = processesJson;
    average(p, outputJson);
}

int main() {
    ifstream inputFile("input.txt");
    ofstream outputFile("output.json"); // Change to JSON file

    if (!inputFile.is_open()) {
        cerr << "Error reading input file 🥲" << endl;
        return 0;
    }
    if (!outputFile.is_open()) {
        cerr << "Error reading output file 🥲" << endl;
        return 0;
    }

    vector<Process> p;
    int pid, at, bt;
    int tq;

    inputFile >> tq;
    
    while (inputFile >> pid >> at >> bt) {
        p.push_back({pid, at, bt, bt, 0, 0, 0});
    }


    if (p.empty()) {
        cerr << "No processes found from input file" << endl;
        return 0;
    } else {
        for (const auto &i : p) {
            cerr << "Loaded Process - PID: " << i.pid << ", Burst Time: " << i.bt << ", Arrival Time: " << i.at << endl;
        }
    }


    json outputJson;
    select_algorithm(p, outputJson);

    json fcfsJson, rrJson, sjfJson, srtfJson;
    json data;
    
    fcfs(p, fcfsJson);
    rr(p, rrJson, tq);
    sjf(p, sjfJson);
    srtf(p, srtfJson);

    data["0"] = fcfsJson;
    data["1"] = rrJson;
    data["2"] = sjfJson;
    data["3"] = srtfJson;

    outputJson["data"] = data;

    outputJson["time_quantum"] = tq;

    outputFile << outputJson.dump(4); // Write JSON to file with indentation

    inputFile.close();
    outputFile.close();

    return 0;
}
