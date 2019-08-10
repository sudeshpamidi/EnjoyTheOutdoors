/** Dicription: This script contains supporting functions for mountains.html page 
//  Adding table content with data in JSON object. 
// Author : Sudesh Pamidi
*/
"use strict"
$(document).ready(function() {
    let mountains
    const mountainDropdown = document.getElementById("mountain");
    const tbody = document.getElementById("tbody");
    const thead = document.getElementById("thead");
    const tMountain = document.getElementById("tableMountain");

    /***** Begining of getJSON******/
    $.getJSON("./data/mountains.json", function(data) {
        mountains = data.mountains
        fillDropDown(mountainDropdown, mountains);
        mountainDropdown.onchange = refreshTbody;

        //first time by default
        let items = getMountainInfo(mountainDropdown.value);
        displayInTable(tMountain, items);

        //This is to fill the dropDown with the data in array of elements.
        function fillDropDown(dropdown, obj) {
            //adding the option dynamically
            let nextPos = dropdown.options.length;
            obj.forEach(function(e) {
                dropdown.options[nextPos] = new Option(e["name"], e["name"]);
                nextPos++;
            });
        }

        /** to add the rows and columms of tbody with data
         * @param mountainName(text) Mountain Name
         * return the mountains element
         */
        function getMountainInfo(mountainName) {
            let mountain = mountains.filter(o => o.name == mountainName);
            return mountain;
        };

        function refreshTbody() {
            //tbody.innerHTML = "";
            tMountain.innerHTML = "";
            items = getMountainInfo(mountainDropdown.value);
            //addToTbody(tbody, items)
            displayInTable(tMountain, items);
        }

    });
    /***** End of getJSON******/

    /** to add the rows and columms of tbody with data
     * @param tbody table body element
     * @param data  array of elements
     */
    function displayInTable(table, data) {
        let i = 0;
        mountainLabels.forEach(function(k) {
            //Object.keys(data[0]).forEach(function(k, i) {
            let label, text;
            label = k + ": ";
            switch (k) {
                case "Name":
                    text = data[0].name; // data[0][k];
                    break;
                case "Elevation":
                    text = data[0].elevation; // data[0][k];
                    break;
                case "Effort":
                    text = data[0].effort; // data[0][k];
                    break;
                case "Image":
                    text = "<img src= 'images/" + data[0].img + "' >"
                    break;
                case "Coordinates":
                    text = "Lattitude : " + data[0].coords.lat + ", Longitude: " + data[0].coords.lng;
                    break;
                case "Description":
                    text = data[0].desc; //data[0][k];
                    break;
            };
            addRow(table, i, label, text)
            i++;
        });
        getSunriseSunset(data[0].coords.lat, data[0].coords.lng, table, i);
    };

    /**
     * adding row with col values
     * @param {*} table 
     * @param {*} i 
     * @param {*} lable 
     * @param {*} text 
     */
    function addRow(table, i, lable, text) {
        let tr = table.insertRow(i)
        let cell = tr.insertCell(0);

        cell.innerHTML = lable;
        tr.appendChild(cell);
        cell = tr.insertCell(1);
        cell.innerHTML = text;
        tr.appendChild(cell);
    };
    /** To fetch the sunrise and sunset information 
     * based on given lattitude and longitude
     * @param {*} lat 
     * @param {*} lng 
     * @param {*} sunRiseSet 
     */
    function getSunriseSunset(lat, lng, table, childrow) {
        let url = "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng + "&date=today";
        $.getJSON(url, function(data) {
            let sunRiseSet = data.results;
            console.log(sunRiseSet.sunrise);
            addRow(table, childrow, "Sunrise/Sunset", sunRiseSet.sunrise + "/" + sunRiseSet.sunset);
        });

    };
});