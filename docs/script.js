document.getElementById("process-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const numProcesses = document.getElementById("num-processes").value;
    const timeQuantum = document.getElementById("time-quantum").value;
    
    // Hide the form for submitting process count and time quantum
    document.getElementById("input-section").style.display = 'none';
    
    // Show the form for entering process details
    document.getElementById("process-inputs-section").style.display = 'block';

    // Generate process detail input fields dynamically
    const processDetailsForm = document.getElementById("process-details-form");
    processDetailsForm.innerHTML = '';
    
    for (let i = 1; i <= numProcesses; i++) {
        processDetailsForm.innerHTML += `
            <h3>Process ${i}</h3>
            <label for="arrival-time-${i}">Arrival Time:</label>
            <input type="number" id="arrival-time-${i}" required><br>
            <label for="burst-time-${i}">Burst Time:</label>
            <input type="number" id="burst-time-${i}" required><br>
            <label for="priority-${i}">Priority:</label>
            <input type="number" id="priority-${i}" required><br>
        `;
    }
    
    // Store number of processes and time quantum for later use
    document.getElementById("submit-all-processes").addEventListener("click", function() {
        const processes = [];
        for (let i = 1; i <= numProcesses; i++) {
            processes.push({
                id: i,
                arrivalTime: document.getElementById(`arrival-time-${i}`).value,
                burstTime: document.getElementById(`burst-time-${i}`).value,
                priority: document.getElementById(`priority-${i}`).value
            });
        }
        
        // Run scheduling algorithms
        runSchedulingAlgorithms(processes, timeQuantum);
    });
});

function runSchedulingAlgorithms(processes, timeQuantum) {
    // Run each scheduling algorithm and calculate results
    const fcfsResult = fcfsScheduling(processes);
    const sjfResult = sjfScheduling(processes);
    const srtfResult = srtfScheduling(processes);
    const priorityNonPreemptiveResult = priorityNonPreemptiveScheduling(processes);
    const priorityPreemptiveResult = priorityPreemptiveScheduling(processes);
    const roundRobinResult = roundRobinScheduling(processes, timeQuantum);

    // Get the results table body element
    const resultsTableBody = document.getElementById("results-table").getElementsByTagName('tbody')[0];
    resultsTableBody.innerHTML = ''; // Clear any previous results

    // Insert the results into the table
    const results = [
        { name: "FCFS", waitingTime: fcfsResult.waitingTime, turnaroundTime: fcfsResult.turnaroundTime },
        { name: "SJF", waitingTime: sjfResult.waitingTime, turnaroundTime: sjfResult.turnaroundTime },
        { name: "SRTF", waitingTime: srtfResult.waitingTime, turnaroundTime: srtfResult.turnaroundTime },
        { name: "Priority Non-Preemptive", waitingTime: priorityNonPreemptiveResult.waitingTime, turnaroundTime: priorityNonPreemptiveResult.turnaroundTime },
        { name: "Priority Preemptive", waitingTime: priorityPreemptiveResult.waitingTime, turnaroundTime: priorityPreemptiveResult.turnaroundTime },
        { name: "Round Robin", waitingTime: roundRobinResult.waitingTime, turnaroundTime: roundRobinResult.turnaroundTime }
    ];

    // Find the best algorithm based on waiting time and turnaround time
    const bestAlgorithm = findBestAlgorithm(...results);

    results.forEach(result => {
        const row = resultsTableBody.insertRow();

        // Create cells for algorithm, waiting time, and turnaround time
        const nameCell = row.insertCell(0);
        nameCell.textContent = result.name;

        const waitingTimeCell = row.insertCell(1);
        waitingTimeCell.textContent = result.waitingTime;

        const turnaroundTimeCell = row.insertCell(2);
        turnaroundTimeCell.textContent = result.turnaroundTime;

        // Highlight the best algorithm
        if (bestAlgorithm === result.name) {
            row.classList.add("best-algorithm");
        }
    });
}

function findBestAlgorithm(...results) {
    let bestAlgorithm = '';
    let minWaitingTime = Infinity;
    let minTurnaroundTime = Infinity;

    results.forEach(result => {
        if (result.waitingTime < minWaitingTime) {
            minWaitingTime = result.waitingTime;
            minTurnaroundTime = result.turnaroundTime;
            bestAlgorithm = result.name;
        } else if (result.waitingTime === minWaitingTime && result.turnaroundTime < minTurnaroundTime) {
            minTurnaroundTime = result.turnaroundTime;
            bestAlgorithm = result.name;
        }
    });

    return bestAlgorithm;
}

// Dummy implementations of scheduling algorithms for now

function fcfsScheduling(processes) {
    return { waitingTime: 10, turnaroundTime: 15 };
}

function sjfScheduling(processes) {
    return { waitingTime: 8, turnaroundTime: 12 };
}

function srtfScheduling(processes) {
    return { waitingTime: 7, turnaroundTime: 11 };
}

function priorityNonPreemptiveScheduling(processes) {
    return { waitingTime: 9, turnaroundTime: 14 };
}

function priorityPreemptiveScheduling(processes) {
    return { waitingTime: 6, turnaroundTime: 10 };
}

function roundRobinScheduling(processes, timeQuantum) {
    return { waitingTime: 11, turnaroundTime: 16 };
}
