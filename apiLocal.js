"use strict";

// Expose the OpenRCT2 to Visual Studio Code's Intellisense
/// <reference path="/Users/noahbechtel/Library/Application Support/OpenRCT2/openrct2.d.ts" />
// Import a module from another file.


var socket = void 0;

function connect() {
    socket = network.createSocket();
    socket.connect(8081, "127.0.0.1", function () {
        console.log("socket connected");
    });
}
function main() {
    try {

        connect();
        socket.on("close", function () {
            connect();
        });
        socket.on("error", function () {

            connect();
        });
        context.subscribe('interval.day', function () {

            var rideList = map.rides.map(function (ride) {
                var price = ride.price,
                    classification = ride.classification,
                    name = ride.name,
                    intensity = ride.intensity,
                    mode = ride.mode,
                    excitement = ride.excitement,
                    status = ride.status,
                    value = ride.value,
                    type = ride.type,
                    totalProfit = ride.totalProfit,
                    totalCustomers = ride.totalCustomers;
                var _ride$object = ride.object,
                    description = _ride$object.description,
                    capacity = _ride$object.capacity;

                var parsedRide = { price: price, name: name, classification: classification, intensity: intensity, mode: mode, excitement: excitement, status: status, value: value, type: type, totalProfit: totalProfit, totalCustomers: totalCustomers, description: description, capacity: capacity };
                return parsedRide;
            });
            socket.write(JSON.stringify({
                rating: park.rating,
                cash: park.cash,
                value: park.value,
                admissions: park.totalAdmissions,
                parkMax: park.suggestedGuestMaximum,
                currentGuests: park.guests,
                playersOnline: network.numPlayers,
                rides: rideList,
                gameDay: date.day,
                gameMonth: date.month,
                gameYear: date.year,
                name: park.name
            }));
            console.log("info sent");
        });
    } catch (error) {
        console.log(error);
    }
}

registerPlugin({
    name: "API Support",
    version: "0.1",
    licence: "MIT", // Make sure to set the license prior to release
    authors: ["Noah Bechtel"],
    type: "local",
    main: main
});
