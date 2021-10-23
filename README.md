# packet-parser-server

A simple server to parse and filter raw packet data, and then send the captured data along to an MQTT server.

## Environment

`PACKET_MATCHER` - A regular expression to filter the data captured from the packets  
`MQTT_BROKER_ADDRESS` - Address of the target MQTT broker running at port 1883  
`TARGET_TOPIC` - The topic to send data to on the MQTT server  

## Docker

All the same environment variables, with an additional `HOST_PORT` variable to define what port will be exposed on the host machine to communicate with the container.

The included Docker Compose file also includes a Mosquitto server pre-configured as the MQTT broker.