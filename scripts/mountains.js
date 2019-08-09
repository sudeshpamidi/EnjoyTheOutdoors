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

    $.getJSON("./data/mountains.json", function(data) {
        mountains = data.mountains


        // console.log(mountains);

        fillDropDown(mountainDropdown, mountains);

        mountainDropdown.onchange = refreshTbody;


        //first time by default
        let items = getMountainInfo(mountainDropdown.value);

        //addToThead(thead, items);
        //addToTbody(tbody, items);

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
         * @param thead table body element
         * @param data  array of elements
         */
        function addToThead(thead, data) {

            let tr = thead.insertRow(0)
            Object.keys(data[0]).forEach(function(k, i) {
                let th = document.createElement("th");
                th.innerHTML = k.toUpperCase(); //data[0][k];
                tr.appendChild(th);
            });

        };

        /** to add the rows and columms of tbody with data
         * @param tbody table body element
         * @param data  array of elements
         */
        function displayInTable(table, data) {

            Object.keys(data[0]).forEach(function(k, i) {
                let tr = table.insertRow(i)
                let cell = tr.insertCell(0);
                let cellLable;
                let cellInnerHTML;

                switch (k) {
                    case "img":
                        cellLable = "IMAGE: ";
                        cellInnerHTML = "<img src= 'images/" + data[0][k] + "' >"
                        break;
                    case "coords":
                        cellLable = "Coordinates: ";
                        cellInnerHTML = "Lattitude : " + data[0][k].lat + ", Longitude: " + data[0][k].lng;
                        break;
                    default:
                        cellLable = k.toUpperCase() + ": ";
                        cellInnerHTML = data[0][k];
                };

                cell.innerHTML = cellLable;
                tr.appendChild(cell);
                cell = tr.insertCell(1);
                cell.innerHTML = cellInnerHTML;

                tr.appendChild(cell);
            });
        };


        /** to add the rows and columms of tbody with data
         * @param tbody table body element
         * @param data  array of elements
         */
        function addToTbody(tbody, data) {
            data.forEach(function(e) {
                let tr = tbody.insertRow("tr")
                Object.keys(e).forEach(function(k, i) {
                    let cell = tr.insertCell(i);
                    cell.innerHTML = e[k];
                });
            })
        };

        function refreshTbody() {
            //tbody.innerHTML = "";
            tMountain.innerHTML = "";
            items = getMountainInfo(mountainDropdown.value);
            //addToTbody(tbody, items)
            displayInTable(tMountain, items);
        }


        /** To fetch the sunrise and sunset information 
         * based on given lattitude and longitude
         * @param lat
         * @param lng
         * return the sunrise and sunset information 
         */
        function getSunriseSunset(lat, lng) {
            let url = "http://https//api.sunrise-sunset.org/json?lat=44.270403&lng=-71.303501";
            // $.getJSON("./data/mountains.json", function(data) {

            // };

        };

        /** to add the rows and columms of tbody with data
         * @param mountainName(text) Mountain Name
         * return the mountains element
         */
        function getMountainInfo(mountainName) {
            let mountain = mountains.filter(o => o.name == mountainName);
            return mountain;
        };


    })
});