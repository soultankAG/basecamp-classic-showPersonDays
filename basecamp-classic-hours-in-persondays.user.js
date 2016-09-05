// ==UserScript==
// @name        Basecamp Classic hours in person days
// @namespace   soultank.ch
// @include     https://*.basecamphq.com/*
// @version     1
// @grant       none
// ==/UserScript==

//configuration: how many hours does a person day have?
var hoursInPersonDay = 8;



var hoursWorkedCell = document.getElementById('hours_subtotal')
var hoursWorkedString = hoursWorkedCell.innerHTML.replace(',', '.');
console.log("hoursWorkedString: "+ hoursWorkedString);
var hoursWorked = parseFloat(hoursWorkedString);

console.log("hoursworked: "+ hoursWorked);

var daysWorked = hoursWorked / hoursInPersonDay;

console.log("daysWorked: "+ daysWorked);

var daysWorkedTwoDecimals = daysWorked.toFixed(2);

console.log("daysWorkedTwoDecimals: "+ daysWorkedTwoDecimals);

var daysWorkedCell = document.createElement('td');

var textDaysTotal = daysWorkedTwoDecimals.toString() +  " (Tage)";

console.log("textDaysTotal: " + textDaysTotal);

daysWorkedCell.innerHTML = textDaysTotal;

daysWorkedCell.setAttribute("class","hours");

var nextSiblingOfHoursWorkedCell = hoursWorkedCell.nextSibling;

hoursWorkedCell.parentNode.insertBefore(daysWorkedCell, nextSiblingOfHoursWorkedCell);

