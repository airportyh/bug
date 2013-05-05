// a widget that operates on the passed
// in DOM element


function Widget(elm){
  this.elm = elm
  this.attach()
}

extend(Widget.prototype, DomListener)

extend(Widget.prototype, {
  "elm:onclick": function(){

  },
  destroy: function(){
    this.detach()
  }
})

function extend(dst, src){
  for (var prop in src)
    dst[prop] = src[prop]
}
