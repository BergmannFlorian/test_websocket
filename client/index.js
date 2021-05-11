let socket;

const log = function (message) {
    console.log(message);
    var log = document.createElement('div');
    var date = new Date
    log.textContent = date.toLocaleString() + ' ' + message; //slice(0, 24)
    document.getElementById('log').appendChild(log);
};

const onopen = () => {
    log("[open] Connection established");

    document.body.style.backgroundColor = "green"
};

const onmessage = function (event) {
    log(`[message] Data received from server: ${event.data}`);
};

const onclose = function (event) {
    if (event.wasClean) {
        log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        document.body.style.backgroundColor = "orangered"
    } else {
        log('[close] Connection died');
        document.body.style.backgroundColor = "red"
    }
};

const onerror = function (error) {
    log(`[error] ${error.message}`);
    document.body.style.backgroundColor = "red"
};

const newWebsocket = function () {
    if (socket != null) socket.close(1000, "Restart login");
    var mail = document.getElementById("mail").value;
    var token = document.getElementById("token").value;
    socket = new WebSocket(`ws://localhost?login=${mail}&token=${token}`, 'echo-protocol');
    socket.onopen = onopen
    socket.onmessage = onmessage
    socket.onclose = onclose
    socket.onerror = onerror
}

document.getElementById('login').addEventListener('click', (event) => {
    newWebsocket();
});
document.getElementById('logout').addEventListener('click', (event) => {
    if (socket != null) socket.close(1000, "Logout");
});
