/** Dicription: This script contains supporting functions for mountains.html page 
//  Adding table content with data in JSON object. 
// Author : Sudesh Pamidi
*/
"use strict"

$(document).ready(function() {

    let parks;
    const searchDropdown = document.getElementById("search");
    const searchRadio = document.querySelectorAll("input[name=search]");
    const tbody = document.getElementById("tbody");
    const thead = document.getElementById("thead");

    fillDropDown(searchDropdown, locations);
    for (var i = 0; i < searchRadio.length; i++) {
        searchRadio[i].addEventListener("click", pupulateSearch);
    }

    /* begining  of getting JSON file */
    $.getJSON("/data/nationalparks.json", function(data) {
        parks = data.parks
        searchDropdown.onchange = refreshTbodyByLocation;
        //searchDropdown.onchange = refreshTbody;

        /** refresh the tbody with data
         * no parameters         
         */
        function refreshTbody() {
            tbody.innerHTML = "";
            thead.innerHTML = "";
            let searchType = document.querySelector("input[name=search]:checked").value;
            let items
            if (searchType == "location")
                items = getParksInfoByLocation(searchDropdown.value);
            else
                items = getParksInfoByType(searchDropdown.value);

            addToThead(thead);
            addToTbody(tbody, items)
        }

        /** refresh the tbody with data
         * no parameters         
         */
        function refreshTbodyByLocation() {
            tbody.innerHTML = "";
            thead.innerHTML = "";
            let items = getParksInfoByLocation(searchDropdown.value);
            addToThead(thead);
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
                let innerHtml;
                switch (x) {
                    case "Location":
                        innerHtml = e.LocationName;
                        break;
                    case "Address":
                        console.log("'" + e.Address + "'");
                        innerHtml = e.Address.trim() + "<br>" + e.City + "<br>" + e.State + " " + e.ZipCode;
                        break;
                    case "Phone":
                        innerHtml = (e.Phone == "0" ? " " : e.Phone);
                        break;
                    case "Fax":
                        innerHtml = (e.Fax == "0" ? " " : e.Fax);
                        break;

                    case "Visit":

                        innerHtml = (typeof e.Visit === "undefined" ? " " : "<a href='" + e["Visit"] + "' target='_blank'>" + e["Visit"] + "</a>")
                        break;
                    case "Coordinates":
                        innerHtml = "Latitude: " + e.Latitude + "<br>" + "Longitude: " + e.Longitude;
                        break;
                    default:
                        innerHtml = e[x];
                }

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

    function pupulateSearch() {
        let searchType = document.querySelector("input[name=search]:checked").value;
        clearDropDown(searchDropdown);
        if (searchType == "parktype") {
            fillDropDown(searchDropdown, parkTypes);
        } else {
            fillDropDown(searchDropdown, locations);
        }
    };

    //This is to fill the dropDown with the data in array of elements.
    //adding the option dynamically
    function fillDropDown(dropdown, obj) {
        let nextPos = dropdown.options.length;
        obj.forEach(function(e) {
            dropdown.options[nextPos] = new Option(e, e);
            console.log(e);
            nextPos++;
        });
    };

    //This is to fill the dropDown with the data in array of elements.
    //adding the option dynamically
    function clearDropDown() {
        let len = searchDropdown.options.length;
        for (let i = len - 1; i >= 1; i--) {
            searchDropdown.remove(i);
            console.log(i);
        }
    };
});