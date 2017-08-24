// ==UserScript==
// @name        Basecamp Classic hours in person days
// @namespace   soultank.ch
// @include     https://*.basecamphq.com/*
// @version     1
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant       GM_log
// ==/UserScript==


console.log("test");

//Diese Funktion zeigt neben den Stunden die Zeit in Tagen an
//https://stackoverflow.com/questions/8281441/fire-greasemonkey-script-on-ajax-request/8283815#8283815
function calculatePersonDaysForCurrentTodo (jNode) {

    //***** Hier wird dann aus den Stunden Tage berechnet *****
    var hoursInPersonDay = 8;
    var targetDiv = document.getElementsByClassName("total").item(0);
    var taskHours = targetDiv.firstElementChild.innerHTML;
    var hoursString = taskHours.replace(',', '.');
    var hoursWorked = parseFloat(hoursString);
    var daysWorked = hoursString / hoursInPersonDay;
    var daysWorkedTwoDecimals = daysWorked.toFixed(2);
    var textDaysTotal = ("(" + daysWorkedTwoDecimals.toString() + " Tage)");
    var daysWorkedText = document.createElement("A");
    var textnode = document.createTextNode(textDaysTotal);
    daysWorkedText.appendChild(textnode);
    targetDiv.insertBefore(textnode, targetDiv.childNodes[3]);
    //
}

//Diese Funktion wartet darauf, dass ein div mit class "item_time_tracker" erscheint und ruft dann calculatePersonDaysForCurrentTodo auf
waitForKeyElements ("div.item_time_tracker", calculatePersonDaysForCurrentTodo);


//configuration: how many hours does a person day have?
var hoursInPersonDay = 8;


var hoursWorkedCell = document.getElementById('hours_subtotal');
console.log("hoursWorkedCell="+ hoursWorkedCell.innerHTML);
var hoursWorkedString = hoursWorkedCell.innerHTML.replace(',', '.');
console.log("hoursWorkedString: "+ hoursWorkedString);
var hoursWorked = parseFloat(hoursWorkedString);

console.log("hoursworked: "+ hoursWorked);

var daysWorked = hoursWorked / hoursInPersonDay;

console.log("daysWorked: "+ daysWorked);

var daysWorkedTwoDecimals = daysWorked.toFixed(2);

console.log("daysWorkedTwoDecimals: "+ daysWorkedTwoDecimals);

var daysWorkedCell = document.createElement('td');

var textDaysTotal = "(" + daysWorkedTwoDecimals.toString() +  " Tage)";

console.log("textDaysTotal: " + textDaysTotal);

daysWorkedCell.innerHTML = textDaysTotal;

daysWorkedCell.setAttribute("class","hours");

var nextSiblingOfHoursWorkedCell = hoursWorkedCell.nextSibling;

hoursWorkedCell.parentNode.insertBefore(daysWorkedCell, nextSiblingOfHoursWorkedCell);
