const Issue = require('../issue.js')
const ClaimsBuffer = require('../claimsBuffer.js')
const HypercertsNewsClaims = require('../../../../hypercerts-news-claims/src/index.js')

module.exports = function (app) {
  app.get('/issue', (req, res) => {
  	// global.globalString = req.query.article
  	let claim = Object.assign(new HypercertsNewsClaims.SingleClaim(), JSON.parse(req.query.claim))
  	let id = claim.claim.id

  	console.log(claim instanceof HypercertsNewsClaims.SingleClaim)

    console.log('ID: ' + id + ' claim:' + claim)
  	ClaimsBuffer.add(id, claim)
    res.end(id + ' ' + claim)
  })
}
