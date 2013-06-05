
test('when attached listens to specified dom event', function(){
  var called = false
  var elm = document.createElement('div')
  document.body.appendChild(elm)
  var o = {
    elm: elm,
    "elm:onclick": function(e){
      equal(e.type, 'click')
      called = true
    }
  }
  extend(o, Bug)
  o.attach()
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
    "elm:onclick": function(e){
      called = true
    }
  }
  extend(o, Bug)
  o.attach()
  o.detach()
  Simulate.click(elm)
  ok(!called, "don't call anymore")

  // cleans up
  ok(undefined === o['elm:onclick']._bound)
  document.body.removeChild(elm)
})

test('it doesnt bound twice if attached twice', function(){
  var callCount = 0
  var elm = document.createElement('div')
  document.body.appendChild(elm)
  var o = {
    elm: elm,
    "elm:onclick": function(e){
      callCount++
    }
  }
  extend(o, Bug)
  o.attach()
  o.attach()
  Simulate.click(elm)
  equal(callCount, 1)
  document.body.removeChild(elm)
})

test('it also binds event emitters', function(){
  expect(1)
  var foo = {}
  var bar = foo.bar = {}
  extend(bar, EventEmitter.prototype)
  extend(foo, Bug)
  foo['bar:onmessage'] = function(msg){
    equal(msg, 'hello')
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