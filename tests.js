test('it mixes into object', function(){
  var o = {}
  extend(o, DomListener)
})

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
  extend(o, DomListener)
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
      assert.equal(e.type, 'click')
      called = true
    }
  }
  extend(o, DomListener)
  o.attach()
  o.detach()
  Simulate.click(elm)
  ok(!called, "don't call anymore")

  // cleans up
  ok(undefined === o['elm:onclick']._bound)
  document.body.removeChild(elm)
})


function extend(dst, src){
  for (var prop in src)
    dst[prop] = src[prop]
}