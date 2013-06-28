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
    var fun = function(){
      return fn.apply(obj, arguments)
    }
    return {
      context: obj,
      fun: fun
    }
  }

  function listen(obj, evt, handler){
    if (handler._bound){
      if (obj === handler._bound.context) return
      unlisten(obj, evt, handler)
    }
    if (!obj) return
    handler._bound = bind(handler, this)
    var fun = handler._bound.fun
    if (obj.addEventListener){
      obj.addEventListener(evt, fun)
    }else if (obj.attachEvent){
      obj.attachEvent('on' + evt, fun)
    }else if (obj.on && obj.off){
      obj.on(evt, fun)
    }else if (obj.on && obj.removeListener){
      obj.on(evt, fun)
    }
  }

  function unlisten(obj, evt, handler){
    if (!handler._bound) return
    var fun = handler._bound.fun
    if (obj.removeEventListener){
      obj.removeEventListener(evt, fun)
    }else if (obj.attachEvent){
      obj.detachEvent('on' + evt, fun)
    }else if (obj.on && obj.off){
      obj.off(evt, fun)
    }else if (obj.on && obj.removeListener){
      obj.removeListener(evt, fun)
    }
    delete handler._bound
  }

}());