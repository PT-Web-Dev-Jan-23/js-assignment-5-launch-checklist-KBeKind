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
    
    //ADDED THIS BELOW AS A TEST
    list.style.visibility = "hidden";
    //TEST ABOVE

    function haltLaunch() {
        launchStatus.style.color = "rgb(199, 37, 78)";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
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
        statusList[2].innerHTML = `Fuel level too low for launch`;
        haltLaunch();
    } else {
        statusList[2].innerHTML = "Fuel level high enough for launch";
    }

    if (cargoLevel > 10000 && inputsValidated) {
        list.style.visibility = "visible";
        statusList[3].innerHTML = `Cargo mass too heavy for launch`;
        haltLaunch();
    } else {
        statusList[3].innerHTML = "Cargo mass low enough for launch";
    }

    if (clearToLaunch && inputsValidated) {
        launchStatus.style.color = "rgb(65, 159, 106)";
        launchStatus.innerHTML = "Shuttle is Ready for Launch";
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