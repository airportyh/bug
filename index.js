(function(){

  var EventPropReg = /^([a-zA-Z][$a-zA-Z0-9]+):on([a-z]+)$/

  var Bug = {
    attach: function(){
      iterateAndCallFuncOnMatch.call(this, listen)
    },
    detach: function(){
      iterateAndCallFuncOnMatch.call(this, unlisten)
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
    if (handler._bound) return
    handler._bound = bind(handler, this)
    if (elm.addEventListener){
      elm.addEventListener(evt, handler._bound)
    }else if (elm.attachEvent){
      elm.attachEvent('on' + evt, handler._bound)
    }else if (elm.on && elm.removeListener){
      elm.on(evt, handler._bound)
    }
  }

  function unlisten(elm, evt, handler){
    if (elm.removeEventListener){
      elm.removeEventListener(evt, handler._bound)
    }else if (elm.attachEvent){
      elm.detachEvent('on' + evt, handler._bound)
    }else if (elm.on && elm.removeListener){
      elm.removeListener(evt, handler._bound)
    }
    delete handler._bound
  }

}());