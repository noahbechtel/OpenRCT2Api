const net = require('net')
const https = require('https')
const sendInfo = async (payload) => {
    try {

        let size = payload.toString().length
        const options = {
            hostname: 'openrct2api.herokuapp.com',
            port: 443,
            path: '/api/parks/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': size
            }
        }
        const req = https.request(options, res => {
            console.log("sending...")
        })

        req.on('error', error => {
            console.error(error)
        })

        req.write(payload)
        req.end()
        console.log("Request Sent")

    } catch (error) {
        console.log(error)
    }
}

var server = net.createServer(function (connection) {
    console.log('client connected');
    connection.resume()

    connection.on('end', function () {
        console.log('client disconnected');
    });

    connection.on('data', function (data) {
        sendInfo(data.toString())
    });
});

server.listen(8081, function () {
    console.log('server is listening');
});