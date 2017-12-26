const Issue = require('../issue.js')
const ClaimsBuffer = require('../claimsBuffer.js')

module.exports = function (app) {
  app.get('/issue', (req, res) => {
  	// global.globalString = req.query.article
  	let id = req.query.id
  	let claim = req.query.claim

//  	console.log('ID: ' + id + ' claim:' + claim)
  	ClaimsBuffer.add(id, claim)
    res.end(id + ' ' + claim)
  })
}
