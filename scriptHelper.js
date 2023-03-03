// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    const missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${imageUrl}">
                 `;

}

function validateInput(testInput = "") {
    if (testInput === "") {
        return "Empty";
    }
    if (isNaN(testInput)) {
        return "Not a Number";
    }
    return "Is a Number";
}



function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    function haltLaunch() {
        launchStatus.style.color = "red";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        clearToLaunch = false;
    }

    let clearToLaunch = true;
    const statusList = list.querySelectorAll('li');
    const launchStatus = document.getElementById("launchStatus");
    let inputsValidated = false;

    if (validateInput(pilot) !== "Not a Number") {
        pilot = alert("Please enter a TEXT name for the PILOT.");
    }
    else if (validateInput(copilot) !== "Not a Number") {
        copilot = alert("Please enter a TEXT name for the CO-PILOT.");
    }
    else if (validateInput(fuelLevel) !== "Is a Number") {
        fuelLevel = alert("Please enter a NUMBER for FUEL LEVEL.");
    }
    else if (validateInput(cargoLevel) !== "Is a Number") {
        cargoLevel = alert("Please enter a NUMBER for CARGO MASS.");

    } else {
        inputsValidated = true;
    }

    if (inputsValidated) {
        statusList[0].innerHTML = `Pilot ${pilot} is ready for launch`;
        statusList[1].innerHTML = `Co-pilot ${copilot} is ready for launch`;
    }

    if (fuelLevel < 10000 && inputsValidated) {
        list.style.visibility = "visible";
        statusList[2].innerHTML = `NOT ENOUGH FUEL! We have ${fuelLevel} liters and we need at least 10,000 liters.`;
        haltLaunch();
    } else {
        statusList[2].innerHTML = "Fuel level high enough for launch";
    }

    if (cargoLevel > 10000 && inputsValidated) {
        list.style.visibility = "visible";
        statusList[3].innerHTML = `TOO MUCH MASS FOR TAKEOFF! We need 10,000 kilograms or less.`;
        haltLaunch();
    } else {
        statusList[3].innerHTML = "Cargo mass low enough for launch";
    }

    if (clearToLaunch && inputsValidated) {
        launchStatus.style.color = "green";
        launchStatus.innerHTML = "Shuttle is ready for launch";
        list.style.visibility = "hidden";
    }

}

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json().then(function (json) {
            return json;
        });
    });
    return planetsReturned;
}

function pickPlanet(planets) {
    let planetIndex = Math.floor(Math.random() * planets.length);
    return planets[planetIndex];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;