var DomListener = (function(){

  var EventPropReg = /^([a-zA-Z][$a-zA-Z0-9]+):on([a-z]+)$/

  return {
    attach: function(){
      iterateAndCallFuncOnMatch.call(this, listen)
    },
    detach: function(){
      iterateAndCallFuncOnMatch.call(this, unlisten)
    }
  }

  function iterateAndCallFuncOnMatch(func){
    for (var key in this){
      var m
      if (m = key.match(EventPropReg)){
        var elm = this[m[1]]
        var evt = m[2]
        var value = this[key]
        func.call(this, elm, evt, value)
      }
    }
  }

  function bind(fn, obj){
    return function(){
      return fn.apply(obj, arguments)
    }
  }

  function listen(elm, evt, handler){
    handler._bound = bind(handler, this)
    if (elm.addEventListener){
      elm.addEventListener(evt, handler._bound)
    }else if (elm.attachEvent){
      elm.attachEvent('on' + evt, handler._bound)
    }
  }

  function unlisten(elm, evt, handler){
    if (elm.removeEventListener){
      elm.removeEventListener(evt, handler._bound)
    }else if (elm.attachEvent){
      elm.detachEvent('on' + evt, handler._bound)
    }
    delete handler._bound
  }

}());