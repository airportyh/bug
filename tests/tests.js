
test('when attached listens to specified dom event', function(){
  var called = false
  var elm = document.createElement('div')
  document.body.appendChild(elm)
  var o = {
    elm: elm,
    "elm:click": function(e){
      equal(e.type, 'click')
      called = true
    }
  }
  Bug.attach(o)
  Simulate.click(elm)
  ok(called, "how come you don't call?")
  document.body.removeChild(elm)
})

test('when detached no longer listens', function(){
  var called = false
  var elm = document.createElement('div')
  document.body.appendChild(elm)
  var o = {
    elm: elm,
    "elm:click": function(e){
      called = true
    }
  }
  
  Bug.attach(o)
  Bug.detach(o)
  Simulate.click(elm)
  ok(!called, "don't call anymore")

  // cleans up
  ok(undefined === o['elm:click']._bound)
  document.body.removeChild(elm)
})

test('it doesnt bound twice if attached twice', function(){
  var callCount = 0
  var elm = document.createElement('div')
  document.body.appendChild(elm)
  var o = {
    elm: elm,
    "elm:click": function(e){
      callCount++
    }
  }
  Bug.attach(o)
  Bug.attach(o)
  Simulate.click(elm)
  equal(callCount, 1)
  document.body.removeChild(elm)
})

test('it also binds event emitters', function(){
  expect(1)
  var foo = {}
  var bar = foo.bar = {}
  extend(bar, EventEmitter.prototype)
  foo['bar:message'] = function(msg){
    equal(msg, 'hello')
  }
  Bug.attach(foo)
  bar.emit('message', 'hello')
  Bug.detach(foo)
  bar.emit('message', 'hello')
})

test('supports on/off api', function(){
  var called = false
  var model = new Backbone.Model
  var foo = {model: model}
  foo['model:blah'] = function(){
    called = true
  }
  Bug.attach(foo)
  model.trigger('blah')
  ok(called)
})

test('it doesnt bomb if the the property is null', function(){
  var foo = {}
  foo['bar:message'] = function(){}
  Bug.attach(foo)
  ok(true)
})

test('reattachs to different target', function(){
  var called = false
  var e1 = new EventEmitter
  var e2 = new EventEmitter
  var foo = {}
  foo.bar = e1
  foo['bar:data'] = function(){
    called = true
  }
  Bug.attach(foo)
  foo.bar = e2
  Bug.attach(foo)
  e2.emit('data')
  ok(called)
})

function extend(dst, src){
  for (var prop in src)
    dst[prop] = src[prop]
}