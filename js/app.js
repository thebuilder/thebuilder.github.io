(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var basicModule= require("./modules/basicModule");
var ClassModule= require("./modules/classModule");

var instance = new ClassModule();

},{"./modules/basicModule":2,"./modules/classModule":3}],2:[function(require,module,exports){
/**
 * @module basicModule
 * This module creates a static module with public properties.
 * var module = require("./basicModule")
 */
module.exports = {
    init: function() {
        var value = privateMethod();
        return value;
    },
    dispose: function() {},
    //Just a var
    name: "Hello World"
};

function privateMethod() {
    return "Hello from private";
}
},{}],3:[function(require,module,exports){
/**
 * @module classModule
 * This module creates a new class instance, and must be instantiated with "new".
 * The reason this must be instantiated is that the exports is a function.
 * var module = new classModule();
 */

module.exports = function() {
    //You can create functions, vars and whatever you want here.
    var object = {
        name:"New class"
    };

    return object;
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJFOlxcV2ViU3Rvcm1cXHRoZWJ1aWxkZXIuZ2l0aHViLmlvXFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkU6L1dlYlN0b3JtL3RoZWJ1aWxkZXIuZ2l0aHViLmlvL3NyYy9qcy9hcHAuanMiLCJFOi9XZWJTdG9ybS90aGVidWlsZGVyLmdpdGh1Yi5pby9zcmMvanMvbW9kdWxlcy9iYXNpY01vZHVsZS5qcyIsIkU6L1dlYlN0b3JtL3RoZWJ1aWxkZXIuZ2l0aHViLmlvL3NyYy9qcy9tb2R1bGVzL2NsYXNzTW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgYmFzaWNNb2R1bGU9IHJlcXVpcmUoXCIuL21vZHVsZXMvYmFzaWNNb2R1bGVcIik7XG52YXIgQ2xhc3NNb2R1bGU9IHJlcXVpcmUoXCIuL21vZHVsZXMvY2xhc3NNb2R1bGVcIik7XG5cbnZhciBpbnN0YW5jZSA9IG5ldyBDbGFzc01vZHVsZSgpO1xuIiwiLyoqXG4gKiBAbW9kdWxlIGJhc2ljTW9kdWxlXG4gKiBUaGlzIG1vZHVsZSBjcmVhdGVzIGEgc3RhdGljIG1vZHVsZSB3aXRoIHB1YmxpYyBwcm9wZXJ0aWVzLlxuICogdmFyIG1vZHVsZSA9IHJlcXVpcmUoXCIuL2Jhc2ljTW9kdWxlXCIpXG4gKi9cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBwcml2YXRlTWV0aG9kKCk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIGRpc3Bvc2U6IGZ1bmN0aW9uKCkge30sXG4gICAgLy9KdXN0IGEgdmFyXG4gICAgbmFtZTogXCJIZWxsbyBXb3JsZFwiXG59O1xuXG5mdW5jdGlvbiBwcml2YXRlTWV0aG9kKCkge1xuICAgIHJldHVybiBcIkhlbGxvIGZyb20gcHJpdmF0ZVwiO1xufSIsIi8qKlxuICogQG1vZHVsZSBjbGFzc01vZHVsZVxuICogVGhpcyBtb2R1bGUgY3JlYXRlcyBhIG5ldyBjbGFzcyBpbnN0YW5jZSwgYW5kIG11c3QgYmUgaW5zdGFudGlhdGVkIHdpdGggXCJuZXdcIi5cbiAqIFRoZSByZWFzb24gdGhpcyBtdXN0IGJlIGluc3RhbnRpYXRlZCBpcyB0aGF0IHRoZSBleHBvcnRzIGlzIGEgZnVuY3Rpb24uXG4gKiB2YXIgbW9kdWxlID0gbmV3IGNsYXNzTW9kdWxlKCk7XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAvL1lvdSBjYW4gY3JlYXRlIGZ1bmN0aW9ucywgdmFycyBhbmQgd2hhdGV2ZXIgeW91IHdhbnQgaGVyZS5cbiAgICB2YXIgb2JqZWN0ID0ge1xuICAgICAgICBuYW1lOlwiTmV3IGNsYXNzXCJcbiAgICB9O1xuXG4gICAgcmV0dXJuIG9iamVjdDtcbn07XG4iXX0=
