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

//configuration: how many hours does a person day have?
var hoursInPersonDay = 8;

//----START Für Tab "Aufgaben"
//Dieser Bereich zeigt im neben den Stunden die Zeit in Tagen an

function calculatePersonDaysForCurrentTodo (jNode) {

    //***** Hier wird dann aus den Stunden, Tage berechnet *****
        
    var targetDiv = jNode[0].childNodes[3].childNodes[3];
    var targetNode = targetDiv.childNodes[0];
    var taskHours = jNode[0].childNodes[3].childNodes[1].innerText;
    var hoursString = taskHours.replace(',', '.');
    var hoursWorked = parseFloat(hoursString);
    var daysWorked = hoursWorked / hoursInPersonDay;
    var daysWorkedTwoDecimals = daysWorked.toFixed(2);
    var textDaysTotal = ("(" + daysWorkedTwoDecimals.toString() + " Tage)");
    var daysWorkedText = document.createElement("A");
    var textnode = document.createTextNode(textDaysTotal);
    daysWorkedText.appendChild(textnode);
    targetDiv.insertBefore(textnode, targetNode);
  }

//Diese Funktion wartet darauf, dass ein div mit class "item_time_tracker" erscheint und ruft dann calculatePersonDaysForCurrentTodo auf
//Hier die Idee und Dokumentation zum waitForKeyElements: https://stackoverflow.com/questions/8281441/fire-greasemonkey-script-on-ajax-request/8283815#8283815
waitForKeyElements ("div.item_time_tracker", calculatePersonDaysForCurrentTodo);

//----ENDE Für Tab "Aufgaben"


//----START Für Tab "Zeit"
//----Dieser Bereich zeigt beim Total unten neben den Stunden die Zeit in Tagen an
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

//----ENDE Für Tab "Zeit"
