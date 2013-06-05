;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
var DOMListener = require('../index')

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
},{"../index":2}],2:[function(require,module,exports){
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
},{}]},{},[1])
;