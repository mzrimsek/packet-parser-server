require('dotenv').config();

const net = require('net');
const mqtt = require('mqtt');
const { hexToUtf8 } = require('./utils/convert');

const mqttClient = mqtt.connect(process.env.MQTT_BROKER_ADDRESS);
mqttClient.on('connect', () => {
    logger.info('Connected to MQTT Broker');
});

const server = net.createServer(socket => {
    socket.on('connect', () => {
        const now = new Date().toUTCString();
        console.info(`${now} - client connected`);
    });

    socket.on('close', () => {
        const now = new Date().toUTCString();
        console.info(`${now} - client disconnected`);
    });

    socket.on('data', chunk => {
        const now = new Date().toUTCString();
        console.info(`${now} - data received`);

        const content = hexToUtf8(chunk);
        console.info(`data: ${content}`);

        const packetMatcher = new RegExp(process.env.PACKET_MATCHER);

        if (content.match(packetMatcher)) {
            const match = content.match(packetMatcher);
            const matchedContent = match[0];
            console.info(`matched content: ${matchedContent}`);

            mqttClient.publish(process.env.TARGET_TOPIC, matchedContent);
        }

        socket.end();
    });
});

server.listen(3000, () => {
    console.info(`Listening on ${server.address().port}`);
});

module.exports = server;
