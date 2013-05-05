DomListener
===========

A Javascript mixin that conviniently handles binding to a DOM element for a widget class that you might write.

When you mixin the DomListener to your own Javascript object, like so

    extend(MyWidget.prototype, DomListener)

You get two extra methods: 

  * `attach()` - which attachs all event handlers specified (see below) and 
  * `detach()` - which detaches all of them.

The event handlers in your object are specified by naming the property in the format `<property>:on<event>`. For example, the following event handler will attach to the `click` event of the element stored in the `elm` property of the object.

    "elm:onclick": function(e){
    }

Full Example
------------
  
    function Widget(elm){
      this.elm = elm
      this.attach() // attach all event handlers in the
                    // specified format
    }
  
    extend(Widget.prototype, DomListener)
  
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

Browser Support
---------------

Tested on IE 7.0+ and Chrome, should work on all modern browsers.