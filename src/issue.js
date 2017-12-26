exports = module.exports

exports.issue = function (claim) {
  return new Promise(function (resolve, reject) {
    resolve(true)
  })
}

exports.issueBatch = function (items) {
  return new Promise(function (resolve, reject) {
  	for (let i = 0; i < items.length; i++) {
  		console.log('Issued: ' + items[i].key)
  	}
    resolve(true)
  })
}
