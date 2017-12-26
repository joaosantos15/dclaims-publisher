exports = module.exports

// global.claimsBuffer is type Map()

exports.add = function (id, claim) {
  if (typeof global.claimsBuffer.get(id) !== 'undefined') {
    console.log('element exists')
    let list = global.claimsBuffer.get(id)
    list.push(claim)
    global.claimsBuffer.set(id, list)
  } else {
    console.log('new element')
    global.claimsBuffer.set(id, [claim])
  }
}

exports.get = function (id) {
  return global.claimsBuffer.get(id)
}

exports.clear = function (id) {
  global.claimsBuffer.delete(id)
}

exports.getListSize = function (id) {
  let element = global.claimsBuffer.get(id)
  if (typeof element !== 'undefined') {
    return element.length
  } else {
    return 0
  }
}

/*
Can probably be done better.
*/
exports.elementsOverTreshold = function (treshold) {
  return new Promise(function (resolve, reject) {
    let elements = []
    function checkLength (value, key, map) {
      if (value.length >= treshold) {
        console.log('This one: ' + key)
        elements.push(key)
      }
    }
    global.claimsBuffer.forEach(checkLength)
    resolve(elements)
  })
}

exports.print = function () {
  function logMapElements (value, key, map) {
    console.log(`m[${key}] = ${value}`)
  }
  global.claimsBuffer.forEach(logMapElements)
}
