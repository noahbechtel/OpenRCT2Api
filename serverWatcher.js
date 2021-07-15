const net = require('net')
const https = require('https');
const { symlinkSync } = require('fs');
const { exit } = require('process');
let apiToken
let public = true
let args = process.argv.slice(2)
console.log(args);

args.map((e, i) => {
    if (e == "-apiToken") apiToken = args[i + 1]
    if (e == "-p") public = false
})

if (!apiToken || apiToken.length > 22) {
    console.log("Invalid Api Token, please generate one from https://openRCT2API.com/setup and add -apiToken <YourApiToken> to your command ")
    exit()
}

switch (process.argv[2]) {
    case "-help":
        console.log("-apiToken <YourApiToken> : REQUIRED - Unique identifier for your server, distributed by https://openRCT2API.com/setup")
        console.log("-p : OPTIONAL - sets the park listing to private, it will not show up in the live data section of https://openRCT2API.com")

        break;
    case "-apiToken":
        apiToken = process.argv[3]
        break;
    default:
        console.log("Use -apiToken <YourApiToken> or -help for more info")
        break;
}

const sendInfo = async (payload) => {
    try {
        payload = JSON.parse(payload)
        payload.apiToken = apiToken
        payload.public = public
        console.log(payload)
        payload = JSON.stringify(payload)
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
