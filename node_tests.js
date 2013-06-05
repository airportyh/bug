var test = require('tape')
var DOMListener = require('./index')
var EventEmitter = require('events').EventEmitter

test('it also binds event emitters', function(t){
  t.plan(1)
  var foo = {}
  var bar = foo.bar = {}
  extend(bar, EventEmitter.prototype)
  extend(foo, DOMListener)
  foo['bar:onmessage'] = function(msg){
    t.equal(msg, 'hello')
  }
  foo.attach()
  bar.emit('message', 'hello')
  foo.detach()
  bar.emit('message', 'hello')
})

function extend(dst, src){
  for (var prop in src)
    dst[prop] = src[prop]
}