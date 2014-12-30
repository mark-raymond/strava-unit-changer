// ==UserScript==
// @name        Strava Unit Changer
// @namespace   https://github.com/mark-raymond
// @description Changes the units in Strava
// @include     http://www.strava.com/*
// @include     https://www.strava.com/*
// @version     1
// @grant       none
// ==/UserScript==

var shortDistanceUnit = 'm' // 'm' for metres, 'ft' for feet
var longDistanceUnit = 'mi' // 'mi' for miles, 'km' for kilometres

function convertUnit(element, factor, newUnit, decimalPlaces)
{
  var textNode = element.childNodes[0]
  var oldValue = parseFloat(textNode.textContent.replace(',',''))
  var newValue = oldValue * factor
  textNode.textContent = newValue.toFixed(decimalPlaces || 0)
  var unitNode = element.getElementsByClassName('unit')[0]
  unitNode.textContent = newUnit
}

var measures = document.getElementsByClassName('unit')
for (var i in measures) {
  var measure = measures[i]
  var oldUnit = measure.textContent
  var element = measure.parentNode
  switch (oldUnit) {
    case 'mi':
      if (longDistanceUnit === 'km')
        convertUnit(element, 1.6093, 'km', 1)
      break
    case 'km':
      if (longDistanceUnit === 'mi')
        convertUnit(element, 1 / 1.6093, 'mi', 1)
      break
    case 'mi/h':
      if (longDistanceUnit === 'km')
        convertUnit(element, 1.6093, 'km/h', 1)
      break
    case 'km/h':
      if (longDistanceUnit === 'mi')
        convertUnit(element, 1 / 1.6093, 'mi/h', 1)
      break
    case 'ft':
      if (shortDistanceUnit === 'm')
        convertUnit(element, 0.3048, 'm')
      break
    case 'm':
      if (shortDistanceUnit === 'ft')
        convertUnit(element, 1 / 0.3048, 'ft')
      break
    case 'W':
    case 'kJ':
    case null:
    case undefined:
      // Nothing to do
      break
    default:
      console.log('Unknown unit "' + measure.textContent + '"')
  }
}
