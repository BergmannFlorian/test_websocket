import { client as WebSocketClient } from 'websocket';

var client = new WebSocketClient();

client.on('connectFailed', (error) => console.log('Connect Error: ' + error.toString()));

client.on('connect', (connection) => {
    console.log('WebSocket Client Connected');
    connection.on('error', (error) => console.log("Connection Error: " + error.toString()));
    connection.on('close', () => console.log('echo-protocol Connection Closed'));
    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });

    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            connection.sendUTF(number.toString());
            setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();
});

var options = {
    headers: {
        "Authorization": "Bearer token",
        "x-ms-client-request-id": "user"
    }
}

client.connect('ws://localhost?login=test&token=test2', 'echo-protocol', null, null, options);