(function(){

  var EventPropReg = /^([a-zA-Z][$a-zA-Z0-9]+):([a-z]+)$/

  var Bug = {
    attach: function(obj){
      iterateAndCallFuncOnMatch.call(obj, listen)
    },
    detach: function(obj){
      iterateAndCallFuncOnMatch.call(obj, unlisten)
    }
  }

  // Shims for CommonJS, Require.js, and just the browser
  if (typeof module !== 'undefined' && module.exports){
    module.exports = Bug
  }else if (typeof define !== 'undefined' && define.amd){
    define(function(){ return Bug })
  }else if (typeof window !== 'undefined'){
    window.Bug = Bug
  }

  function iterateAndCallFuncOnMatch(func){
    for (var key in this){
      var m
      if (m = key.match(EventPropReg)){
        var obj = this[m[1]]
        var evt = m[2]
        var value = this[key]
        func.call(this, obj, evt, value)
      }
    }
  }

  function bind(fn, obj){
    return function(){
      return fn.apply(obj, arguments)
    }
  }

  function listen(obj, evt, handler){
    if (handler._bound) return
    if (!obj) return
    handler._bound = bind(handler, this)
    if (obj.addEventListener){
      obj.addEventListener(evt, handler._bound)
    }else if (obj.attachEvent){
      obj.attachEvent('on' + evt, handler._bound)
    }else if (obj.on && obj.off){
      obj.on(evt, handler._bound)
    }else if (obj.on && obj.removeListener){
      obj.on(evt, handler._bound)
    }
  }

  function unlisten(obj, evt, handler){
    if (!handler._bound) return
    if (obj.removeEventListener){
      obj.removeEventListener(evt, handler._bound)
    }else if (obj.attachEvent){
      obj.detachEvent('on' + evt, handler._bound)
    }else if (obj.on && obj.off){
      obj.off(evt, handler._bound)
    }else if (obj.on && obj.removeListener){
      obj.removeListener(evt, handler._bound)
    }
    delete handler._bound
  }

}());