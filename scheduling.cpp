#include <iostream>
#include <vector>
#include <tuple>
using namespace std;

struct Process {
    int id, burst_time, arrival_time;
};

void fcfs(vector<Process> &processes) {
    int n = processes.size();
    vector<int> waiting_time(n), turnaround_time(n);
    int current_time = 0;

    for (int i = 0; i < n; ++i) {
        int arrival = processes[i].arrival_time;
        int burst = processes[i].burst_time;

        if (current_time < arrival) {
            current_time = arrival;
        }

        waiting_time[i] = current_time - arrival;
        turnaround_time[i] = waiting_time[i] + burst;
        current_time += burst;
    }

    cout << "Process\tArrival\tBurst\tWaiting\tTurnaround\n";
    for (int i = 0; i < n; ++i) {
        cout << processes[i].id << "\t"
             << processes[i].arrival_time << "\t"
             << processes[i].burst_time << "\t"
             << waiting_time[i] << "\t"
             << turnaround_time[i] << "\n";
    }
}

int main() {
    vector<Process> processes = {{1, 5, 0}, {2, 3, 2}, {3, 8, 4}};
    fcfs(processes);
    return 0;
}
