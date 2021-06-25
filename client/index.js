let socket;

const log = function (message) {
    console.log(message);
    var log = document.createElement("div");
    var date = new Date();
    log.textContent = date.toLocaleString() + " " + message;
    var elem = document.getElementById("log");
    elem.insertBefore(log, elem.firstChild);
};

const onopen = () => {
    log("[open] Connection established");

    document.body.style.backgroundColor = "green";
};

const onmessage = function (event) {
    var data = JSON.parse(event.data);
    var msg;
    console.log(data);
    if (data.action == "message") msg = `[message] ${data.query[0].message}`;
    else if (data.action == "usersconnected") {
        msg = `[notification] users connected : `;
        data.query.forEach((user) => (msg += `${user.name} ${user.firstName}, `));
        msg = msg.slice(0, -2);
    } else if (data.action == "usersdisconnected") {
        msg = `[notification] users disconnected : `;
        data.query.forEach((user) => (msg += `${user.name} ${user.firstName}, `));
        msg = msg.slice(0, -2);
    } else if (data.action == "missnotifications") {
        msg = `[notification] ${data.query.dataSet.length} notifications missings`;
    } else if (data.action == "notification") {
        msg = `[notification] New notification on object : ${data.query[0].id}`;
    } else msg = `[${data.action}] ${data.query}`;

    log(msg);
};

const onclose = function (event) {
    if (event.wasClean) {
        log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        document.body.style.backgroundColor = "orangered";
    } else {
        log("[close] Connection died");
        document.body.style.backgroundColor = "red";
    }
};

const onerror = function (error) {
    console.log(error);
    log(`[error] ${error.message}`);
    document.body.style.backgroundColor = "red";
};

const newWebsocket = function () {
    if (socket != null) socket.close(1000, "Restart login");
    var mail = document.getElementById("mail").value;
    var token = document.getElementById("token").value;
    var domain = document.getElementById("domain").value;
    var to = document.getElementById("to").value;
    socket = new WebSocket(`${to}/user/?login=${mail}&token=${token}&domain=${domain}`);
    socket.onopen = onopen;
    socket.onmessage = onmessage;
    socket.onclose = onclose;
    socket.onerror = onerror;
};

document.getElementById("login").addEventListener("click", (event) => {
    newWebsocket();
});
document.getElementById("logout").addEventListener("click", (event) => {
    if (socket != null) socket.close(1000, "Logout");
});
