var test = require('tape')
var Bug = require('./index')
var EventEmitter = require('events').EventEmitter

test('it also binds event emitters', function(t){
  t.plan(1)
  var foo = {}
  var bar = foo.bar = {}
  extend(bar, EventEmitter.prototype)
  foo['bar:message'] = function(msg){
    t.equal(msg, 'hello')
  }
  Bug.attach(foo)
  bar.emit('message', 'hello')
  Bug.detach(foo)
  bar.emit('message', 'hello')
})

function extend(dst, src){
  for (var prop in src)
    dst[prop] = src[prop]
}