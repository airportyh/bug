Bug
===========

A Javascript mixin that conviniently handles binding to a DOM element for a widget class that you might write.

When you mixin `Bug` to your own Javascript object, like so

    extend(MyWidget.prototype, Bug)

You get two extra methods: 

  * `attach()` - which attachs all event handlers specified (see below) and 
  * `detach()` - which detaches all of them.

The event handlers in your object are specified by naming the property in the format `<property>:on<event>`. For example, the following event handler will attach to the `click` event of the element stored in the `elm` property of the object.

    "elm:onclick": function(e){
    }

Install with Bower
------------------

    bower install bug

Install with NPM
----------------

    npm install bug

Full Example
------------
  
    function Widget(elm){
      this.elm = elm
      this.attach() // attach all event handlers in the
                    // specified format
    }
  
    extend(Widget.prototype, Bug)
  
    extend(Widget.prototype, {
      // the following event handler will handle all
      // "click" events to the DOM element in the "elm"
      // property
      "elm:onclick": function(e){
        console.log('elm was clicked!')
      },
      destroy: function(){
        this.detach() // detaches all event handlers in the
                      // specified format
      }
    })
  
    // a simple extend which behaves like underscore's extend
    function extend(dst, src){
      for (var prop in src)
        dst[prop] = src[prop]
    }

On Event Emitters
-----------------

Bug also can listen to event emitters. This is an example in node

    var Bug = require('bug')
    var EventEmitter = require('events').EventEmitter

    var bar = new EventEmitter
    var foo = {
      "bar:onmessage": function(msg){
        console.log("Got message", msg)
      },
      bar: bar
    }
    extend(obj, Bug)
    obj.attach()
    bar.emit('message', 'Hello!')

Browser Support
---------------

Tested on IE 7.0+ and Chrome, should work on all modern browsers.