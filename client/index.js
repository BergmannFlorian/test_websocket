let socket = new WebSocket('ws://localhost?login=test&token=test2', 'echo-protocol');

socket.onopen = function (e) {
    console.log("[open] Connection established");
    console.log("Sending to server");
    socket.send("My name is John");
};

socket.onmessage = function (event) {
    console.log(`[message] Data received from server: ${event.data}`);
    var log = document.createElement('p');
    log.content = "Received: '" + message.utf8Data + "'";
    document.getElementById('log').appendChild(log);
};

socket.onclose = function (event) {
    if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died');
    }
};

socket.onerror = function (error) {
    console.log(`[error] ${error.message}`);
};


document.getElementById('login').addEventListener('click', (event) => {
    socket.close(1000, "Logout");
    socket = new WebSocket('ws://localhost?login=test&token=test2', 'echo-protocol');
});
document.getElementById('logout').addEventListener('click', (event) => {
    socket.close(1000, "Logout");
});
