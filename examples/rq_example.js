require(['../index'], function(DOMListener){
  
  function Widget(elm){
    this.elm = elm
  }

  extend(Widget.prototype, DOMListener)

  extend(Widget.prototype, {
    "elm:onclick": function(e){
      e.preventDefault()
      console.log('You clicked')
    }
  })

  function extend(dst, src){
    for (var key in src){
      dst[key] = src[key]
    }
  }

  var widget = new Widget(document.getElementById('link'))
  widget.attach()
  
})