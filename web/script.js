document.getElementById("process-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("process-id").value;
    const arrival = document.getElementById("arrival-time").value;
    const burst = document.getElementById("burst-time").value;

    const resultDiv = document.getElementById("results");
    resultDiv.textContent = `Added Process: ID=${id}, Arrival=${arrival}, Burst=${burst}`;
    // Later: Send data to backend and fetch results.
});
