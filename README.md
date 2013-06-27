Bug - Listening Device for JS Objects
=====================================

A tiny Javascript library that conviniently handles event binding between objects. It works with the event apis for DOM elements, Node style event emitters api (on/removeListener), and the jQuery/Backbone style on/off api.

## Install with Bower

    bower install bug

## Install with NPM

    npm install bug

## Usage

Here is an example of the usage of bug. Let's say we were to write a widget that operates on a DOM element and wants to handle click events on that element:
  
    function Widget(elm){
      this.elm = elm
      Bug.attach(this) // attach all event handlers 
                       // defined, see below
    }
  
    Widget.prototype = {
      // the following event handler will handle all
      // "click" events to the DOM element in the "elm"
      // property
      "elm:click": function(e){
        console.log('elm was clicked!')
      },
      destroy: function(){
        Bug.detach(this) // detaches all event handlers in the
                         // specified format
      }
    }

## API

Bug has 2 methods: 

  * `attach()` - attachs all event handlers specified (see below) and 
  * `detach()` - detaches all of them.

The event handlers in your object are specified by naming the property in the format `<property>:<event>`. For example, the following event handler will attach to the `click` event of the object stored in the `elm` property of the object.

    "button:click": function(e){
      console.log('You click me! You really click me!')
    }

The `button` property can have the value of one of three kinds of objects

1. a raw DOM element
2. an object with an `on(event, callback)` method and an `off(event, callback)` method, as is the case with jQuery wrapped objects and Backbone models
3. an object with an `on(event, callback)` method and a `removeListener(event, callback)` method, as is the case with Node event emitters

Browser Support
---------------

Tested on IE 7.0+ and Chrome, should work on all modern browsers.