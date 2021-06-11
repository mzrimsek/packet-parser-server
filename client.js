require('dotenv').config();

const net = require('net');
const { hexToUtf8 } = require('./utils/convert');

const host = 'localhost';
const port = 3000;

const sendUtf8String = utf8String => {
    const client = new net.Socket();
    client.connect(port, host, () => {
        const now = new Date().toUTCString();
        console.info(`${now} - connected to ${host}:${port}`);

        client.write(utf8String);

        client.destroy();
    });

    client.on('end', () => {
        const now = new Date().toUTCString();
        console.info(`${now} - connection closed`);
    });
}

const sendHexString = hexString => {
    const utf8String = hexToUtf8(hexString);
    sendUtf8String(utf8String);
};
