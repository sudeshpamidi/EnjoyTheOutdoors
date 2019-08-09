/** Dicription: This script contains supporting functions for mountains.html page 
//  Adding table content with data in JSON object. 
// Author : Sudesh Pamidi
*/
"use strict"

$(document).ready(function() {

    let parks;
    const parkTypeDropdown = document.getElementById("parkType");
    const locationDropdown = document.getElementById("location");
    const tbody = document.getElementById("tbody");
    const thead = document.getElementById("thead");

    fillDropDown(parkTypeDropdown, parkTypes);
    fillDropDown(locationDropdown, locations);

    /* begining  of getting JSON file */
    $.getJSON("/data/nationalparks.json", function(data) {
        parks = data.parks

        locationDropdown.onchange = refreshTbodyByLocation;
        parkTypeDropdown.onchange = refreshTbody;

        /** refresh the tbody with data
         * no parameters         
         */
        function refreshTbody() {
            tbody.innerHTML = "";
            thead.innerHTML = "";
            let items = getParksInfoByType(parkTypeDropdown.value);
            addToThead(thead); // need refactor
            addToTbody(tbody, items)
        }

        /** refresh the tbody with data
         * no parameters         
         */
        function refreshTbodyByLocation() {
            tbody.innerHTML = "";
            thead.innerHTML = "";
            let items = getParksInfoByLocation(locationDropdown.value);
            addToThead(thead); // need refactor
            addToTbody(tbody, items)
        }

        /** to add the rows and columms of tbody with data
         * @param parkType(text) Mountain Name
         * return the mountains element
         */
        function getParksInfoByType(parkType) {
            let parksInfo = parks.filter(o => o.LocationName.includes(parkType));
            return parksInfo;
        };

        /** to add the rows and columms of tbody with data
         * @param parkType(text) Mountain Name
         * return the mountains element
         */
        function getParksInfoByLocation(location) {
            let parksInfo = parks.filter(o => o.State == location);
            return parksInfo;
        }
    });
    /* end of getting JSON file */

    /** to add the rows and columms of tbody with data
     * @param tbody table body element
     * @param data  array of elements
     */
    function addToTbody(tbody, data) {
        data.forEach(function(e) {
            let tr = tbody.insertRow("tr")
            let i = 0;
            parktheads.forEach(function(x) {
                let cell = tr.insertCell(i);
                let innerHtml = e[x];
                if (x == "Visit")
                    innerHtml = (e[x].trim() == "undefined" ? "" : "<a href='" + e[x] + "' target='_blank'>" + e[x] + "</a>")

                cell.innerHTML = innerHtml;
                i++;
            });
        })
    };
    /** to add the rows and columms of tbody with data
     * @param thead table body element     
     */
    function addToThead(thead) {
        let tr = thead.insertRow(0)
        parktheads.forEach(function(e) {
            let th = document.createElement("th");
            th.innerHTML = e.toUpperCase();
            tr.appendChild(th);
        });
    };

    //This is to fill the dropDown with the data in array of elements.
    //adding the option dynamically
    function fillDropDown(dropdown, obj) {
        let nextPos = dropdown.options.length;
        obj.forEach(function(e) {
            dropdown.options[nextPos] = new Option(e, e);
            nextPos++;
        });
    }
});